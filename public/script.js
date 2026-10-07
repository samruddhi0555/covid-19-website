// Same patterns as utils/validators.js (the browser cannot import that file)
const re = {
  name: /^[A-Za-z ]{2,50}$/,
  email: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
  phone: /^[6-9]\d{9}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/,
  comment: /^[^<>]{1,500}$/
};

const val = id => document.getElementById(id).value;

async function post(url, data) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return r.json();
}

async function register() {
  const d = { name: val("rn"), email: val("re"), phone: val("rp"), password: val("rw") };
  for (const k in d) if (!re[k].test(d[k])) return alert("Invalid " + k);
  const r = await post("/api/register", d);
  alert(r.ok ? "Registered successfully" : r.error);
}

async function login() {
  const r = await post("/api/login", { email: val("le"), password: val("lw") });
  alert(r.ok ? "Welcome " + r.name : r.error);
}

async function logout() {
  await post("/api/logout", {});
  alert("Logged out");
}

async function addComment() {
  if (!re.comment.test(val("ct"))) return alert("Invalid comment");
  const r = await post("/api/comments", { text: val("ct") });
  if (!r.ok) return alert(r.error);
  document.getElementById("ct").value = "";
  loadComments();
}

async function loadComments() {
  const list = document.getElementById("list");
  list.innerHTML = "";
  const data = await (await fetch("/api/comments")).json();
  data.forEach(c => {
    const p = document.createElement("p");
    p.textContent = (c.userId ? c.userId.name : "User") + ": " + c.text;
    list.appendChild(p);
  });
}

loadComments();