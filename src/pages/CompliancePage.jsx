import { CheckCircle2, CircleAlert, Shield } from "lucide-react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";

const checks = [
  { name: "Licensing documentation", result: "Passed", tone: "success" },
  { name: "Environmental baseline evidence", result: "Pending", tone: "warning" },
  { name: "Community engagement records", result: "Passed", tone: "success" },
  { name: "Waste handling plan", result: "Attention required", tone: "danger" }
];

export default function CompliancePage() {
  return (
    <AppLayout>
      <PageHeader
        title="Compliance center"
        subtitle="Review policy checks, readiness, and project obligations."
      />

      <section className="compliance-hero panel">
        <div>
          <span className="eyebrow">Compliance workflow</span>
          <h3>Check readiness before approval and escalation.</h3>
          <p>
 
            needing backend integration yet.
          </p>
        </div>
        <div className="hero-icon">
          <Shield size={38} />
        </div>
      </section>

      <section className="stack-list">
        {checks.map((check) => (
          <article key={check.name} className="list-card">
            <div className={`icon-badge ${check.tone}`}>
              {check.tone === "success" ? (
                <CheckCircle2 size={18} />
              ) : (
                <CircleAlert size={18} />
              )}
            </div>
            <div>
              <strong>{check.name}</strong>
              <p>{check.result}</p>
            </div>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}
