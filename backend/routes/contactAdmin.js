import express from "express";
import { Contact } from "../models/index.js";
import { protect } from "../middleware/auth.js";

// Contact
export const contactRouter = express.Router();

contactRouter.post("/", async (req, res) => {
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

// Admin
export const adminRouter = express.Router();

adminRouter.get("/contacts", protect, async (_, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

adminRouter.patch("/contacts/:id/read", protect, async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!c) return res.status(404).json({ message: "Not found" });
  res.json(c);
});

adminRouter.delete("/contacts/:id", protect, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});
