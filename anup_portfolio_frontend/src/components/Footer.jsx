export default function Footer() {
  return (
    <footer style={{
      background:"var(--bg)", borderTop:"1px solid var(--border)",
      padding:"40px 0 28px",
    }}>
      <div className="container" style={{
        display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:40, alignItems:"start",
      }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{
              width:32, height:32, borderRadius:7,
              background:"linear-gradient(135deg, var(--cyan), var(--violet))",
              display:"grid", placeItems:"center",
              fontFamily:"var(--mono)", fontWeight:700, fontSize:12, color:"var(--bg)",
            }}>AK</div>
            <span style={{ fontFamily:"var(--display)", fontWeight:700, fontSize:15, color:"var(--text)" }}>Anup Katuwal</span>
          </div>
          <p style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--text-3)", letterSpacing:"0.06em", marginBottom:16 }}>
            Data Analyst · NLP Researcher · Aspiring Lecturer
          </p>
          <p style={{ fontSize:12, color:"var(--text-3)" }}>
            © {new Date().getFullYear()} Anup Katuwal. All rights reserved.
          </p>
        </div>

        <div>
          <p style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.2em", color:"var(--cyan)", textTransform:"uppercase", marginBottom:14 }}>Navigation</p>
          {["About","Skills","Experience","Education","Projects","Contact"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              display:"block", fontSize:13, color:"var(--text-3)",
              marginBottom:8, transition:"color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color="var(--cyan)"}
            onMouseLeave={e => e.target.style.color="var(--text-3)"}
            >{l}</a>
          ))}
        </div>

        <div>
          <p style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.2em", color:"var(--cyan)", textTransform:"uppercase", marginBottom:14 }}>Connect</p>
          {[
            { label:"GitHub",   href:"https://github.com/anupkatuwal" },
            { label:"LinkedIn", href:"https://linkedin.com/in/anup-katuwal-004b7884" },
            { label:"Email",    href:"mailto:katuwalanup@gmail.com" },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
              display:"block", fontSize:13, color:"var(--text-3)", marginBottom:8, transition:"color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color="var(--cyan)"}
            onMouseLeave={e => e.target.style.color="var(--text-3)"}
            >{l.label}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}
