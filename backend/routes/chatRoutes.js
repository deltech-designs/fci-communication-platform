// routes/chatRoutes.js
import express from "express";
import {
  createThread,
  getThreads,
  addMessage,
} from "../controllers/chatController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticate, createThread);
router.get("/threads", authenticate, getThreads);
router.post("/message", authenticate, addMessage);

export default router;
