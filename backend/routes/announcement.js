import express from "express";
import Announcement from "../models/Announcement.js";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js"; // Nodemailer config

const router = express.Router();

// Create a new announcement
router.post("/create", async (req, res) => {
  const { title, content, tags, important } = req.body;

  try {
    const newAnnouncement = new Announcement({
      title,
      content,
      createdBy: req.user._id,
      tags: tags.split(","), // Assuming tags come as a comma-separated string
      important,
    });

    await newAnnouncement.save();

    if (important) {
      await notifyUsers(newAnnouncement); // Notify users for important announcements
    }

    res.status(201).json(newAnnouncement);
  } catch (error) {
    res.status(500).json({ message: "Error creating announcement", error });
  }
});

// Function to notify users via email or in-app notifications
const notifyUsers = async (announcement) => {
  try {
    const users = await User.find(); // Fetch all users
    users.forEach((user) => {
      // Notify users via email
      sendEmailNotification(user, announcement);
    });
  } catch (error) {
    console.error("Error notifying users", error);
  }
};

// Notify users via email
const sendEmailNotification = async (user, announcement) => {
  const mailOptions = {
    from: "admin@yourapp.com",
    to: user.email,
    subject: `New Announcement: ${announcement.title}`,
    text: `${announcement.content}\n\nCheck the latest updates in the app!`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default router;
