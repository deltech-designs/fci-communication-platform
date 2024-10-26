// routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("../controller/authController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const { authMiddleware } = require("../middleware/auth");
// const User = require("../models/User");

// const router = express.Router();

// // Register
// router.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const user = new User({ name, email, password });
//     await user.save();

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.status(201).json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Profile Management (Update user info)
// router.put("/profile", authMiddleware(["user", "admin"]), async (req, res) => {
//   const { name, email } = req.body;
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.user._id,
//       { name, email },
//       { new: true }
//     );
//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
