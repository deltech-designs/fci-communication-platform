const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
  title: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  replies: [
    {
      content: String,
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      date: { type: Date, default: Date.now },
    },
  ],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Discussion", discussionSchema);
