import { useFetch, useInView } from "../../hooks/index.js";
import { getSkills } from "../../api/client.js";

function SkillBar({ skill, visible }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontFamily:"var(--mono)", fontSize:12, color: skill.featured ? "var(--cyan)" : "var(--text-2)" }}>
          {skill.featured && <span style={{ color:"var(--cyan)", marginRight:6 }}>◆</span>}
          {skill.name}
        </span>
        <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>{skill.level}%</span>
      </div>
      <div style={{
        height:4, background:"rgba(255,255,255,0.06)", borderRadius:4, overflow:"hidden",
      }}>
        <div style={{
          height:"100%", borderRadius:4,
          background: skill.featured
            ? "linear-gradient(90deg, var(--cyan), var(--violet))"
            : "rgba(99,210,255,0.4)",
          width: visible ? `${skill.level}%` : "0%",
          transition:`width 1s ease ${(skill.level % 5) * 0.08}s`,
          boxShadow: skill.featured ? "0 0 8px rgba(99,210,255,0.5)" : "none",
        }} />
      </div>
    </div>
  );
}

const CATEGORY_ICONS = {
  "Programming & Data": "{ }",
  "Databases":          "🗄",
  "AI / NLP":           "🧠",
  "Analytics & Viz":    "📊",
  "Web & Cloud":        "☁",
  "Tools":              "⚙",
};

export default function Skills() {
  const { data: skills, loading } = useFetch(getSkills);
  const [ref, visible] = useInView(0.1);

  const grouped = skills
    ? skills.reduce((acc, s) => { (acc[s.category] = acc[s.category] || []).push(s); return acc; }, {})
    : {};

  return (
    <section className="section" id="skills" style={{ background:"var(--bg-2)" }} ref={ref}>
      <div className="grid-bg" style={{ opacity:0.5 }} />
      <div className="container" style={{ position:"relative", zIndex:1 }}>
        <p className="sec-eyebrow">What I work with</p>
        <h2 className="sec-title">Skills & Technologies</h2>

        {loading ? (
          <p style={{ fontFamily:"var(--mono)", color:"var(--text-3)" }}>Loading...</p>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:20 }}>
            {Object.entries(grouped).map(([cat, items]) => (
              <div key={cat} className="card" style={{ padding:"24px 28px" }}>
                <div style={{
                  display:"flex", alignItems:"center", gap:10,
                  marginBottom:20, paddingBottom:14,
                  borderBottom:"1px solid var(--border)",
                }}>
                  <span style={{ fontSize:16 }}>{CATEGORY_ICONS[cat] || "◈"}</span>
                  <span style={{
                    fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.18em",
                    textTransform:"uppercase", color:"var(--cyan)",
                  }}>{cat}</span>
                </div>
                {items.map(s => <SkillBar key={s._id} skill={s} visible={visible} />)}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
