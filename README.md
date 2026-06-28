# MERN Stack Portfolio — Full-Stack Web Application

Full-stack portfolio site built with the MERN stack: React + Vite frontend · Express + Node.js backend · MongoDB database.

---

## Project Structure

```
portfolio/
├── anup_portfolio_frontend/   ← React + Vite
│   ├── src/
│   │   ├── api/client.js
│   │   ├── components/
│   │   │   ├── sections/   (Hero, Skills, Experience, Education, Projects, Contact)
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── hooks/index.js
│   │   ├── pages/Admin.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── anup_portfolio_backend/    ← Express + Node.js + MongoDB
    ├── config/db.js
    ├── middleware/auth.js
    ├── models/index.js
    ├── routes/
    │   ├── auth.js
    │   ├── portfolio.js
    │   ├── projects.js
    │   ├── contact.js
    │   └── admin.js
    ├── server.js
    └── package.json
```

---

## Backend Setup

```bash
cd anup_portfolio_backend

# Install dependencies
npm install

# Copy env file and fill in values
cp .env.example .env

# Start dev server
npm run dev
```

Backend runs at: http://localhost:5000

**You need MongoDB running locally OR use MongoDB Atlas (free cloud).**

For MongoDB Atlas:
1. Go to mongodb.com/atlas → create free account
2. Create a cluster → get connection string
3. Paste it as MONGO_URI in your .env

---

## Frontend Setup

```bash
cd anup_portfolio_frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start dev server
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Admin Dashboard

Visit: http://localhost:5173/admin

Credentials (set in backend .env):
- Username: admin
- Password: admin123

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/portfolio/profile | Profile info |
| GET | /api/portfolio/skills | All skills (auto-seeded) |
| GET | /api/portfolio/experience | Work experience (auto-seeded) |
| GET | /api/portfolio/education | Education (auto-seeded) |
| GET | /api/projects | All projects (auto-seeded) |
| POST | /api/contact | Submit contact form |
| POST | /api/auth/login | Admin login |
| GET | /api/admin/contacts | All messages (admin only) |
| PATCH | /api/admin/contacts/:id/read | Mark read (admin) |
| DELETE | /api/admin/contacts/:id | Delete message (admin) |

---

## Deployment

**Frontend → Vercel**
1. Push to GitHub
2. Import in Vercel
3. Set VITE_API_URL to your backend URL

**Backend → Railway**
1. Create account at railway.app
2. New project → Deploy from GitHub
3. Set all env variables
4. Add MongoDB plugin OR use MongoDB Atlas

---

## Design

- Deep space black background (#050810)
- Electric cyan (#63d2ff) + violet (#a78bfa) accents
- Animated neural network in hero (canvas)
- Glitch text effect on name
- Typewriter role animation
- Skill bars animated on scroll
- Scroll-triggered reveals on all sections
- Fonts: Sora (display) + Space Grotesk (body) + JetBrains Mono (code)
