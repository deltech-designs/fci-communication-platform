import express from "express";
import {
  createThread,
  getThreads,
  addMessage,
  deleteThread,
} from "../controller/chatController.js";
import { uploadResource } from "../controller/resourceController.js";
import { authenticate } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.route("/create").post(authenticate, createThread);
router.route("/threads").get(authenticate, getThreads);
router.route("/message").post(authenticate, addMessage);
router.route("/thread/:id").delete(authenticate, deleteThread);


router.post("/upload", authenticate, upload.single("resource"), uploadResource);

export default router;
