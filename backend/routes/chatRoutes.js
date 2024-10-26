// routes/chatRoutes.js
const express = require("express");
const {
  getThreads,
  addMessage,
  createThread,
} = require("../controller/chatController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/threads", protect, getThreads); // Get all threads for a user
router.post("/threads", protect, createThread); // Create a new thread
router.post("/threads/:id/message", protect, addMessage); // Add a message to a thread

module.exports = router;
