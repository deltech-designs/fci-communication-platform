// config/multer.js
const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  // Only accept certain file types (e.g., PDFs, docs)
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

// Initialize upload
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10000000 }, // 10MB max
});

module.exports = upload;
