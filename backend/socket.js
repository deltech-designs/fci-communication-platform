import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: [
        "http://localhost:5173",
        "https://fci-communication-platform.vercel.app",
      ],
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a specific chat thread
    socket.on("joinThread", (threadId) => {
      socket.join(threadId);
      console.log(`User ${socket.id} joined thread ${threadId}`);
    });

    // Send a new message to a thread
    socket.on("sendMessage", (message) => {
      io.to(message.threadId).emit("newMessage", message);
      console.log(`Message sent to thread ${message.threadId}:`, message);
    });

    // Handle user disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error("Socket.io not initialized!");
  return io;
};
