import { useState, useEffect } from "react";
import { login, getContacts, deleteContact, markRead } from "../api/client.js";

function Login({ onLogin }) {
  const [form, setForm]     = useState({ username:"", password:"" });
  const [error, setError]   = useState("");
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
        }}>AK</div>
        <h1 style={{ fontFamily:"var(--display)", fontSize:28, color:"var(--text)", marginBottom:6 }}>Admin</h1>
        <p style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)", marginBottom:32 }}>ANUP KATUWAL PORTFOLIO</p>

        <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:14, textAlign:"left" }}>
          {["username","password"].map(f => (
            <input key={f} type={f==="password"?"password":"text"} placeholder={f.charAt(0).toUpperCase()+f.slice(1)}
              value={form[f]} onChange={e => setForm(p => ({ ...p, [f]: e.target.value }))} required
              style={{
                padding:"12px 16px", border:"1px solid var(--border)", borderRadius:8,
                background:"var(--bg-2)", color:"var(--text)", fontFamily:"var(--sans)", fontSize:14, outline:"none",
              }}
            />
          ))}
          {error && <p style={{ color:"#f87171", fontFamily:"var(--mono)", fontSize:12 }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ padding:13, background:"linear-gradient(135deg, var(--cyan), var(--violet))",
              color:"var(--bg)", border:"none", borderRadius:8, fontSize:15, fontWeight:700,
              fontFamily:"var(--sans)", cursor:"pointer" }}>
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
        <a href="/" style={{ display:"block", marginTop:24, fontSize:13, color:"var(--text-3)" }}>← Back to portfolio</a>
      </div>
    </div>
  );
}

function Dashboard({ token, onLogout }) {
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
    <div style={{ minHeight:"100vh", background:"var(--bg-2)" }}>
      {/* Header */}
      <header style={{
        background:"var(--bg)", borderBottom:"1px solid var(--border)",
        padding:"14px 0", position:"sticky", top:0, zIndex:10,
      }}>
        <div className="container" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:8, background:"linear-gradient(135deg,var(--cyan),var(--violet))", display:"grid", placeItems:"center", fontFamily:"var(--mono)", fontWeight:700, fontSize:14, color:"var(--bg)" }}>AK</div>
            <div>
              <p style={{ fontFamily:"var(--display)", fontWeight:700, fontSize:15, color:"var(--text)" }}>Admin Dashboard</p>
              <p style={{ fontFamily:"var(--mono)", fontSize:10, color:"var(--text-3)" }}>Anup Katuwal Portfolio</p>
            </div>
          </div>
          <div style={{ display:"flex", gap:12 }}>
            <a href="/" className="btn btn-outline" style={{ padding:"8px 18px", fontSize:13 }}>← Portfolio</a>
            <button onClick={onLogout} style={{ padding:"8px 18px", background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", borderRadius:6, cursor:"pointer", fontSize:13, fontFamily:"var(--sans)" }}>Logout</button>
          </div>
        </div>
      </header>

      <div className="container" style={{ paddingTop:40, paddingBottom:60 }}>
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:40 }}>
          {[
            { num: contacts.length, label:"Total Messages" },
            { num: unread,          label:"Unread",  color:"var(--cyan)" },
            { num: contacts.length - unread, label:"Read" },
          ].map(s => (
            <div key={s.label} className="card" style={{ padding:"24px", textAlign:"center" }}>
              <p style={{ fontFamily:"var(--display)", fontSize:40, fontWeight:800, color: s.color || "var(--text)", lineHeight:1, marginBottom:6 }}>{s.num}</p>
              <p style={{ fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em", textTransform:"uppercase", color:"var(--text-3)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Messages */}
        <h2 style={{ fontFamily:"var(--display)", fontSize:24, fontWeight:700, color:"var(--text)", marginBottom:20 }}>Contact Messages</h2>

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
                    <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,var(--surface-2),var(--surface))", border:"1px solid var(--border)", display:"grid", placeItems:"center", fontFamily:"var(--display)", fontSize:16, fontWeight:700, color:"var(--cyan)", flexShrink:0 }}>
                      {msg.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontWeight:600, color:"var(--text)", fontSize:15 }}>{msg.name}</p>
                      <p style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>{msg.email}</p>
                    </div>
                    {!msg.read && <span style={{ fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.12em", color:"var(--cyan)", background:"var(--cyan-dim)", border:"1px solid rgba(99,210,255,0.3)", padding:"2px 8px", borderRadius:100 }}>NEW</span>}
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"var(--mono)", fontSize:11, color:"var(--text-3)" }}>
                      {new Date(msg.createdAt).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                    </span>
                    {!msg.read && (
                      <button onClick={() => handleRead(msg._id)} style={{ padding:"5px 12px", background:"var(--surface-2)", border:"1px solid var(--border)", color:"var(--text-2)", borderRadius:5, cursor:"pointer", fontSize:12, fontFamily:"var(--sans)" }}>
                        Mark Read
                      </button>
                    )}
                    <button onClick={() => handleDelete(msg._id)} style={{ padding:"5px 12px", background:"rgba(248,113,113,0.08)", border:"1px solid rgba(248,113,113,0.2)", color:"#f87171", borderRadius:5, cursor:"pointer", fontSize:12, fontFamily:"var(--sans)" }}>
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
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const handleLogin  = t => { setToken(t); localStorage.setItem("admin_token", t); };
  const handleLogout = () => { setToken(null); localStorage.removeItem("admin_token"); };
  return token ? <Dashboard token={token} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />;
}
