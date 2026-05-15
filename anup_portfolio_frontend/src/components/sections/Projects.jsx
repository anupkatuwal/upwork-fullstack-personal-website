import { useFetch, useInView } from "../../hooks/index.js";
import { getProjects } from "../../api/client.js";

export default function Projects() {
  const { data: projects, loading } = useFetch(getProjects);
  const [ref, visible] = useInView(0.1);

  return (
    <section className="section" id="projects" style={{ background:"var(--bg)" }} ref={ref}>
      <div className="container">
        <p className="sec-eyebrow">Things I'm building</p>
        <h2 className="sec-title">Projects</h2>

        {loading ? (
          <p style={{ fontFamily:"var(--mono)", color:"var(--text-3)" }}>Loading...</p>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:24 }}>
            {projects?.map((p, i) => (
              <div key={p._id} className="card" style={{
                padding:0, overflow:"hidden", display:"flex", flexDirection:"column",
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(32px)",
                transition:`all 0.7s ease ${i * 0.15}s`,
                position:"relative",
              }}>
                {/* Top gradient bar */}
                <div style={{
                  height:3,
                  background: i === 0
                    ? "linear-gradient(90deg, var(--cyan), var(--violet))"
                    : i === 1
                    ? "linear-gradient(90deg, var(--violet), var(--green))"
                    : "linear-gradient(90deg, var(--green), var(--cyan))",
                }} />

                {p.featured && (
                  <span style={{
                    position:"absolute", top:16, right:16,
                    fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.14em",
                    color:"var(--cyan)", background:"var(--cyan-dim)",
                    border:"1px solid rgba(99,210,255,0.3)",
                    padding:"3px 10px", borderRadius:100,
                  }}>FEATURED</span>
                )}

                <div style={{ padding:"28px 28px 24px", flex:1, display:"flex", flexDirection:"column" }}>
                  <h3 style={{ fontFamily:"var(--display)", fontSize:20, fontWeight:700, color:"var(--text)", marginBottom:12, lineHeight:1.3 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize:14, color:"var(--text-2)", lineHeight:1.75, flex:1, marginBottom:20 }}>
                    {p.description}
                  </p>

                  {p.techStack?.length > 0 && (
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                      {p.techStack.map(t => (
                        <span key={t} style={{
                          fontFamily:"var(--mono)", fontSize:10, padding:"3px 10px",
                          borderRadius:100, background:"var(--surface-2)",
                          border:"1px solid var(--border)", color:"var(--text-3)",
                        }}>{t}</span>
                      ))}
                    </div>
                  )}

                  <div style={{ display:"flex", gap:10 }}>
                    {p.githubLink && (
                      <a href={p.githubLink} target="_blank" rel="noreferrer" className="btn btn-outline"
                         style={{ padding:"8px 18px", fontSize:12 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                        GitHub
                      </a>
                    )}
                    {p.liveLink && (
                      <a href={p.liveLink} target="_blank" rel="noreferrer" className="btn btn-cyan"
                         style={{ padding:"8px 18px", fontSize:12 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
