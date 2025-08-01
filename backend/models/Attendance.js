/*
const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  studentName: String,
  date: { type: Date, default: Date.now },
  status: String, // Present or Half Day
  latitude: Number,
  longitude: Number,
  verified: { type: Boolean, default: false }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
*/
const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: String,
  status: String,
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
