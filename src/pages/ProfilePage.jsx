import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import { useAuth } from "../context/AuthContext";

export default function ProfilePage() {
  const { currentUser } = useAuth();

  return (
    <AppLayout>
      <PageHeader
        title="Profile"
        subtitle="Account details for the signed-in user."
      />

      <section className="split-grid">
        <article className="panel profile-panel">
          <div className="avatar-xl">{currentUser?.name?.charAt(0)}</div>
          <h3>{currentUser?.name}</h3>
          <p>{currentUser?.email}</p>
        </article>

        <article className="panel">
          <div className="details-list">
            <div>
              <span>Company</span>
              <strong>{currentUser?.company}</strong>
            </div>
            <div>
              <span>Role</span>
              <strong>{currentUser?.role?.replaceAll("_", " ")}</strong>
            </div>
            <div>
              <span>Session type</span>
              <strong>Mock local session</strong>
            </div>
            <div>
              <span>Backend connection</span>
              <strong>Not attached yet</strong>
            </div>
          </div>
        </article>
      </section>
    </AppLayout>
  );
}
