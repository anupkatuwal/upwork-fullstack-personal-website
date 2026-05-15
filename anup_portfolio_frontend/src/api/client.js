const BASE = import.meta.env.VITE_API_URL || "/api";

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const getProfile    = () => req("/portfolio/profile");
export const getSkills     = () => req("/portfolio/skills");
export const getExperience = () => req("/portfolio/experience");
export const getEducation  = () => req("/portfolio/education");
export const getProjects   = () => req("/projects");
export const sendContact   = (d) => req("/contact", { method: "POST", body: JSON.stringify(d) });

export const login         = (d) => req("/auth/login", { method: "POST", body: JSON.stringify(d) });
export const getContacts   = (t) => req("/admin/contacts", { headers: { Authorization: `Bearer ${t}` } });
export const markRead      = (id, t) => req(`/admin/contacts/${id}/read`, { method: "PATCH", headers: { Authorization: `Bearer ${t}` } });
export const deleteContact = (id, t) => req(`/admin/contacts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${t}` } });
export const createProject = (d, t) => req("/projects", { method: "POST", body: JSON.stringify(d), headers: { Authorization: `Bearer ${t}` } });
export const updateProject = (id, d, t) => req(`/projects/${id}`, { method: "PUT", body: JSON.stringify(d), headers: { Authorization: `Bearer ${t}` } });
export const deleteProject = (id, t) => req(`/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${t}` } });
