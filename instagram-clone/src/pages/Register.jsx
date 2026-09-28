import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";
import { isValidEmail, isValidUsername } from "../utils/helpers";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const f = { ...form, name: form.name.trim(), username: form.username.trim(), email: form.email.trim() };
    if (Object.values(f).some((v) => !v)) return setError("All fields are required.");
    if (!isValidUsername(f.username)) return setError("Username: 3-20 letters, numbers, dots or underscores.");
    if (!isValidEmail(f.email)) return setError("Please enter a valid email.");
    if (f.password.length < 6) return setError("Password must be at least 6 characters.");
    if (f.password !== f.confirm) return setError("Passwords do not match.");
    const err = register(f);
    if (err) setError(err); else navigate("/");
  };

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={submit}>
        <Logo size={44} />
        <p className="muted">Sign up to see photos and videos from your friends.</p>
        <input className="input" placeholder="Full name" value={form.name} onChange={set("name")} />
        <input className="input" placeholder="Username" value={form.username} onChange={set("username")} />
        <input className="input" placeholder="Email" value={form.email} onChange={set("email")} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={set("password")} />
        <input className="input" type="password" placeholder="Confirm password" value={form.confirm} onChange={set("confirm")} />
        {error && <div className="error">{error}</div>}
        <button className="btn wide">Register</button>
        <hr />
        <p className="muted">Have an account? <Link to="/login" className="accent">Log in</Link></p>
      </form>
    </div>
  );
}
