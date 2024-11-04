// controllers/chatController.js
import Thread from "../models/Thread.js";

export const createThread = async (req, res) => {
  try {
    const { title, participants } = req.body;
    const newThread = await Thread.create({ title, participants });
    res.status(201).json(newThread);
  } catch (error) {
    res.status(500).json({ message: "Failed to create thread", error });
  }
};

export const getThreads = async (req, res) => {
  try {
    const threads = await Thread.find({ participants: req.user._id }).populate(
      "participants",
      "name"
    );
    res.json(threads);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch threads", error });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { threadId, content } = req.body;
    const thread = await Thread.findById(xthreadId);

    if (!thread) return res.status(404).json({ message: "Thread not found" });

    const message = { sender: req.user._id, content };
    thread.messages.push(message);
    await thread.save();

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to add message", error });
  }
};
