import {
  Bell,
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Upload,
  Users,
  BarChart3,
  UserCircle2,
  LockKeyhole
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/compliance", label: "Compliance", icon: ShieldCheck },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/team", label: "Team", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: UserCircle2 },
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help Center", icon: BookOpen }
];

export default function Sidebar() {
  const { currentUser } = useAuth();

  return (
    <aside className="sidebar">
      <div className="brand-block">
        <div className="brand-mark">A</div>
        <div>
          <strong>Aletheia AI</strong>
          <p>Mining Compliance</p>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}

        {currentUser?.role === "admin" ? (
          <NavLink
            to="/admin"
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <LockKeyhole size={18} />
            <span>Admin</span>
          </NavLink>
        ) : null}
      </nav>

      <div className="sidebar-footer">
        <small>Role</small>
        <strong>{currentUser?.role?.replaceAll("_", " ")}</strong>
      </div>
    </aside>
  );
}
