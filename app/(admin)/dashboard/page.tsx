import { CalendarCheck, ClipboardList, Settings } from "lucide-react";
import { BarChart } from "@/components/admin/BarChart";
import { DonutChart } from "@/components/admin/DonutChart";
import { StatsCard } from "@/components/admin/StatsCard";
import { LEAD_STATUSES } from "@/lib/constants";
import { getLeads } from "@/lib/google-sheets";
import type { LeadStatus } from "@/types";

export default async function DashboardPage() {
  const leads = await getLeads();
  const cityMap = new Map<string, number>();
  leads.forEach((lead) => cityMap.set(lead.city, (cityMap.get(lead.city) ?? 0) + 1));
  const statusCounts = LEAD_STATUSES.map((status) => ({
    status: status as LeadStatus,
    count: leads.filter((lead) => lead.status === status).length
  }));

  return (
    <div className="admin-grid">
      <div>
        <h1 className="admin-page-title">儀表板</h1>
        <p className="muted">快速掌握智慧回收機設置申請狀態。</p>
      </div>
      <div className="stats-grid">
        <StatsCard label="總申請數" value={leads.length} icon={<ClipboardList size={22} />} />
        <StatsCard label="處理中" value={leads.filter((lead) => lead.status !== "已完成").length} icon={<Settings size={22} />} />
        <StatsCard label="已完成" value={leads.filter((lead) => lead.status === "已完成").length} icon={<CalendarCheck size={22} />} />
      </div>
      <div className="charts-grid">
        <BarChart data={Array.from(cityMap.entries()).map(([city, count]) => ({ city, count }))} />
        <DonutChart data={statusCounts} />
      </div>
    </div>
  );
}
