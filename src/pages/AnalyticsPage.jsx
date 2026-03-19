import { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import { dashboardApi } from "../services/mockApi";

export default function AnalyticsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    dashboardApi.getAnalytics().then(setItems);
  }, []);

  const total = items.reduce((sum, item) => sum + item.value, 0);

  return (
    <AppLayout>
      <PageHeader
        title="Analytics"
        subtitle="Visual summary of project status distribution."
      />

      <section className="panel">
        <h3>Status distribution</h3>
        <div className="analytics-stack">
          {items.map((item) => {
            const percent = total ? Math.round((item.value / total) * 100) : 0;
            return (
              <div key={item.label} className="analytics-row">
                <div className="analytics-top">
                  <strong>{item.label}</strong>
                  <span>
                    {item.value}% bucket · {percent}% of mix
                  </span>
                </div>
                <div className="progress-track large">
                  <div className="progress-fill" style={{ width: `${item.value}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="split-grid">
        <article className="panel">
          <h3>Interpretation</h3>
          <p>
            This layout makes it easy to swap mock values with API data later while
            keeping the same frontend.
          </p>
        </article>
        <article className="panel">
          <h3>Export readiness</h3>
          <p>
            You can later attach charts, PDFs, or backend analytics endpoints without
            changing page structure.
          </p>
        </article>
      </section>
    </AppLayout>
  );
}
