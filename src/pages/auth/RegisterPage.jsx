import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { authApi } from "../../services/mockApi";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
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

    console.log("📝 Registration submitted with data:", form);

    try {
      // Call the registration API
      console.log("🚀 Sending registration request to API...");
      const apiResponse = await authApi.register(form);
      console.log("✅ API Response received:", apiResponse);

      // Pass the API response to the auth context register function
      console.log("🔑 Storing user and tokens in auth context...");
      const response = await register({
        ...form,
        user: apiResponse.user,
        access: apiResponse.access,
        refresh: apiResponse.refresh
      });

      console.log("📦 Auth context response:", response);

      if (!response.success) {
        console.error("❌ Registration failed:", response.message);
        setIsError(true);
        setMessage(response.message);
        return;
      }

      console.log("🎉 Registration successful! User:", response.user);
      setIsError(false);
      setMessage("Account created successfully. Redirecting to dashboard...");
      // Auto-login and redirect to dashboard since we have tokens
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("💥 Registration error:", error.message);
      setIsError(true);
      setMessage(error.message || "Registration failed. Please try again.");
    }
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
          Password
          <input
            name="password"
            type="password"
            value={form.password}
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
