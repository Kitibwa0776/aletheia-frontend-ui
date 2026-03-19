import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import StatusBadge from "../components/common/StatusBadge";
import { projectApi } from "../services/mockApi";

export default function ProjectDetailsPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    projectApi.getById(projectId).then(setProject);
  }, [projectId]);

  if (!project) {
    return (
      <AppLayout>
        <div className="panel">
          <h3>Loading project...</h3>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <PageHeader
        title={project.name}
        subtitle={`${project.company} · ${project.location}`}
        action={<StatusBadge value={project.status} />}
      />

      <section className="details-grid">
        <article className="panel">
          <h3>Overview</h3>
          <div className="details-list">
            <div>
              <span>Project ID</span>
              <strong>{project.id}</strong>
            </div>
            <div>
              <span>Mineral</span>
              <strong>{project.mineral}</strong>
            </div>
            <div>
              <span>Phase</span>
              <strong>{project.phase}</strong>
            </div>
            <div>
              <span>Owner</span>
              <strong>{project.owner}</strong>
            </div>
            <div>
              <span>Risk level</span>
              <strong>{project.riskLevel}</strong>
            </div>
            <div>
              <span>Last updated</span>
              <strong>{project.lastUpdated}</strong>
            </div>
          </div>
        </article>

        <article className="panel">
          <h3>Compliance snapshot</h3>
          <div className="score-panel">
            <strong>{project.complianceScore}%</strong>
            <p>Current compliance score</p>
          </div>

          <div className="progress-track large">
            <div
              className="progress-fill"
              style={{ width: `${project.complianceScore}%` }}
            />
          </div>

          <div className="info-chip-row">
            <span className="info-chip">{project.reports} reports</span>
            <span className="info-chip">{project.pendingActions} pending actions</span>
            <span className="info-chip">{project.riskLevel} risk</span>
          </div>
        </article>
      </section>

      <section className="split-grid">
        <article className="panel">
          <h3>Summary</h3>
          <p>{project.summary}</p>
        </article>

        <article className="panel">
          <h3>Key findings</h3>
          <ul className="bullet-list">
            {project.keyFindings.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h3>Actions</h3>
          <Link className="ghost-button small" to="/upload">
            Upload follow-up report
          </Link>
        </div>
        <div className="action-row">
          <button className="primary-button">Start review</button>
          <button className="ghost-button">Assign team member</button>
          <button className="ghost-button">Export summary</button>
        </div>
      </section>
    </AppLayout>
  );
}
