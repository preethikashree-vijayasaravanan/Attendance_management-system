/*
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  role: { type: String, enum: ["student", "staff"], default: "student" }
});

module.exports = mongoose.model("User", UserSchema);
*/
/*
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // 'student' or 'staff'
  department: String,
  supervisor: String, // staff assigned to student
});

module.exports = mongoose.model("User", UserSchema);
*/
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
  role: { type: String, enum: ["student", "staff"], default: "student" },
  supervisor: String,
}, {
  timestamps: true  // This enables createdAt field!
});

module.exports = mongoose.model("User", UserSchema);
