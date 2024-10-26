// const express = require("express");
// const Thread = require("../models/Thread");
// const Reply = require("../models/Reply");
// const { authMiddleware } = require("../middleware/authMiddleware");
// const router = express.Router();

// // Get all threads
// router.get("/threads", async (req, res) => {
//   try {
//     const threads = await Thread.find().populate("createdBy", "name");
//     res.json(threads);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Create a new thread
// router.post("/threads", authMiddleware(["user", "admin"]), async (req, res) => {
//   const { title } = req.body;
//   try {
//     const newThread = await Thread.create({ title, createdBy: req.user._id });
//     res.status(201).json(newThread);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Get replies for a specific thread
// router.get("/threads/:threadId/replies", async (req, res) => {
//   try {
//     const replies = await Reply.find({
//       threadId: req.params.threadId,
//     }).populate("createdBy", "name");
//     res.json(replies);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Add a reply to a thread
// router.post(
//   "/threads/:threadId/replies",
//   authMiddleware(["user", "admin"]),
//   async (req, res) => {
//     const { message } = req.body;
//     try {
//       const newReply = await Reply.create({
//         threadId: req.params.threadId,
//         message,
//         createdBy: req.user._id,
//       });
//       res.status(201).json(newReply);
//     } catch (error) {
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// );

// module.exports = router;
