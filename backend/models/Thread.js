// models/Thread.js
const mongoose = require("mongoose");

const ThreadSchema = new mongoose.Schema(
  {
    title: String,
    messages: [
      {
        content: String,
        sender: String, // 'user' or 'bot'
        timestamp: { type: Date, default: Date.now },
      },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Thread", ThreadSchema);
