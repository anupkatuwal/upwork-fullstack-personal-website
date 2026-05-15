import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/sections/Hero.jsx";
import Skills from "./components/sections/Skills.jsx";
import Experience from "./components/sections/Experience.jsx";
import Education from "./components/sections/Education.jsx";
import Projects from "./components/sections/Projects.jsx";
import Contact from "./components/sections/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Admin from "./pages/Admin.jsx";

function Portfolio() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"      element={<Portfolio />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}
