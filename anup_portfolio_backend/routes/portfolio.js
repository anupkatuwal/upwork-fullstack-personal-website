import express from "express";
import { Skill, Experience, Education } from "../models/index.js";

const router = express.Router();

// ── Profile (static) ─────────────────────────────────────
router.get("/profile", (_, res) => {
  res.json({
    name: "Anup Katuwal",
    title: "Data Analyst · NLP Researcher · Aspiring Lecturer",
    tagline: "Building intelligent systems at the intersection of NLP, analytics, and real-world problems.",
    location: "Kathmandu, Nepal",
    summary: "Master's graduate in Computer Information Systems with hands-on experience in Python, SQL & NLP. Completed thesis on bias mitigation in mental-health sentiment analysis using BERT. Seeking roles in Data Analysis, Business Analytics or Junior Software Development in Nepal.",
    email: "katuwalanup@gmail.com",
    phone: "+977 9745947888",
    linkedin: "https://linkedin.com/in/anup-katuwal-004b7884",
    github: "https://github.com/anupkatuwal",
    website: "https://anup-portfolio-one.vercel.app",
    certifications: [
      { name: "Google Data Analytics Certificate", org: "Google" },
      { name: "Python for Everybody", org: "University of Michigan" },
      { name: "Building Modern Java Apps on AWS", org: "Amazon Web Services" },
      { name: "Introduction to Generative AI", org: "Google Cloud" },
    ],
  });
});

// ── Skills ────────────────────────────────────────────────
const SKILLS_SEED = [
  { name: "Python",             category: "Programming & Data", level: 88, featured: true },
  { name: "Pandas",             category: "Programming & Data", level: 85, featured: true },
  { name: "NumPy",              category: "Programming & Data", level: 80, featured: true },
  { name: "SQL",                category: "Programming & Data", level: 90, featured: false },
  { name: "Java",               category: "Programming & Data", level: 70, featured: false },
  { name: "Spring Boot",        category: "Programming & Data", level: 65, featured: false },
  { name: "MySQL",              category: "Databases",          level: 85, featured: false },
  { name: "MS SQL",             category: "Databases",          level: 75, featured: false },
  { name: "SQLite",             category: "Databases",          level: 80, featured: false },
  { name: "MongoDB",            category: "Databases",          level: 70, featured: false },
  { name: "BERT",               category: "AI / NLP",           level: 88, featured: true },
  { name: "Transformers",       category: "AI / NLP",           level: 85, featured: true },
  { name: "Scikit-learn",       category: "AI / NLP",           level: 80, featured: false },
  { name: "Sentiment Analysis", category: "AI / NLP",           level: 90, featured: false },
  { name: "Fairness Analysis",  category: "AI / NLP",           level: 85, featured: false },
  { name: "Data Cleaning",      category: "Analytics & Viz",    level: 90, featured: false },
  { name: "EDA",                category: "Analytics & Viz",    level: 88, featured: false },
  { name: "Tableau",            category: "Analytics & Viz",    level: 75, featured: false },
  { name: "Excel",              category: "Analytics & Viz",    level: 85, featured: false },
  { name: "FastAPI",            category: "Web & Cloud",        level: 72, featured: false },
  { name: "React",              category: "Web & Cloud",        level: 65, featured: false },
  { name: "HTML/CSS",           category: "Web & Cloud",        level: 70, featured: false },
  { name: "AWS",                category: "Web & Cloud",        level: 55, featured: false },
  { name: "Git",                category: "Tools",              level: 80, featured: false },
  { name: "Jupyter",            category: "Tools",              level: 92, featured: false },
  { name: "Google Colab",       category: "Tools",              level: 90, featured: false },
];

router.get("/skills", async (_, res) => {
  let skills = await Skill.find();
  if (!skills.length) {
    await Skill.insertMany(SKILLS_SEED);
    skills = await Skill.find();
  }
  res.json(skills);
});

// ── Experience ────────────────────────────────────────────
const EXP_SEED = [
  { role: "Graduate Researcher · MCIS", company: "Nepal College of Information Technology (NCIT)", location: "Kathmandu, Nepal", startDate: "2022", endDate: "2026", description: "Completed thesis on bias mitigation in mental-health sentiment analysis using BERT. Worked with Reddit-based mental-health datasets and fairness evaluation metrics. Focused on data analytics, NLP research, and teaching-oriented career development.", order: 1 },
  { role: "Software Developer (Remote – Freelance)", company: "Texas-based IT Firm", location: "Remote", startDate: "Jan 2021", endDate: "Jul 2022", description: "Backend development using Java & Spring Boot for multiple client projects. Feature implementation, debugging, and collaboration with global distributed teams.", order: 2 },
  { role: "Teaching Assistant (DBMS)", company: "College of Applied Business", location: "Kathmandu, Nepal", startDate: "Feb 2018", endDate: "Sep 2018", description: "Conducted MySQL lab sessions and assisted students with SQL queries and schema design. Supported students in understanding database concepts and debugging assignments.", order: 3 },
  { role: "Manager", company: "Mama Rose's Restaurant", location: "Estes Park, CO, USA", startDate: "Feb 2011", endDate: "Mar 2016", description: "Managed day-to-day operations, staff scheduling, inventory, and vendor relationships. Led a multicultural team to improve service efficiency and customer satisfaction.", order: 4 },
];

router.get("/experience", async (_, res) => {
  let exp = await Experience.find().sort({ order: 1 });
  if (!exp.length) {
    await Experience.insertMany(EXP_SEED);
    exp = await Experience.find().sort({ order: 1 });
  }
  res.json(exp);
});

// ── Education ─────────────────────────────────────────────
const EDU_SEED = [
  { degree: "Master of Computer Information Systems (MCIS)", institution: "NCIT, Pokhara University", location: "Kathmandu, Nepal", startYear: "2022", endYear: "2026", gpa: "3.8", thesis: "Bias Mitigation in Mental Health Sentiment Analysis Using BERT with Fairness Techniques", order: 1 },
  { degree: "B.Sc. in Computer Information Systems", institution: "Columbia College", location: "Denver, CO, USA", startYear: "2010", endYear: "2014", gpa: "3.34", order: 2 },
];

router.get("/education", async (_, res) => {
  let edu = await Education.find().sort({ order: 1 });
  if (!edu.length) {
    await Education.insertMany(EDU_SEED);
    edu = await Education.find().sort({ order: 1 });
  }
  res.json(edu);
});

export default router;
