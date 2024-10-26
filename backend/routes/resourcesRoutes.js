const express = require("express");
const Resource = require("../models/Resource");
const router = express.Router();

// Get all resources with optional filtering
router.get("/", async (req, res) => {
  const { type, category } = req.query;
  let filter = {};
  if (type) filter.type = type;
  if (category) filter.category = category;

  try {
    const resources = await Resource.find(filter);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a new resource
router.post("/", async (req, res) => {
  const { title, type, category, fileUrl } = req.body;
  try {
    const newResource = await Resource.create({
      title,
      type,
      category,
      fileUrl,
    });
    res.status(201).json(newResource);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
