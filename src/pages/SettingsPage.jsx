import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";

export default function SettingsPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Settings"
        subtitle="Application preferences prepared for later backend hookup."
      />

      <section className="form-grid">
        <article className="panel">
          <label>
            Notification email
            <input defaultValue="alerts@company.com" />
          </label>

          <label>
            Default review mode
            <select defaultValue="standard">
              <option value="standard">Standard review</option>
              <option value="fast">Fast review</option>
              <option value="deep">Deep review</option>
            </select>
          </label>

          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Enable compliance reminders</span>
          </label>
        </article>

        <article className="panel">
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Show analytics on dashboard</span>
          </label>

          <label className="checkbox-row">
            <input type="checkbox" />
            <span>Require manager approval before export</span>
          </label>

          <button className="primary-button">Save settings</button>
        </article>
      </section>
    </AppLayout>
  );
}
