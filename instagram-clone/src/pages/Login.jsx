import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: "", password: "" });
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.id.trim() || !form.password) return setError("Please fill in all fields.");
    const err = login(form.id.trim(), form.password);
    if (err) setError(err); else navigate("/");
  };

  return (
    <div className="auth">
      <form className="auth-card" onSubmit={submit}>
        <Logo size={44} />
        <p className="muted">Share moments with the people you love.</p>
        <input className="input" placeholder="Username or email" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <div className="error">{error}</div>}
        <button className="btn wide">Log in</button>
        <button type="button" className="link-btn" onClick={() => alert("Password reset isn't available in this frontend-only demo.")}>Forgot password?</button>
        <div className="hint">Demo account: <b>demo</b> / <b>demo123</b></div>
        <hr />
        <Link to="/register" className="btn ghost wide">Create new account</Link>
      </form>
    </div>
  );
}
