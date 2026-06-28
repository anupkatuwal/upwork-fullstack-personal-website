import express from "express";
import { Profile, Skill, Experience, Education } from "../models/index.js";

const router = express.Router();

// ─── Seed data (pseudo identity) ─────────────────────────────────────────────

const PROFILE_SEED = {
  name:     "Alex Rivera",
  title:    "Data Analyst · NLP Researcher · ML Engineer",
  summary:  "Master's graduate in Computer Information Systems specialising in natural language processing and fairness-aware machine learning. Passionate about building intelligent systems that are not only accurate but equitable — from bias mitigation in mental-health NLP to end-to-end analytics pipelines.",
  email:    "alex.rivera.dev@protonmail.com",
  phone:    "+1 (415) 555-0182",
  location: "San Francisco, CA, USA",
  github:   "https://github.com/alex-rivera-dev",
  linkedin: "https://linkedin.com/in/alex-rivera-ml",
  resumeUrl: "",
  certifications: [
    { name: "Google Data Analytics Professional Certificate", org: "Google / Coursera", year: "2023" },
    { name: "IBM Data Science Professional Certificate",      org: "IBM / Coursera",    year: "2023" },
    { name: "Natural Language Processing Specialisation",     org: "DeepLearning.AI",   year: "2022" },
    { name: "AWS Certified Cloud Practitioner",               org: "Amazon Web Services", year: "2024" },
  ],
};

const SKILLS_SEED = [
  // Programming & Data
  { name: "Python",       category: "Programming & Data", level: 92, featured: true },
  { name: "R",            category: "Programming & Data", level: 78, featured: false },
  { name: "JavaScript",   category: "Programming & Data", level: 75, featured: false },
  { name: "TypeScript",   category: "Programming & Data", level: 65, featured: false },
  // Databases
  { name: "MongoDB",      category: "Databases", level: 82, featured: true },
  { name: "PostgreSQL",   category: "Databases", level: 79, featured: false },
  { name: "MySQL",        category: "Databases", level: 74, featured: false },
  // AI / NLP
  { name: "BERT / HuggingFace", category: "AI / NLP", level: 88, featured: true },
  { name: "PyTorch",      category: "AI / NLP", level: 80, featured: true },
  { name: "scikit-learn", category: "AI / NLP", level: 85, featured: false },
  { name: "SpaCy / NLTK", category: "AI / NLP", level: 83, featured: false },
  { name: "OpenAI API",   category: "AI / NLP", level: 76, featured: false },
  // Analytics & Viz
  { name: "Pandas / NumPy",  category: "Analytics & Viz", level: 90, featured: true },
  { name: "Tableau",         category: "Analytics & Viz", level: 82, featured: false },
  { name: "Power BI",        category: "Analytics & Viz", level: 74, featured: false },
  { name: "Matplotlib / Seaborn", category: "Analytics & Viz", level: 85, featured: false },
  // Web & Cloud
  { name: "React / Vite",   category: "Web & Cloud", level: 76, featured: false },
  { name: "Node / Express",  category: "Web & Cloud", level: 74, featured: false },
  { name: "AWS (EC2, S3)",   category: "Web & Cloud", level: 70, featured: false },
  { name: "Docker",          category: "Web & Cloud", level: 65, featured: false },
  // Tools
  { name: "Git / GitHub",    category: "Tools", level: 88, featured: false },
  { name: "Jupyter Lab",     category: "Tools", level: 90, featured: false },
  { name: "VS Code",         category: "Tools", level: 85, featured: false },
  { name: "Postman",         category: "Tools", level: 78, featured: false },
];

const EXPERIENCE_SEED = [
  {
    role:        "Data Analyst",
    company:     "Nexus Analytics Group",
    location:    "San Francisco, CA (Remote)",
    startDate:   "Mar 2024",
    endDate:     null,
    description: "Design and maintain end-to-end ETL pipelines processing 2M+ daily records from diverse business sources. Build interactive Tableau dashboards adopted by senior leadership for quarterly decision-making. Develop Python scripts for automated anomaly detection, reducing manual review time by 40%. Collaborate with engineering to integrate analytics outputs into production APIs.",
    order: 1,
  },
  {
    role:        "NLP Research Assistant",
    company:     "UC Berkeley AI Research Lab",
    location:    "Berkeley, CA",
    startDate:   "Sep 2022",
    endDate:     "May 2024",
    description: "Conducted research on demographic bias in BERT-based mental-health text classification models. Implemented fairness-aware fine-tuning techniques reducing disparity across demographic groups by 28%. Authored two conference papers accepted to ACL workshop on Ethics in NLP. Mentored junior researchers in model evaluation methodology and reproducible experiment design.",
    order: 2,
  },
  {
    role:        "Junior Data Scientist",
    company:     "DataBridge Solutions",
    location:    "Austin, TX",
    startDate:   "Jun 2021",
    endDate:     "Aug 2022",
    description: "Developed predictive models for customer churn and demand forecasting using scikit-learn and XGBoost. Reduced false-positive rate in fraud detection pipeline by 18% through feature engineering. Built internal Python library for standardised data validation used across 6 teams. Presented findings to non-technical stakeholders via concise visual reports.",
    order: 3,
  },
  {
    role:        "Software Developer Intern",
    company:     "TechNova Inc.",
    location:    "San Jose, CA",
    startDate:   "Jan 2021",
    endDate:     "May 2021",
    description: "Built REST API endpoints with Node.js and Express serving 50k+ daily requests. Contributed to front-end features in React, improving page-load performance by 22%. Participated in Agile sprints, daily standups, and code review sessions. Wrote unit tests achieving 85% coverage on assigned modules.",
    order: 4,
  },
];

const EDUCATION_SEED = [
  {
    degree:      "Master of Science – Computer Information Systems",
    institution: "University of California, Berkeley",
    location:    "Berkeley, CA, USA",
    startYear:   "2022",
    endYear:     "2024",
    gpa:         "3.8 / 4.0",
    thesis:      "Fairness-Aware Fine-Tuning of BERT for Mental Health Sentiment Analysis: Mitigating Demographic Bias in NLP Classification",
    order: 1,
  },
  {
    degree:      "Bachelor of Science – Computer Science",
    institution: "San Jose State University",
    location:    "San Jose, CA, USA",
    startYear:   "2017",
    endYear:     "2021",
    gpa:         "3.6 / 4.0",
    thesis:      null,
    order: 2,
  },
];

// ─── Helper: seed if collection empty ────────────────────────────────────────

async function seedIfEmpty(Model, data) {
  const count = await Model.countDocuments();
  if (count === 0) {
    if (Array.isArray(data)) await Model.insertMany(data);
    else await Model.create(data);
  }
}

// ─── Routes ──────────────────────────────────────────────────────────────────

router.get("/profile", async (_, res) => {
  try {
    await seedIfEmpty(Profile, PROFILE_SEED);
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/skills", async (_, res) => {
  try {
    await seedIfEmpty(Skill, SKILLS_SEED);
    const skills = await Skill.find().sort({ category: 1, level: -1 });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/experience", async (_, res) => {
  try {
    await seedIfEmpty(Experience, EXPERIENCE_SEED);
    const exp = await Experience.find().sort({ order: 1 });
    res.json(exp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/education", async (_, res) => {
  try {
    await seedIfEmpty(Education, EDUCATION_SEED);
    const edu = await Education.find().sort({ order: 1 });
    res.json(edu);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
