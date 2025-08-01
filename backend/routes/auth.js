/*
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authmiddleware");

// ✅ SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, department, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      department,
      role,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Signup backend error:", err.message);
    res.status(500).json({ error: "Server error during signup" });
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, role: user.role }, 'secret123', { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

// ✅ PROFILE UPDATE (name, email, department)
router.put("/profile/:userId", authMiddleware, async (req, res) => {
  const { name, email, department } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, department },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ error: "Server error during profile update" });
  }
});

module.exports = router;
*/
// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "simple-secret-key";

router.post("/signup", async (req, res) => {
  const { name, email, password, department } = req.body;
  const role = email.startsWith("staff") ? "staff" : "student";

  let supervisor = "";
  if (["Sharika", "Oviya", "Thiru"].includes(name)) supervisor = "Nirmala";
  else if (["Preethi", "Swetha", "Vaishnavi"].includes(name)) supervisor = "Renuga";

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, department, role, supervisor });
  await user.save();

  res.status(201).json({ message: "User registered" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials - user not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials - wrong password" });

  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token, user });
});

module.exports = router;
