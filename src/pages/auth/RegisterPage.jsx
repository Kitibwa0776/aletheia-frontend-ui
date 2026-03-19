import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    role: "project_manager"
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await register(form);

    if (!response.success) {
      setIsError(true);
      setMessage(response.message);
      return;
    }

    setIsError(false);
    setMessage("Account created successfully. You can now sign in.");
    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div className="auth-shell simple">
      <form className="auth-card narrow" onSubmit={handleSubmit}>
        <div className="card-heading">
          <h2>Create account</h2>
          <p>Register a frontend-only user profile.</p>
        </div>

        <label>
          Full name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Company
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="project_manager">Project Manager</option>
            <option value="compliance_officer">Compliance Officer</option>
            <option value="auditor">Auditor</option>
          </select>
        </label>

        {message ? (
          <div className={`form-message ${isError ? "error" : "success"}`}>
            {message}
          </div>
        ) : null}

        <button className="primary-button" type="submit">
          Register
        </button>

        <div className="auth-links center">
          <Link to="/login">Back to sign in</Link>
        </div>
      </form>
    </div>
  );
}
