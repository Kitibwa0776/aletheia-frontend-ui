import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const { users } = useAuth();

  return (
    <AppLayout>
      <PageHeader
        title="Admin"
        subtitle="Manage users, platform readiness, and role access."
      />

      <section className="split-grid">
        <article className="panel">
          <h3>User accounts</h3>
          <div className="stack-list">
            {users.map((user) => (
              <div key={user.id} className="list-card">
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>
                <span className="info-chip">{user.role.replaceAll("_", " ")}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel">
          <h3>Frontend status</h3>
          <ul className="bullet-list">
            <li>Routing is configured</li>
            <li>Authentication is mocked</li>
            <li>Project data is mocked</li>
            <li>Ready for backend API connection later</li>
          </ul>
        </article>
      </section>
    </AppLayout>
  );
}
