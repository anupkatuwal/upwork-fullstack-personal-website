import express from "express";
import { Contact } from "../models/index.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/contacts", protect, async (_, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

router.patch("/contacts/:id/read", protect, async (req, res) => {
  const c = await Contact.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
  if (!c) return res.status(404).json({ message: "Not found" });
  res.json(c);
});

router.delete("/contacts/:id", protect, async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
