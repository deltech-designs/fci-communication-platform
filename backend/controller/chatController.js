// controllers/chatController.js
const Thread = require("../models/Thread");

const getThreads = async (req, res) => {
  const threads = await Thread.find({ createdBy: req.user.id });
  res.json(threads);
};

const createThread = async (req, res) => {
  const { title } = req.body;
  const thread = await Thread.create({
    title,
    createdBy: req.user.id,
    messages: [],
  });
  res.status(201).json(thread);
};

const addMessage = async (req, res) => {
  const { content, sender } = req.body;
  const thread = await Thread.findById(req.params.id);
  if (!thread) return res.status(404).json({ error: "Thread not found" });

  thread.messages.push({ content, sender });
  await thread.save();
  res.status(201).json(thread);
};

module.exports = { getThreads, createThread, addMessage };
