// const express = require("express");
// const Content = require("../models/Content");
// const { authMiddleware } = require("../middleware/authMiddleware");
// const router = express.Router();

// // Create Content (only accessible by admin)
// router.post("/", authMiddleware(["admin"]), async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     const newContent = await Content.create({
//       title,
//       description,
//       createdBy: req.user._id,
//     });
//     res.status(201).json(newContent);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Read all content
// router.get("/", async (req, res) => {
//   try {
//     const contentList = await Content.find().populate("createdBy", "name");
//     res.json(contentList);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Update Content (only accessible by admin)
// router.put("/:id", authMiddleware(["admin"]), async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     const updatedContent = await Content.findByIdAndUpdate(
//       req.params.id,
//       { title, description },
//       { new: true }
//     );
//     res.json(updatedContent);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Delete Content (only accessible by admin)
// router.delete("/:id", authMiddleware(["admin"]), async (req, res) => {
//   try {
//     await Content.findByIdAndDelete(req.params.id);
//     res.json({ message: "Content deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
