const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authmiddleware");

router.put("/:userId", authMiddleware, async (req, res) => {
  const { name, email, department } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { name, email, department },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;