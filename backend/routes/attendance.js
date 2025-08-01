/*
const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");
const authMiddleware = require("../middleware/authmiddleware");

router.post("/:userId", authMiddleware, async (req, res) => {
  const { status, latitude, longitude } = req.body;
  const user = await User.findById(req.params.userId);

  try {
    const record = new Attendance({
      userId: user._id,
      studentName: user.name,
      status,
      latitude,
      longitude
    });
    await record.save();
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", authMiddleware, async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/unverified", authMiddleware, async (req, res) => {
  try {
    const records = await Attendance.find({ verified: false });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/verify/:id", authMiddleware, async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      { new: true }
    );
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
*/
/*
const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");

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

router.get("/by-supervisor/:name/date/:date", async (req, res) => {
  const staffName = req.params.name;
  const selectedDate = req.params.date; // format: YYYY-MM-DD

  const students = await User.find({ role: "student", supervisor: staffName });
  const studentIds = students.map(s => s._id.toString());

  const records = await Attendance.find({ date: selectedDate, userId: { $in: studentIds } });

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

router.get("/:userId", async (req, res) => {
  const records = await Attendance.find({ userId: req.params.userId });
  res.json(records);
});

router.get("/today/all", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const records = await Attendance.find({ date: today }).populate("userId", "name department email");
  res.json(records);
});

module.exports = router;
*/
/*
const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const User = require("../models/User");

// Mark Attendance
router.post("/", async (req, res) => {
  const { userId, status, location } = req.body;
  const date = new Date().toISOString().split("T")[0];

  const now = new Date();
  const deadline = new Date();
  deadline.setHours(11, 0, 0, 0);

  if (now > deadline) {
    return res.status(400).json({ message: "Too late. Attendance closed at 11:00 AM" });
  }

  let attendance = await Attendance.findOne({ userId, date });
  if (!attendance) {
    attendance = new Attendance({ userId, date, status, location });
    await attendance.save();
  }

  res.json({ message: "Attendance marked" });
});

// Get today's attendance by supervisor
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

// Get attendance for any date by supervisor with "Not enrolled yet" logic
router.get("/by-supervisor/:name/date/:date", async (req, res) => {
  const staffName = req.params.name;
  const selectedDateObj = new Date(req.params.date);
  selectedDateObj.setHours(0, 0, 0, 0);

  try {
    const students = await User.find({ role: "student", supervisor: staffName });
    const studentIds = students.map(s => s._id.toString());

    const records = await Attendance.find({
      date: req.params.date,
      userId: { $in: studentIds }
    });

    const attendanceMap = {};
    records.forEach(record => {
      attendanceMap[record.userId.toString()] = record.status;
    });

    const response = students.map(student => {
      const signupDate = new Date(student.createdAt);
      signupDate.setHours(0, 0, 0, 0);

      if (selectedDateObj < signupDate) {
        return {
          name: student.name,
          status: "Not enrolled yet"
        };
      }

      return {
        name: student.name,
        status: attendanceMap[student._id.toString()] || "Absent"
      };
    });

    res.json(response);
  } catch (err) {
    console.error("Error fetching attendance by date:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all records for a user
router.get("/:userId", async (req, res) => {
  const records = await Attendance.find({ userId: req.params.userId });
  res.json(records);
});

// Get all today's attendance for admin view
router.get("/today/all", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const records = await Attendance.find({ date: today }).populate("userId", "name department email");
  res.json(records);
});

// ✅ Get count of students assigned to a staff
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
*/
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
