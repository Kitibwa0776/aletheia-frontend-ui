import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="not-found-shell">
      <div className="not-found-card">
        <span className="eyebrow">404</span>
        <h1>Page not found</h1>
        <p>The route you opened does not exist in this frontend package.</p>
        <Link className="primary-button" to="/dashboard">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
