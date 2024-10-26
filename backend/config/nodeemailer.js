import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Or your email service provider
  auth: {
    user: process.env.EMAIL_USER, // Use env variables for security
    pass: process.env.EMAIL_PASS,
  },
});

export default transporter;
