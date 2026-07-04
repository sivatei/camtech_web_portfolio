const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const requireAdmin = require("../config/requireAdmin");

// POST /api/contact - visitor submits the contact form (public)
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are all required." });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address." });
    }

    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: "Message received. Thank you for reaching out!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send message.", error: err.message });
  }
});

// GET /api/contact - view submitted messages (admin only, for checking inbox)
router.get("/", requireAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages.", error: err.message });
  }
});

module.exports = router;
