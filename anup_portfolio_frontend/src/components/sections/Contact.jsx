import { useState } from "react";
import { useFetch } from "../../hooks/index.js";
import { getProfile } from "../../api/client.js";
import { sendContact } from "../../api/client.js";

const inputStyle = {
  width:"100%", padding:"12px 16px",
  background:"var(--surface)", border:"1px solid var(--border)",
  borderRadius:8, color:"var(--text)", fontFamily:"var(--sans)", fontSize:14,
  outline:"none", transition:"border-color 0.2s, box-shadow 0.2s",
};

export default function Contact() {
  const { data: profile } = useFetch(getProfile);
  const [form, setForm]   = useState({ name:"", email:"", subject:"", message:"" });
  const [status, setStatus] = useState(null);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async e => {
    e.preventDefault(); setStatus("sending");
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name:"", email:"", subject:"", message:"" });
    } catch { setStatus("error"); }
  };

  return (
    <section className="section" id="contact" style={{ background:"var(--bg-2)" }}>
      <div className="grid-bg" style={{ opacity:0.5 }} />
      <div className="container" style={{ position:"relative", zIndex:1 }}>
        <p className="sec-eyebrow">Let's collaborate</p>
        <h2 className="sec-title">Get In Touch</h2>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:64, alignItems:"start" }}>

          {/* Info */}
          <div>
            <p style={{ fontSize:15, color:"var(--text-2)", lineHeight:1.8, marginBottom:36 }}>
              Whether you want to discuss data analytics, NLP research, ML projects, or potential collaborations — feel free to reach out.
            </p>

            {[
              { icon:"📍", label:"Location",  val: profile?.location  || "San Francisco, CA, USA",  href:null },
              { icon:"✉️", label:"Email",     val: profile?.email     || "alex.rivera.dev@protonmail.com", href: profile?.email ? `mailto:${profile.email}` : "mailto:alex.rivera.dev@protonmail.com" },
              { icon:"📞", label:"Phone",     val: profile?.phone     || "+1 (415) 555-0182",         href: profile?.phone ? `tel:${profile.phone.replace(/\D/g,"")}` : null },
              { icon:"🔗", label:"LinkedIn",  val: "alex-rivera-ml",                                  href: profile?.linkedin || "https://linkedin.com/in/alex-rivera-ml" },
            ].map(d => (
              <div key={d.label} style={{ display:"flex", gap:16, marginBottom:20 }}>
                <span style={{ fontSize:20, width:32, textAlign:"center", flexShrink:0 }}>{d.icon}</span>
                <div>
                  <p style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--text-3)", marginBottom:3 }}>{d.label}</p>
                  {d.href
                    ? <a href={d.href} target="_blank" rel="noreferrer" style={{ fontSize:14, color:"var(--cyan)", transition:"opacity 0.2s" }}>{d.val}</a>
                    : <p style={{ fontSize:14, color:"var(--text)" }}>{d.val}</p>
                  }
                </div>
              </div>
            ))}

            {/* Currently open */}
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderLeft:"3px solid var(--cyan)", borderRadius:"0 10px 10px 0", padding:"18px 20px", marginTop:32 }}>
              <p style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--cyan)", marginBottom:12 }}>Currently open to</p>
              {["Data & Analytics roles", "NLP research collaborations", "ML engineering contracts", "Freelance data projects"].map(f => (
                <p key={f} style={{ display:"flex", gap:10, fontSize:13, color:"var(--text-2)", marginBottom:6 }}>
                  <span style={{ color:"var(--violet)" }}>→</span>{f}
                </p>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={submit} style={{
            background:"var(--surface)", border:"1px solid var(--border)",
            borderRadius:16, padding:36, display:"flex", flexDirection:"column", gap:20,
          }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {["name","email"].map(f => (
                <div key={f}>
                  <label style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-3)", display:"block", marginBottom:6 }}>{f}</label>
                  <input name={f} type={f==="email"?"email":"text"} value={form[f]} onChange={handle}
                    placeholder={f==="name"?"Your name":"your@email.com"} required
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor="var(--cyan)"; e.target.style.boxShadow="0 0 0 3px rgba(99,210,255,0.08)"; }}
                    onBlur={e  => { e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; }}
                  />
                </div>
              ))}
            </div>
            {["subject","message"].map(f => (
              <div key={f}>
                <label style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-3)", display:"block", marginBottom:6 }}>{f}</label>
                {f === "message"
                  ? <textarea name={f} value={form[f]} onChange={handle} rows={5} placeholder="Tell me more..." required
                      style={{ ...inputStyle, resize:"none" }}
                      onFocus={e => { e.target.style.borderColor="var(--cyan)"; e.target.style.boxShadow="0 0 0 3px rgba(99,210,255,0.08)"; }}
                      onBlur={e  => { e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; }}
                    />
                  : <input name={f} value={form[f]} onChange={handle} placeholder="What's this about?" required
                      style={inputStyle}
                      onFocus={e => { e.target.style.borderColor="var(--cyan)"; e.target.style.boxShadow="0 0 0 3px rgba(99,210,255,0.08)"; }}
                      onBlur={e  => { e.target.style.borderColor="var(--border)"; e.target.style.boxShadow="none"; }}
                    />
                }
              </div>
            ))}

            <button type="submit" className="btn btn-cyan" disabled={status==="sending"}
              style={{ justifyContent:"center", fontSize:15, padding:"14px", border:"none" }}>
              {status === "sending" ? "Sending..." : "Send Message →"}
            </button>

            {status==="success" && <p style={{ textAlign:"center", color:"var(--green)", fontFamily:"var(--mono)", fontSize:13 }}>✓ Message sent! I'll get back to you soon.</p>}
            {status==="error"   && <p style={{ textAlign:"center", color:"#f87171",    fontFamily:"var(--mono)", fontSize:13 }}>Something went wrong. Please try again.</p>}
          </form>
        </div>
      </div>
      <style>{`@media(max-width:900px){.contact-grid{grid-template-columns:1fr!important;}}`}</style>
    </section>
  );
}
