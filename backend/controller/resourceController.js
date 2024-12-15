export const uploadResource = (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const resourceUrl = `/uploads/${file.filename}`; // Local file URL
    res.status(201).json({
      url: resourceUrl,
      name: file.originalname,
      type: file.mimetype,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to upload resource", error });
  }
};
