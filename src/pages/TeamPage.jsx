import { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import { dashboardApi } from "../services/mockApi";

export default function TeamPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    dashboardApi.getTeam().then(setTeam);
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Team"
        subtitle="People involved in project review, compliance, and oversight."
      />

      <section className="card-grid three">
        {team.map((member) => (
          <article key={member.id} className="panel">
            <div className="avatar-lg">{member.name.charAt(0)}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
            <div className="details-list compact">
              <div>
                <span>Department</span>
                <strong>{member.department}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{member.status}</strong>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}
