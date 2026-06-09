import { LeadsTable } from "@/components/admin/LeadsTable";
import { getLeads } from "@/lib/google-sheets";

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <div className="admin-grid">
      <div>
        <h1 className="admin-page-title">客戶名單</h1>
        <p className="muted">篩選申請資料、更新進度並匯出追蹤名單。</p>
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}
