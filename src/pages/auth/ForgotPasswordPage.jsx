import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(Boolean(email.trim()));
  };

  return (
    <div className="auth-shell simple">
      <form className="auth-card narrow" onSubmit={handleSubmit}>
        <div className="card-heading">
          <h2>Forgot password</h2>
          <p>This is a mock recovery flow for the frontend only.</p>
        </div>

        <label>
          Enter your email
          <input
            type="email"
            value={email}
            placeholder="name@company.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        {sent ? (
          <div className="form-message success">
            A mock reset link has been generated for {email}.
          </div>
        ) : null}

        <button className="primary-button" type="submit">
          Send reset link
        </button>

        <div className="auth-links center">
          <Link to="/login">Back to sign in</Link>
        </div>
      </form>
    </div>
  );
}
