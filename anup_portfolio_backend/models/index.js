import mongoose from "mongoose";

// ── Project ──────────────────────────────────────────────
export const Project = mongoose.model("Project", new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  techStack:   [String],
  githubLink:  String,
  liveLink:    String,
  imageUrl:    String,
  featured:    { type: Boolean, default: false },
  order:       { type: Number, default: 0 },
}, { timestamps: true }));

// ── Skill ─────────────────────────────────────────────────
export const Skill = mongoose.model("Skill", new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String, required: true },
  level:    { type: Number, min: 0, max: 100, default: 80 }, // percentage for viz
  featured: { type: Boolean, default: false },
}));

// ── Experience ────────────────────────────────────────────
export const Experience = mongoose.model("Experience", new mongoose.Schema({
  role:        { type: String, required: true },
  company:     { type: String, required: true },
  location:    String,
  startDate:   { type: String, required: true },
  endDate:     String,
  description: String,
  order:       { type: Number, default: 0 },
}));

// ── Education ─────────────────────────────────────────────
export const Education = mongoose.model("Education", new mongoose.Schema({
  degree:      { type: String, required: true },
  institution: { type: String, required: true },
  location:    String,
  startYear:   String,
  endYear:     String,
  gpa:         String,
  thesis:      String,
  order:       { type: Number, default: 0 },
}));

// ── Contact ───────────────────────────────────────────────
export const Contact = mongoose.model("Contact", new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  read:    { type: Boolean, default: false },
}, { timestamps: true }));
