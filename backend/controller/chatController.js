import Thread from "../models/Thread.js";
import { getIO } from "../socket.js";


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
    const { threadId, content, resource } = req.body; // Resource field added
    const thread = await Thread.findById(threadId);

    if (!thread) return res.status(404).json({ message: "Thread not found" });

    const message = {
      sender: req.user._id,
      content,
      resource: resource ? JSON.parse(resource) : undefined, // Handle resource
    };

    thread.messages.push(message);
    await thread.save();

    const io = getIO(); // Notify clients in the thread
    io.to(threadId).emit("newMessage", { threadId, message });

    res.status(201).json(message);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ message: "Failed to add message", error });
  }
};

export const deleteThread = async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findByIdAndDelete(id);
    res.json(thread);
  } catch (error) {
    res.status(500).json({ message: "Failed to delete thread", error });
  }
};
