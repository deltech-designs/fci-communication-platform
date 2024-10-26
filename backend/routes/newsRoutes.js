const express = require("express");
const News = require("../models/New");
const router = express.Router();

// Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a news item
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNews = await News.create({ title, content });
    res.status(201).json(newNews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
