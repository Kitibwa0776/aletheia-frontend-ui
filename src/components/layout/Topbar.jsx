import { LogOut, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const pageNames = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/upload": "Upload Reports",
  "/compliance": "Compliance",
  "/analytics": "Analytics",
  "/team": "Team",
  "/notifications": "Notifications",
  "/profile": "Profile",
  "/settings": "Settings",
  "/help": "Help Center",
  "/admin": "Admin"
};

export default function Topbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const title = pageNames[location.pathname] ?? "Workspace";

  return (
    <header className="topbar">
      <div>
        <span className="eyebrow">Workspace</span>
        <h2>{title}</h2>
      </div>

      <div className="topbar-actions">
        <label className="search-shell">
          <Search size={16} />
          <input placeholder="Search projects, reports, team..." />
        </label>

        <Link to="/profile" className="profile-pill">
          <span>{currentUser?.name?.charAt(0) ?? "U"}</span>
          <div>
            <strong>{currentUser?.name}</strong>
            <small>{currentUser?.company}</small>
          </div>
        </Link>

        <button className="ghost-button" onClick={logout} type="button">
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </header>
  );
}
