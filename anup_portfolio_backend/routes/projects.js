import express from "express";
import { Project } from "../models/index.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const SEED = [
  { title: "Mental Health Sentiment Bias Study", description: "Research project analysing and mitigating demographic bias in NLP models applied to mental-health Reddit posts using fairness-aware fine-tuning of BERT. Implemented multiple fairness metrics to evaluate and reduce bias across demographic groups.", techStack: ["BERT", "Python", "HuggingFace", "Reddit API", "Fairness Metrics"], githubLink: "https://github.com/anupkatuwal", featured: true, order: 1 },
  { title: "Data Analytics Pipeline & Dashboard", description: "End-to-end analytics pipeline featuring data cleaning, exploratory data analysis, SQL-based querying, and interactive Tableau dashboards for business insight reporting.", techStack: ["Python", "Pandas", "SQL", "Tableau", "Excel"], githubLink: "https://github.com/anupkatuwal", featured: true, order: 2 },
  { title: "Portfolio Website", description: "Full-stack personal portfolio built with MERN stack. Features dynamic content from MongoDB, contact form, admin dashboard, and a futuristic NLP-researcher aesthetic.", techStack: ["MongoDB", "Express", "React", "Node.js"], githubLink: "https://github.com/anupkatuwal/anup-portfolio", liveLink: "https://anup-portfolio-one.vercel.app", featured: true, order: 3 },
];

router.get("/", async (_, res) => {
  let projects = await Project.find().sort({ order: 1 });
  if (!projects.length) {
    await Project.insertMany(SEED);
    projects = await Project.find().sort({ order: 1 });
  }
  res.json(projects);
});

router.get("/:id", async (req, res) => {
  const p = await Project.findById(req.params.id);
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
});

router.post("/", protect, async (req, res) => {
  const p = await Project.create(req.body);
  res.status(201).json(p);
});

router.put("/:id", protect, async (req, res) => {
  const p = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!p) return res.status(404).json({ message: "Not found" });
  res.json(p);
});

router.delete("/:id", protect, async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
