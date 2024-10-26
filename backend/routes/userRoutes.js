const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, email, password, role } = req.body;
  const user = new User({ username, email, password, role });
  try {
    await user.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, role: user.role }, "secret", {
    expiresIn: "1d",
  });
  res.json({ token });
});

module.exports = router;
