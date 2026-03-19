import { useEffect, useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import PageHeader from "../components/common/PageHeader";
import { dashboardApi } from "../services/mockApi";

export default function NotificationsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    dashboardApi.getNotifications().then(setItems);
  }, []);

  return (
    <AppLayout>
      <PageHeader
        title="Notifications"
        subtitle="Alerts, activity updates, and review reminders."
      />

      <section className="stack-list">
        {items.map((item) => (
          <article key={item.id} className="panel notification-item">
            <div>
              <strong>{item.title}</strong>
              <p>{item.message}</p>
            </div>
            <small>{item.time}</small>
          </article>
        ))}
      </section>
    </AppLayout>
  );
}
