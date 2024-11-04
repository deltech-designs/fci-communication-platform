const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Update to your Vercel frontend URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Define routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// Export the Express app for Vercel
module.exports = app;
