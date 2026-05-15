import { useEffect, useRef, useState } from "react";
import { useFetch } from "../hooks/index.js";
import { getProfile } from "../api/client.js";

// Neural Network Canvas
function NeuralCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let W = canvas.width  = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    let raf;
    const mouse = { x: W/2, y: H/2 };

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
    }));

    const onMouse = e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    canvas.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        // mouse attract
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 180) { n.vx += dx * 0.00008; n.vy += dy * 0.00008; }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(99,210,255,0.6)";
        ctx.fill();
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i+1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            const alpha = (1 - d/130) * 0.35;
            ctx.strokeStyle = `rgba(99,210,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); canvas.removeEventListener("mousemove", onMouse); };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.5,
    }} />
  );
}

// Glitch text
function GlitchText({ text }) {
  return (
    <span style={{ position:"relative", display:"inline-block" }}>
      {text}
      <span aria-hidden style={{
        position:"absolute", top:0, left:0, color:"var(--cyan)", opacity:0.6,
        animation:"glitch1 4s infinite linear", clipPath:"inset(0 0 95% 0)",
      }}>{text}</span>
      <span aria-hidden style={{
        position:"absolute", top:0, left:0, color:"var(--violet)", opacity:0.5,
        animation:"glitch2 3.5s infinite linear",
      }}>{text}</span>
      <style>{`
        @keyframes glitch1 {
          0%,90%,100%{clip-path:inset(0 0 100% 0);transform:none;}
          91%{clip-path:inset(20% 0 60% 0);transform:translateX(2px);}
          93%{clip-path:inset(60% 0 20% 0);transform:translateX(-2px);}
          95%{clip-path:inset(40% 0 40% 0);transform:translateX(1px);}
        }
        @keyframes glitch2 {
          0%,88%,100%{clip-path:inset(0 0 100% 0);transform:none;}
          89%{clip-path:inset(50% 0 10% 0);transform:translateX(-3px);}
          91%{clip-path:inset(10% 0 70% 0);transform:translateX(2px);}
        }
      `}</style>
    </span>
  );
}

// Typing effect
function TypeWriter({ words }) {
  const [idx, setIdx]   = useState(0);
  const [txt, setTxt]   = useState("");
  const [del, setDel]   = useState(false);

  useEffect(() => {
    const word = words[idx % words.length];
    const speed = del ? 40 : 80;
    const timer = setTimeout(() => {
      if (!del) {
        setTxt(word.slice(0, txt.length + 1));
        if (txt.length + 1 === word.length) setTimeout(() => setDel(true), 1800);
      } else {
        setTxt(word.slice(0, txt.length - 1));
        if (txt.length - 1 === 0) { setDel(false); setIdx(i => i + 1); }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [txt, del, idx, words]);

  return (
    <span>
      {txt}
      <span style={{ animation:"blink 1s step-end infinite", color:"var(--cyan)" }}>|</span>
    </span>
  );
}

export default function Hero() {
  const { data: profile } = useFetch(getProfile);

  return (
    <section id="about" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      position:"relative", overflow:"hidden", background:"var(--bg)",
      paddingTop:80,
    }}>
      <div className="grid-bg" />
      <NeuralCanvas />

      {/* Glow orbs */}
      <div style={{ position:"absolute", top:"20%", right:"15%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(99,210,255,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:"20%", left:"10%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

      <div className="container" style={{ position:"relative", zIndex:2, paddingTop:48, paddingBottom:80 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:64, alignItems:"center" }}>

          {/* Left */}
          <div style={{ animation:"fadeUp 0.8s ease both" }}>
            {/* Status badge */}
            <div style={{
              display:"inline-flex", alignItems:"center", gap:8, marginBottom:28,
              background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.25)",
              borderRadius:100, padding:"6px 16px",
              fontFamily:"var(--mono)", fontSize:11, color:"var(--green)", letterSpacing:"0.1em",
            }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--green)", animation:"pulse 2s ease-in-out infinite" }} />
              OPEN TO OPPORTUNITIES
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily:"var(--display)", fontWeight:800,
              fontSize:"clamp(52px, 8vw, 88px)", lineHeight:0.95,
              letterSpacing:"-0.03em", color:"var(--text)", marginBottom:20,
            }}>
              <GlitchText text={profile?.name?.split(" ")[0] || "Anup"} />
              <br />
              <span style={{ color:"var(--text-2)", fontWeight:300 }}>
                {profile?.name?.split(" ")[1] || "Katuwal"}
              </span>
            </h1>

            {/* Typewriter */}
            <div style={{
              fontFamily:"var(--mono)", fontSize:16, color:"var(--cyan)",
              letterSpacing:"0.06em", marginBottom:24, minHeight:28,
            }}>
              <TypeWriter words={[
                "Data Analyst",
                "NLP Researcher",
                "BERT Specialist",
                "Aspiring Lecturer",
                "ML Engineer",
              ]} />
            </div>

            {/* Bio */}
            <p style={{
              fontSize:16, color:"var(--text-2)", lineHeight:1.8,
              maxWidth:540, marginBottom:40,
            }}>
              {profile?.summary || "Master's graduate in Computer Information Systems. Building intelligent systems at the intersection of NLP, analytics, and real-world problems."}
            </p>

            {/* Actions */}
            <div style={{ display:"flex", gap:16, flexWrap:"wrap", marginBottom:48 }}>
              <a href="#projects" className="btn btn-cyan">View Projects</a>
              <a href="#contact"  className="btn btn-outline">Contact Me</a>
              <a href="https://github.com/anupkatuwal" target="_blank" rel="noreferrer" className="btn btn-outline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                GitHub
              </a>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", gap:0 }}>
              {[
                { num:"3.8", label:"Master's GPA" },
                { num:"6+",  label:"Years Experience" },
                { num:"3+",  label:"Projects" },
                { num:"4",   label:"Certifications" },
              ].map((s, i) => (
                <div key={s.label} style={{
                  padding:"16px 28px", borderTop:"1px solid var(--border-2)",
                  borderLeft: i === 0 ? "1px solid var(--border-2)" : "none",
                  borderRight:"1px solid var(--border-2)", borderBottom:"1px solid var(--border-2)",
                  borderRadius: i === 0 ? "8px 0 0 8px" : i === 3 ? "0 8px 8px 0" : 0,
                }}>
                  <div style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:800, color:"var(--cyan)", lineHeight:1 }}>{s.num}</div>
                  <div style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.12em", color:"var(--text-3)", textTransform:"uppercase", marginTop:4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — avatar */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", animation:"fadeUp 0.8s ease 0.2s both" }}>
            <div style={{ position:"relative", width:260, height:260 }}>
              {/* Spinning rings */}
              <div style={{
                position:"absolute", inset:-20, borderRadius:"50%",
                border:"1px solid transparent",
                borderTop:"1px solid var(--cyan)", borderRight:"1px solid var(--violet)",
                animation:"spin 6s linear infinite",
              }} />
              <div style={{
                position:"absolute", inset:-8, borderRadius:"50%",
                border:"1px dashed rgba(99,210,255,0.2)",
                animation:"spin 12s linear infinite reverse",
              }} />
              {/* Avatar */}
              <div style={{
                width:"100%", height:"100%", borderRadius:"50%",
                background:"linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)",
                border:"1px solid var(--border-2)",
                display:"grid", placeItems:"center",
                boxShadow:"0 0 60px rgba(99,210,255,0.12), inset 0 0 40px rgba(99,210,255,0.04)",
              }}>
                <span style={{
                  fontFamily:"var(--display)", fontSize:80, fontWeight:800,
                  background:"linear-gradient(135deg, var(--cyan), var(--violet))",
                  WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                  lineHeight:1,
                }}>AK</span>
              </div>
            </div>

            {/* Tags below avatar */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginTop:32 }}>
              {["BERT", "Python", "NLP", "Data Analytics", "Fairness AI"].map(t => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>

            {/* Location */}
            <div style={{
              marginTop:20, display:"flex", alignItems:"center", gap:8,
              fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)",
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
              Kathmandu, Nepal
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#skills" style={{
        position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)",
        color:"var(--text-3)", animation:"float 2.5s ease-in-out infinite",
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 13 12 18 17 13"/><polyline points="7 6 12 11 17 6"/></svg>
      </a>

      <style>{`
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr!important;}
          .hero-visual{display:none!important;}
        }
      `}</style>
    </section>
  );
}
