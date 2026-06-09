import type { LeadStatus } from "@/types";
import "./admin.css";

const colors: Record<LeadStatus, string> = {
  新申請: "#ba1a1a",
  聯繫中: "#434cca",
  場勘中: "#060e9f",
  已完成: "#ff5000"
};

export function DonutChart({ data }: { data: { status: LeadStatus; count: number }[] }) {
  const total = Math.max(1, data.reduce((sum, item) => sum + item.count, 0));
  let cursor = 0;
  const gradient = data
    .map((item) => {
      const start = cursor;
      const end = cursor + (item.count / total) * 100;
      cursor = end;
      return `${colors[item.status]} ${start}% ${end}%`;
    })
    .join(", ");

  return (
    <section className="chart-card card">
      <h2>進度狀態</h2>
      <div className="donut-wrap">
        <div className="donut" style={{ background: `conic-gradient(${gradient})` }}>
          <span>{total}</span>
        </div>
        <div className="donut-legend">
          {data.map((item) => (
            <p key={item.status}>
              <i style={{ background: colors[item.status] }} />
              {item.status}
              <strong>{item.count}</strong>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
