import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Lock, Mail, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "2300810607@std.kyu.ac.ug",
    password: "password"
  });
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nextPath = location.state?.from ?? "/dashboard";

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");

    const response = await login(form);

    if (response.success) {
      navigate(nextPath);
    } else {
      setMessage(response.message);
    }

    setSubmitting(false);
  };

  return (
    <div className="auth-shell">
      <section className="auth-panel">
        <div className="auth-copy">
          <span className="eyebrow"> Michael knows Frontend</span>
          <h1>Aletheia AI</h1>
          <p>
            Mining compliance workspace with mock authentication, project
            tracking, reporting, analytics, and admin views.
          </p>

          <div className="feature-list">
            <div>
              <Shield size={18} />
              <span>Protected routes and role-aware pages</span>
            </div>
            <div>
              <Mail size={18} />
              <span>Ready for backend connection later</span>
            </div>
            <div>
              <Lock size={18} />
              <span>Clean UI people can interact with immediately</span>
            </div>
          </div>
        </div>

        <form className="auth-card" onSubmit={handleSubmit}>
          <div className="card-heading">
            <h2>Sign in</h2>
            <p>Use any demo email with a non-empty password.</p>
          </div>

          <label>
            Email address
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@company.com"
            />
          </label>

          <label>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </label>

          {message ? <div className="form-message error">{message}</div> : null}

          <button className="primary-button" type="submit" disabled={submitting}>
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot password?</Link>
            <Link to="/register">Create account</Link>
          </div>

          <div className="demo-box">
            <strong>Demo emails</strong>
            <ul>
              <li>2300810607@std.kyu.ac.ug</li>
              <li>officer@mining.ug</li>
              <li>manager@mining.ug</li>
              <li>auditor@mining.ug</li>
            </ul>
          </div>
        </form>
      </section>
    </div>
  );
}
