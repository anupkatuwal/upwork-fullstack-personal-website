import { useFetch, useInView } from "../../hooks/index.js";
import { getExperience } from "../../api/client.js";

export default function Experience() {
  const { data: exp, loading } = useFetch(getExperience);
  const [ref, visible] = useInView(0.1);

  return (
    <section className="section" id="experience" style={{ background:"var(--bg)" }} ref={ref}>
      <div className="container">
        <p className="sec-eyebrow">Professional background</p>
        <h2 className="sec-title">Experience</h2>

        {loading ? (
          <p style={{ fontFamily:"var(--mono)", color:"var(--text-3)" }}>Loading...</p>
        ) : (
          <div style={{ position:"relative" }}>
            {/* Vertical line */}
            <div style={{
              position:"absolute", left:20, top:0, bottom:0, width:1,
              background:"linear-gradient(to bottom, var(--cyan), var(--violet), transparent)",
              opacity:0.3,
            }} />

            {exp?.map((e, i) => (
              <div key={e._id} style={{
                display:"grid", gridTemplateColumns:"56px 1fr",
                gap:24, marginBottom:24,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition:`all 0.6s ease ${i * 0.12}s`,
              }}>
                {/* Dot */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", paddingTop:4 }}>
                  <div style={{
                    width:12, height:12, borderRadius:"50%",
                    background:"var(--cyan)",
                    boxShadow:"0 0 12px var(--cyan)",
                    border:"2px solid var(--bg)",
                    outline:"2px solid var(--cyan)",
                    zIndex:1, flexShrink:0,
                  }} />
                </div>

                {/* Card */}
                <div className="card" style={{ padding:"24px 28px", marginBottom:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:4 }}>
                    <h3 style={{ fontFamily:"var(--display)", fontSize:19, fontWeight:700, color:"var(--text)" }}>
                      {e.role}
                    </h3>
                    <span style={{
                      fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)",
                      background:"var(--surface-2)", padding:"4px 12px", borderRadius:100,
                      border:"1px solid var(--border)", whiteSpace:"nowrap",
                    }}>
                      {e.startDate} – {e.endDate || "Present"}
                    </span>
                  </div>

                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                    <span style={{ fontFamily:"var(--mono)", fontSize:12, color:"var(--cyan)", fontWeight:500 }}>
                      {e.company}
                    </span>
                    {e.location && <>
                      <span style={{ color:"var(--text-3)" }}>·</span>
                      <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>{e.location}</span>
                    </>}
                  </div>

                  {e.description && (
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {e.description.split(". ").filter(Boolean).map((line, j) => (
                        <div key={j} style={{ display:"flex", gap:10 }}>
                          <span style={{ color:"var(--violet)", fontSize:12, marginTop:3, flexShrink:0 }}>–</span>
                          <span style={{ fontSize:14, color:"var(--text-2)", lineHeight:1.65 }}>
                            {line.endsWith(".") ? line : line + "."}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
