import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    replyTo: { type: mongoose.Schema.Types.ObjectId, ref: "Message" }, 
    resources: [
      {
        type: {
          type: String,
          enum: ["image", "video", "file"],
          required: true,
        },
        url: { type: String, required: true }, 
        name: { type: String }, 
      },
    ],
  },
  { timestamps: true }
);

const threadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Thread", threadSchema);
