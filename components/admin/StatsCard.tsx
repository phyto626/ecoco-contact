import type { ReactNode } from "react";
import "./admin.css";

export function StatsCard({ label, value, icon }: { label: string; value: string | number; icon: ReactNode }) {
  return (
    <article className="stats-card card">
      <div className="stats-card__icon">{icon}</div>
      <div>
        <p>{label}</p>
        <strong>{value}</strong>
      </div>
    </article>
  );
}
