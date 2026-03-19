import { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import { dashboardApi } from "../services/mockApi";

export default function HelpCenterPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    dashboardApi.getHelpArticles().then(setArticles);
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Help center"
        subtitle="Common tasks and onboarding guidance for users."
      />

      <section className="card-grid">
        {articles.map((article) => (
          <article key={article} className="panel">
            <h3>{article}</h3>
            <p>
              This placeholder article card can later open a detailed help article,
              documentation page, or support workflow.
            </p>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}
