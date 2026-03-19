import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Plus, Search } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/common/StatusBadge";
import { projectApi } from "../services/mockApi";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");

  useEffect(() => {
    projectApi.getAll().then(setProjects);
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        project.name.toLowerCase().includes(query.toLowerCase()) ||
        project.location.toLowerCase().includes(query.toLowerCase()) ||
        project.company.toLowerCase().includes(query.toLowerCase());

      const matchesStatus = status === "All" ? true : project.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [projects, query, status]);

  return (
    <AppLayout>
      <PageHeader
        title="Projects"
        subtitle="Explore mining projects, project status, risk, and documentation progress."
        action={
          <Link className="primary-button small" to="/upload">
            <Plus size={16} />
            New upload
          </Link>
        }
      />

      <section className="panel controls-panel">
        <label className="search-shell wide">
          <Search size={16} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by project, company, or location..."
          />
        </label>

        <label className="select-shell">
          <Filter size={16} />
          <select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>All</option>
            <option>Compliant</option>
            <option>Needs Review</option>
            <option>In Progress</option>
            <option>Critical</option>
          </select>
        </label>
      </section>

      <section className="project-grid">
        {filtered.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card-top">
              <div>
                <span className="eyebrow">{project.id}</span>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <StatusBadge value={project.status} />
            </div>

            <div className="project-meta">
              <span>{project.company}</span>
              <span>{project.location}</span>
              <span>{project.phase}</span>
              <span>{project.mineral}</span>
            </div>

            <div className="progress-row">
              <div>
                <small>Compliance score</small>
                <strong>{project.complianceScore}%</strong>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${project.complianceScore}%` }}
                />
              </div>
            </div>

            <div className="project-footer">
              <div className="mini-stat">
                <small>Reports</small>
                <strong>{project.reports}</strong>
              </div>
              <div className="mini-stat">
                <small>Pending actions</small>
                <strong>{project.pendingActions}</strong>
              </div>
              <Link className="ghost-button small" to={`/projects/${project.id}`}>
                Open details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}
