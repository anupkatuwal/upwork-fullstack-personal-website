import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const links = ["About", "Skills", "Experience", "Education", "Projects", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const { pathname }            = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  if (pathname === "/admin") return null;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 99,
      padding: scrolled ? "12px 0" : "20px 0",
      background: scrolled ? "rgba(5,8,16,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(99,210,255,0.08)" : "none",
      transition: "all 0.3s ease",
    }}>
      <div className="container" style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>

        {/* Logo */}
        <a href="#" style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{
            width:36, height:36, borderRadius:8,
            background:"linear-gradient(135deg, var(--cyan), var(--violet))",
            display:"grid", placeItems:"center",
            fontFamily:"var(--mono)", fontWeight:700, fontSize:13, color:"var(--bg)",
          }}>AK</div>
          <span style={{ fontFamily:"var(--display)", fontWeight:700, fontSize:16, color:"var(--text)" }}>
            Anup Katuwal
          </span>
        </a>

        {/* Links desktop */}
        <ul style={{ display:"flex", gap:32, listStyle:"none", alignItems:"center" }} className="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={{
                fontFamily:"var(--mono)", fontSize:12, letterSpacing:"0.08em",
                color:"var(--text-2)", transition:"color 0.2s",
              }}
              onMouseEnter={e => e.target.style.color = "var(--cyan)"}
              onMouseLeave={e => e.target.style.color = "var(--text-2)"}
              >{l}</a>
            </li>
          ))}
          <li>
            <a href="#contact" className="btn btn-cyan" style={{ padding:"8px 20px", fontSize:13 }}>
              Hire Me
            </a>
          </li>
        </ul>

        {/* Burger */}
        <button onClick={() => setOpen(o => !o)} style={{
          display:"none", background:"none", border:"none",
          cursor:"pointer", flexDirection:"column", gap:5, padding:4,
        }} className="burger" aria-label="menu">
          {[0,1,2].map(i => (
            <span key={i} style={{ display:"block", width:24, height:2, background:"var(--text)", borderRadius:2 }} />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background:"rgba(5,8,16,0.98)", borderTop:"1px solid var(--border)",
          padding:"16px 28px 24px",
        }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
               onClick={() => setOpen(false)}
               style={{ display:"block", padding:"12px 0", fontFamily:"var(--mono)", fontSize:13,
                        color:"var(--text-2)", borderBottom:"1px solid var(--border)" }}>
              {l}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .burger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
