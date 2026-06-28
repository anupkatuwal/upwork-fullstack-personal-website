import express from "express";
import { Project } from "../models/index.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

const SEED = [
  {
    title: "Mental Health NLP Bias Study",
    description: "Research project analysing and mitigating demographic bias in BERT-based NLP models applied to mental-health Reddit posts. Implemented fairness-aware fine-tuning with multiple equity metrics, reducing disparity across demographic groups by 28%. Results presented at ACL Ethics in NLP workshop.",
    techStack: ["BERT", "Python", "HuggingFace", "PyTorch", "Reddit API", "Fairness Metrics"],
    githubLink: "https://github.com/alex-rivera-dev",
    liveLink: "",
    featured: true,
    order: 1,
  },
  {
    title: "End-to-End Analytics Pipeline & Dashboard",
    description: "Production-grade ETL pipeline ingesting 2M+ daily records from multiple business sources into PostgreSQL, with automated anomaly detection and interactive Tableau dashboards used by senior leadership for quarterly planning.",
    techStack: ["Python", "Pandas", "PostgreSQL", "Tableau", "Apache Airflow"],
    githubLink: "https://github.com/alex-rivera-dev",
    liveLink: "",
    featured: true,
    order: 2,
  },
  {
    title: "Customer Churn Prediction System",
    description: "Supervised ML pipeline combining XGBoost and logistic regression for telecom customer churn prediction. Achieved 91% AUC-ROC with feature importance analysis surfacing top retention levers. Deployed as a REST API consumed by the CRM team.",
    techStack: ["Python", "scikit-learn", "XGBoost", "FastAPI", "Docker"],
    githubLink: "https://github.com/alex-rivera-dev",
    liveLink: "",
    featured: true,
    order: 3,
  },
  {
    title: "MERN Portfolio Website",
    description: "Full-stack personal portfolio built with the MERN stack. Dynamic content served from MongoDB, animated hero with neural-network canvas, contact form with admin dashboard for managing messages and projects, deployed on Vercel + Render.",
    techStack: ["MongoDB", "Express", "React", "Node.js", "Vite", "JWT"],
    githubLink: "https://github.com/alex-rivera-dev",
    liveLink: "",
    featured: false,
    order: 4,
  },
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
