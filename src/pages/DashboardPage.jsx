import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import StatCard from "../components/common/StatCard";
import StatusBadge from "../components/common/StatusBadge";
import AppLayout from "../components/layout/AppLayout";
import { dashboardApi, projectApi } from "../services/mockApi";

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [items, setItems] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const [dashboardStats, projects, notifications] = await Promise.all([
        projectApi.getDashboardStats(),
        projectApi.getAll(),
        dashboardApi.getNotifications()
      ]);

      setStats(dashboardStats);
      setItems(projects.slice(0, 3));
      setAlerts(notifications);
    };

    load();
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Operational dashboard"
        subtitle="Quick view of project health, activity, and action points."
        action={
          <Link className="primary-button small" to="/projects">
            View all projects
          </Link>
        }
      />

      <section className="stats-grid">
        <StatCard
          label="Total projects"
          value={stats?.totalProjects ?? "--"}
          helper="Current mining portfolio"
        />
        <StatCard
          label="Average compliance"
          value={`${stats?.averageCompliance ?? "--"}%`}
          helper="Across all active projects"
        />
        <StatCard
          label="Compliant projects"
          value={stats?.compliantProjects ?? "--"}
          helper="Meeting current thresholds"
        />
        <StatCard
          label="Critical projects"
          value={stats?.criticalProjects ?? "--"}
          helper="Require immediate attention"
        />
      </section>

      <section className="split-grid">
        <article className="panel">
          <div className="panel-header">
            <h3>Priority projects</h3>
            <Link to="/projects">Open projects</Link>
          </div>

          <div className="stack-list">
            {items.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`} className="list-card">
                <div>
                  <strong>{project.name}</strong>
                  <p>
                    {project.location} · {project.phase}
                  </p>
                </div>
                <div className="right-inline">
                  <StatusBadge value={project.status} />
                  <span className="score-pill">{project.complianceScore}%</span>
                </div>
              </Link>
            ))}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Recent activity</h3>
            <Link to="/notifications">See all</Link>
          </div>

          <div className="stack-list">
            {alerts.map((alert) => (
              <div key={alert.id} className="list-card muted">
                <div className="icon-badge">
                  {alert.category === "alert" ? (
                    <CircleAlert size={18} />
                  ) : alert.category === "update" ? (
                    <CheckCircle2 size={18} />
                  ) : (
                    <Clock3 size={18} />
                  )}
                </div>
                <div>
                  <strong>{alert.title}</strong>
                  <p>{alert.message}</p>
                  <small>{alert.time}</small>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="panel cta-panel">
        <div>
          <span className="eyebrow">Next best action</span>
          <h3>Upload a new compliance report or review flagged projects.</h3>
          
        </div>
        <div className="cta-actions">
          <Link className="primary-button" to="/upload">
            Upload report
          </Link>
          <Link className="ghost-button" to="/compliance">
            Open compliance center
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </AppLayout>
  );
}
