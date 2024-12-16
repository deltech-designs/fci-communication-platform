import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import router from "./routes/index.js"
// import authRoutes from "./routes/authRoutes.js";
// import chatRoutes from "./routes/chatRoutes.js";
import { initializeSocket } from "./socket.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fci-communication-platform.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", router);
// app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
