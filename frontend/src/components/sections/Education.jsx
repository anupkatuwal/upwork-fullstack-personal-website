import { useFetch, useInView } from "../../hooks/index.js";
import { getEducation, getProfile } from "../../api/client.js";

export default function Education() {
  const { data: edu }     = useFetch(getEducation);
  const { data: profile } = useFetch(getProfile);
  const [ref, visible]    = useInView(0.1);

  return (
    <section className="section" id="education" style={{ background:"var(--bg-2)" }} ref={ref}>
      <div className="grid-bg" style={{ opacity:0.5 }} />
      <div className="container" style={{ position:"relative", zIndex:1 }}>
        <p className="sec-eyebrow">Academic journey</p>
        <h2 className="sec-title">Education</h2>

        {/* Degrees */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(340px,1fr))", gap:24, marginBottom:56 }}>
          {edu?.map((e, i) => (
            <div key={e._id} className="card" style={{
              padding:"32px 28px", position:"relative", overflow:"hidden",
              opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)",
              transition:`all 0.6s ease ${i * 0.15}s`,
            }}>
              {/* Top accent */}
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:2,
                background:"linear-gradient(90deg, var(--cyan), var(--violet))",
              }} />

              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                <span style={{ fontSize:32 }}>🎓</span>
                <div style={{ textAlign:"right" }}>
                  <div style={{
                    fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)",
                    background:"var(--surface-2)", padding:"4px 12px",
                    borderRadius:100, border:"1px solid var(--border)", marginBottom:6,
                  }}>
                    {e.startYear} – {e.endYear || "Present"}
                  </div>
                  {e.gpa && (
                    <div style={{ fontFamily:"var(--mono)", fontSize:12, color:"var(--cyan)", fontWeight:600 }}>
                      GPA: {e.gpa}
                    </div>
                  )}
                </div>
              </div>

              <h3 style={{ fontFamily:"var(--display)", fontSize:18, fontWeight:700, color:"var(--text)", lineHeight:1.3, marginBottom:8 }}>
                {e.degree}
              </h3>
              <p style={{ fontFamily:"var(--mono)", fontSize:12, color:"var(--cyan)", marginBottom:4 }}>{e.institution}</p>
              {e.location && <p style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)", marginBottom:16 }}>{e.location}</p>}

              {e.thesis && (
                <div style={{
                  background:"rgba(99,210,255,0.04)", border:"1px solid var(--border)",
                  borderLeft:"3px solid var(--cyan)", borderRadius:"0 8px 8px 0",
                  padding:"12px 16px", marginTop:16,
                }}>
                  <p style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.18em", color:"var(--cyan)", textTransform:"uppercase", marginBottom:6 }}>
                    Thesis
                  </p>
                  <p style={{ fontSize:13, fontStyle:"italic", color:"var(--text-2)", lineHeight:1.6 }}>
                    {e.thesis}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div>
          <h3 style={{ fontFamily:"var(--display)", fontSize:28, fontWeight:700, marginBottom:24,
            background:"linear-gradient(135deg, var(--text), var(--violet))",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Certifications
          </h3>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {profile?.certifications?.map((c, i) => (
              <div key={c.name} className="card" style={{
                padding:"18px 20px", display:"flex", alignItems:"center", gap:14,
                opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(-16px)",
                transition:`all 0.5s ease ${0.3 + i * 0.1}s`,
              }}>
                <span style={{ color:"var(--violet)", fontSize:18, flexShrink:0 }}>◆</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:"var(--text)", marginBottom:3 }}>{c.name}</p>
                  <p style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>{c.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
