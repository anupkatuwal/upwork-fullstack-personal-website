import { useState, useEffect } from "react";
import {
  login,
  getContacts, deleteContact, markRead,
  getProjects, createProject, updateProject, deleteProject,
} from "../api/client.js";

// ─── Shared styles ────────────────────────────────────────────────────────────
const inputStyle = {
  width:"100%", padding:"10px 14px",
  background:"var(--bg-2)", border:"1px solid var(--border)",
  borderRadius:8, color:"var(--text)", fontFamily:"var(--sans)", fontSize:13,
  outline:"none",
};
const labelStyle = {
  fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em",
  textTransform:"uppercase", color:"var(--text-3)", display:"block", marginBottom:5,
};

// ─── Login ────────────────────────────────────────────────────────────────────
function Login({ onLogin }) {
  const [form, setForm]       = useState({ username:"", password:"" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault(); setLoading(true); setError("");
    try {
      const res = await login(form);
      if (res.token) onLogin(res.token);
      else setError("Invalid credentials");
    } catch { setError("Login failed"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)", display:"grid", placeItems:"center", padding:24 }}>
      <div style={{
        background:"var(--surface)", border:"1px solid var(--border)",
        borderRadius:16, padding:"48px 40px", width:"100%", maxWidth:400, textAlign:"center",
      }}>
        <div style={{
          width:56, height:56, borderRadius:12, margin:"0 auto 20px",
          background:"linear-gradient(135deg, var(--cyan), var(--violet))",
          display:"grid", placeItems:"center",
          fontFamily:"var(--mono)", fontWeight:700, fontSize:20, color:"var(--bg)",
        }}>AR</div>
        <h1 style={{ fontFamily:"var(--display)", fontSize:28, color:"var(--text)", marginBottom:6 }}>Admin</h1>
        <p style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)", marginBottom:32 }}>ALEX RIVERA PORTFOLIO</p>

        <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14, textAlign:"left" }}>
          {["username","password"].map(f => (
            <input key={f} type={f==="password"?"password":"text"} placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
              value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} required
              style={inputStyle}
            />
          ))}
          {error && <p style={{ color:"#f87171", fontFamily:"var(--mono)", fontSize:12 }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            padding:13, background:"linear-gradient(135deg, var(--cyan), var(--violet))",
            color:"var(--bg)", border:"none", borderRadius:8, fontSize:15, fontWeight:700,
            fontFamily:"var(--sans)", cursor:"pointer",
          }}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
        <a href="/" style={{ display:"block", marginTop:24, fontSize:13, color:"var(--text-3)" }}>← Back to portfolio</a>
      </div>
    </div>
  );
}

// ─── Project Form (create / edit) ─────────────────────────────────────────────
const EMPTY_PROJECT = { title:"", description:"", techStack:"", githubLink:"", liveLink:"", imageUrl:"", featured:false, order:0 };

function ProjectForm({ initial, onSave, onCancel, saving }) {
  const [form, setForm] = useState(
    initial
      ? { ...initial, techStack: Array.isArray(initial.techStack) ? initial.techStack.join(", ") : "" }
      : EMPTY_PROJECT
  );
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = e => {
    e.preventDefault();
    onSave({ ...form, techStack: form.techStack.split(",").map(s => s.trim()).filter(Boolean) });
  };

  return (
    <form onSubmit={submit} style={{
      background:"var(--surface)", border:"1px solid var(--border-2)",
      borderRadius:12, padding:28, display:"flex", flexDirection:"column", gap:16,
    }}>
      <h3 style={{ fontFamily:"var(--display)", fontSize:18, fontWeight:700, color:"var(--cyan)", marginBottom:4 }}>
        {initial ? "Edit Project" : "New Project"}
      </h3>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <div>
          <label style={labelStyle}>Title *</label>
          <input value={form.title} onChange={e => set("title", e.target.value)} required style={inputStyle} placeholder="Project name" />
        </div>
        <div>
          <label style={labelStyle}>Tech Stack (comma-separated)</label>
          <input value={form.techStack} onChange={e => set("techStack", e.target.value)} style={inputStyle} placeholder="Python, React, MongoDB" />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Description *</label>
        <textarea value={form.description} onChange={e => set("description", e.target.value)} required rows={4}
          style={{ ...inputStyle, resize:"vertical" }} placeholder="What does this project do?" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        <div>
          <label style={labelStyle}>GitHub Link</label>
          <input value={form.githubLink} onChange={e => set("githubLink", e.target.value)} style={inputStyle} placeholder="https://github.com/..." />
        </div>
        <div>
          <label style={labelStyle}>Live Link</label>
          <input value={form.liveLink} onChange={e => set("liveLink", e.target.value)} style={inputStyle} placeholder="https://..." />
        </div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 1fr", gap:14, alignItems:"end" }}>
        <div>
          <label style={labelStyle}>Image URL</label>
          <input value={form.imageUrl} onChange={e => set("imageUrl", e.target.value)} style={inputStyle} placeholder="https://..." />
        </div>
        <div>
          <label style={labelStyle}>Order</label>
          <input type="number" value={form.order} onChange={e => set("order", Number(e.target.value))} style={inputStyle} />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10, paddingBottom:2 }}>
          <input type="checkbox" id="featured" checked={form.featured} onChange={e => set("featured", e.target.checked)}
            style={{ width:16, height:16, cursor:"pointer" }} />
          <label htmlFor="featured" style={{ ...labelStyle, marginBottom:0, cursor:"pointer" }}>Featured</label>
        </div>
      </div>

      <div style={{ display:"flex", gap:10, justifyContent:"flex-end", marginTop:4 }}>
        <button type="button" onClick={onCancel} style={{
          padding:"9px 20px", background:"transparent", border:"1px solid var(--border)",
          color:"var(--text-2)", borderRadius:7, cursor:"pointer", fontSize:13, fontFamily:"var(--sans)",
        }}>Cancel</button>
        <button type="submit" disabled={saving} style={{
          padding:"9px 20px", background:"linear-gradient(135deg, var(--cyan), var(--violet))",
          color:"var(--bg)", border:"none", borderRadius:7, cursor:"pointer", fontSize:13,
          fontWeight:700, fontFamily:"var(--sans)",
        }}>
          {saving ? "Saving..." : initial ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}

// ─── Projects Tab ─────────────────────────────────────────────────────────────
function ProjectsTab({ token }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [editing, setEditing]   = useState(null);   // null | "new" | project object
  const [saving, setSaving]     = useState(false);

  useEffect(() => {
    getProjects().then(setProjects).finally(() => setLoading(false));
  }, []);

  const handleCreate = async data => {
    setSaving(true);
    try {
      const p = await createProject(data, token);
      setProjects(ps => [...ps, p].sort((a, b) => a.order - b.order));
      setEditing(null);
    } finally { setSaving(false); }
  };

  const handleUpdate = async data => {
    setSaving(true);
    try {
      const p = await updateProject(editing._id, data, token);
      setProjects(ps => ps.map(x => x._id === p._id ? p : x));
      setEditing(null);
    } finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id, token);
    setProjects(ps => ps.filter(p => p._id !== id));
  };

  if (loading) return <p style={{ fontFamily:"var(--mono)", color:"var(--text-3)" }}>Loading...</p>;

  return (
    <div>
      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:32 }}>
        {[
          { num: projects.length,                              label:"Total Projects" },
          { num: projects.filter(p => p.featured).length,     label:"Featured", color:"var(--cyan)" },
          { num: projects.filter(p => !p.featured).length,    label:"Not Featured" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding:"20px", textAlign:"center" }}>
            <p style={{ fontFamily:"var(--display)", fontSize:36, fontWeight:800, color: s.color || "var(--text)", lineHeight:1, marginBottom:4 }}>{s.num}</p>
            <p style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-3)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Add button */}
      {editing !== "new" && (
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ fontFamily:"var(--display)", fontSize:20, fontWeight:700, color:"var(--text)" }}>Projects</h3>
          <button onClick={() => setEditing("new")} style={{
            padding:"9px 20px", background:"var(--cyan-dim)", border:"1px solid rgba(99,210,255,0.3)",
            color:"var(--cyan)", borderRadius:7, cursor:"pointer", fontSize:13,
            fontFamily:"var(--sans)", fontWeight:600,
          }}>+ New Project</button>
        </div>
      )}

      {/* New project form */}
      {editing === "new" && (
        <div style={{ marginBottom:24 }}>
          <ProjectForm onSave={handleCreate} onCancel={() => setEditing(null)} saving={saving} />
        </div>
      )}

      {/* Project list */}
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {projects.map(p => (
          <div key={p._id}>
            {editing?._id === p._id ? (
              <ProjectForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} saving={saving} />
            ) : (
              <div className="card" style={{ padding:"20px 24px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                      <h4 style={{ fontFamily:"var(--display)", fontSize:16, fontWeight:700, color:"var(--text)" }}>{p.title}</h4>
                      {p.featured && (
                        <span style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.12em", color:"var(--cyan)",
                          background:"var(--cyan-dim)", border:"1px solid rgba(99,210,255,0.3)", padding:"2px 8px", borderRadius:100 }}>
                          FEATURED
                        </span>
                      )}
                      <span style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--text-3)" }}>#{p.order}</span>
                    </div>
                    <p style={{ fontSize:13, color:"var(--text-2)", lineHeight:1.6, marginBottom:10 }}>{p.description}</p>
                    {p.techStack?.length > 0 && (
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                        {p.techStack.map(t => (
                          <span key={t} style={{ fontFamily:"var(--mono)", fontSize:10, padding:"2px 8px",
                            borderRadius:100, background:"var(--surface-2)", border:"1px solid var(--border)", color:"var(--text-3)" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                    <button onClick={() => setEditing(p)} style={{
                      padding:"6px 14px", background:"var(--surface-2)", border:"1px solid var(--border)",
                      color:"var(--text-2)", borderRadius:6, cursor:"pointer", fontSize:12, fontFamily:"var(--sans)",
                    }}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={{
                      padding:"6px 14px", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)",
                      color:"#f87171", borderRadius:6, cursor:"pointer", fontSize:12, fontFamily:"var(--sans)",
                    }}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Messages Tab ─────────────────────────────────────────────────────────────
function MessagesTab({ token, onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    getContacts(token).then(setContacts).catch(onLogout).finally(() => setLoading(false));
  }, []);

  const handleDelete = async id => {
    if (!confirm("Delete this message?")) return;
    await deleteContact(id, token);
    setContacts(c => c.filter(m => m._id !== id));
  };
  const handleRead = async id => {
    await markRead(id, token);
    setContacts(c => c.map(m => m._id === id ? { ...m, read: true } : m));
  };

  const unread = contacts.filter(c => !c.read).length;

  return (
    <div>
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:32 }}>
        {[
          { num: contacts.length,              label:"Total Messages" },
          { num: unread,                        label:"Unread",  color:"var(--cyan)" },
          { num: contacts.length - unread,      label:"Read" },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding:"20px", textAlign:"center" }}>
            <p style={{ fontFamily:"var(--display)", fontSize:36, fontWeight:800, color: s.color || "var(--text)", lineHeight:1, marginBottom:4 }}>{s.num}</p>
            <p style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-3)" }}>{s.label}</p>
          </div>
        ))}
      </div>

      <h3 style={{ fontFamily:"var(--display)", fontSize:20, fontWeight:700, color:"var(--text)", marginBottom:20 }}>Messages</h3>

      {loading ? (
        <p style={{ fontFamily:"var(--mono)", color:"var(--text-3)" }}>Loading...</p>
      ) : contacts.length === 0 ? (
        <p style={{ fontFamily:"var(--mono)", color:"var(--text-3)", fontStyle:"italic" }}>No messages yet.</p>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {contacts.map(msg => (
            <div key={msg._id} className="card" style={{
              padding:"24px 28px",
              borderLeft: !msg.read ? "3px solid var(--cyan)" : "1px solid var(--border)",
              borderRadius: !msg.read ? "0 16px 16px 0" : 16,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%",
                    background:"linear-gradient(135deg,var(--surface-2),var(--surface))",
                    border:"1px solid var(--border)", display:"grid", placeItems:"center",
                    fontFamily:"var(--display)", fontSize:16, fontWeight:700, color:"var(--cyan)", flexShrink:0 }}>
                    {msg.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontWeight:600, color:"var(--text)", fontSize:15 }}>{msg.name}</p>
                    <p style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>{msg.email}</p>
                  </div>
                  {!msg.read && (
                    <span style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.12em", color:"var(--cyan)",
                      background:"var(--cyan-dim)", border:"1px solid rgba(99,210,255,0.3)", padding:"2px 8px", borderRadius:100 }}>
                      NEW
                    </span>
                  )}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>
                    {new Date(msg.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                  </span>
                  {!msg.read && (
                    <button onClick={() => handleRead(msg._id)} style={{ padding:"5px 12px", background:"var(--surface-2)",
                      border:"1px solid var(--border)", color:"var(--text-2)", borderRadius:5, cursor:"pointer",
                      fontSize:12, fontFamily:"var(--sans)" }}>
                      Mark Read
                    </button>
                  )}
                  <button onClick={() => handleDelete(msg._id)} style={{ padding:"5px 12px", background:"rgba(248,113,113,0.08)",
                    border:"1px solid rgba(248,113,113,0.2)", color:"#f87171", borderRadius:5, cursor:"pointer",
                    fontSize:12, fontFamily:"var(--sans)" }}>
                    Delete
                  </button>
                </div>
              </div>
              <p style={{ fontWeight:600, color:"var(--text)", fontSize:14, marginBottom:8 }}>{msg.subject}</p>
              <p style={{ fontSize:14, color:"var(--text-2)", lineHeight:1.65 }}>{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Dashboard shell ──────────────────────────────────────────────────────────
function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState("messages");

  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)} style={{
      padding:"10px 22px", borderRadius:8, cursor:"pointer",
      fontFamily:"var(--mono)", fontSize:12, letterSpacing:"0.06em",
      border: tab === id ? "1px solid rgba(99,210,255,0.4)" : "1px solid var(--border)",
      background: tab === id ? "var(--cyan-dim)" : "transparent",
      color: tab === id ? "var(--cyan)" : "var(--text-2)",
      transition:"all 0.2s",
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg-2)" }}>
      {/* Header */}
      <header style={{
        background:"var(--bg)", borderBottom:"1px solid var(--border)",
        padding:"14px 0", position:"sticky", top:0, zIndex:10,
      }}>
        <div className="container" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:8,
              background:"linear-gradient(135deg,var(--cyan),var(--violet))",
              display:"grid", placeItems:"center", fontFamily:"var(--mono)", fontWeight:700, fontSize:14, color:"var(--bg)" }}>
              AR
            </div>
            <div>
              <p style={{ fontFamily:"var(--display)", fontWeight:700, fontSize:15, color:"var(--text)" }}>Admin Dashboard</p>
              <p style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--text-3)" }}>Alex Rivera Portfolio</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <a href="/" className="btn btn-outline" style={{ padding:"8px 18px", fontSize:13 }}>← Portfolio</a>
            <button onClick={onLogout} style={{ padding:"8px 18px", background:"rgba(248,113,113,0.1)",
              border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", borderRadius:6,
              cursor:"pointer", fontSize:13, fontFamily:"var(--sans)" }}>Logout</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop:36, paddingBottom:60 }}>
        {/* Tabs */}
        <div style={{ display:"flex", gap:10, marginBottom:36 }}>
          {tabBtn("messages", "📬  Messages")}
          {tabBtn("projects", "🗂  Projects")}
        </div>

        {tab === "messages" && <MessagesTab token={token} onLogout={onLogout} />}
        {tab === "projects" && <ProjectsTab token={token} />}
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const handleLogin  = t => { setToken(t); localStorage.setItem("admin_token", t); };
  const handleLogout = () => { setToken(null); localStorage.removeItem("admin_token"); };
  return token ? <Dashboard token={token} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}
