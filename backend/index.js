// server.js
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
    origin: "http://localhost:3000", // Replace with your frontend's Vercel URL in production
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Define routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chat", require("./routes/chatRoutes"));

// Export the Express app for Vercel's serverless function
module.exports = app;

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const userRoutes = require("./routes/userRoutes");
// const resourceRoutes = require("./routes/resourcesRoutes");
// const newsRoutes = require("./routes/newsRoutes");
// const discussionRoutes = require("./routes/discussionRoutes");
// const contentRoutes = require("./routes/contentRoutes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const PORT = process.env.PORT || 5000;

// // MongoDB Connection
// mongoose
//   .connect("mongodb://localhost:27017/platform")
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/news", newsRoutes);
// app.use("/api/discussions", discussionRoutes);
// app.use("/api/content", contentRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
