// models/ForumTopic.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const topicSchema = new Schema({
  title: { type: String, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
  replies: [replySchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ForumTopic", topicSchema);
