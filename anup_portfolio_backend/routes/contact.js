import express from "express";
import { Contact } from "../models/index.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message)
      return res.status(400).json({ message: "All fields required" });
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Message sent!", id: contact._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
