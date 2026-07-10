const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Mark attendance (students only before 11:00 AM)
router.post("/", async (req, res) => {
  const { userId, status, location } = req.body;
  const date = new Date().toISOString().split("T")[0];

  const now = new Date();
  const attendanceDeadline = new Date();
  attendanceDeadline.setHours(11, 0, 0, 0); // 11:00 AM

  if (now > attendanceDeadline) {
    return res.status(400).json({ message: "Too late. Attendance closed at 11:00 AM" });
  }

  let attendance = await Attendance.findOne({ userId, date });
  if (!attendance) {
    attendance = new Attendance({ userId, date, status, location });
    await attendance.save();
  }

  res.json({ message: "Attendance marked" });
});

// Get today’s attendance for all students assigned to a staff
router.get("/today/by-supervisor/:name", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const staffName = req.params.name;

  const students = await User.find({ role: "student", supervisor: staffName });
  const studentIds = students.map(s => s._id.toString());

  const records = await Attendance.find({ date: today, userId: { $in: studentIds } });

  const attendanceMap = {};
  records.forEach(record => {
    attendanceMap[record.userId.toString()] = record.status;
  });

  const response = students.map(student => ({
    name: student.name,
    status: attendanceMap[student._id.toString()] || "Absent"
  }));

  res.json(response);
});

// Get attendance of students assigned to a staff on a specific date (with enrollment check)
router.get("/by-supervisor/:name/date/:date", async (req, res) => {
  const staffName = req.params.name;
  const selectedDateObj = new Date(req.params.date);
  selectedDateObj.setHours(0, 0, 0, 0);

  try {
    const students = await User.find({ role: "student", supervisor: staffName });
    const studentIds = students.map((s) => s._id.toString());

    const records = await Attendance.find({
      date: req.params.date,
      userId: { $in: studentIds },
    });

    const attendanceMap = {};
    records.forEach((record) => {
      attendanceMap[record.userId.toString()] = record.status;
    });

    const response = students.map((student) => {
      const signupDate = new Date(student.createdAt);
      signupDate.setHours(0, 0, 0, 0);

      if (selectedDateObj < signupDate) {
        return {
          name: student.name,
          status: "Not enrolled yet",
        };
      }

      return {
        name: student.name,
        status: attendanceMap[student._id.toString()] || "Absent",
      };
    });

    res.json(response);
  } catch (err) {
    console.error("Error fetching attendance by date:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all attendance records for a single user
router.get("/:userId", async (req, res) => {
  const records = await Attendance.find({ userId: req.params.userId });
  res.json(records);
});

// Get all attendance records for today (used in admin views)
router.get("/today/all", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const records = await Attendance.find({ date: today }).populate("userId", "name department email");
  res.json(records);
});

// Get count of students assigned to a staff
router.get("/assigned-count/:staffName", async (req, res) => {
  const staffName = req.params.staffName;
  try {
    const students = await User.find({ role: "student", supervisor: staffName });
    res.json({ count: students.length });
  } catch (err) {
    console.error("Error fetching student count:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
