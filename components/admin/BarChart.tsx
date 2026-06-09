import "./admin.css";

export function BarChart({ data }: { data: { city: string; count: number }[] }) {
  const max = Math.max(1, ...data.map((item) => item.count));

  return (
    <section className="chart-card card">
      <h2>縣市申請分布</h2>
      <div className="bar-chart">
        {data.map((item) => (
          <div className="bar-chart__row" key={item.city}>
            <span>{item.city}</span>
            <div>
              <i style={{ width: `${(item.count / max) * 100}%` }} />
            </div>
            <strong>{item.count}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
