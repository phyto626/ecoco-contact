"use client";

import { useMemo, useState } from "react";
import type { Lead, LeadStatus } from "@/types";
import { LEAD_STATUSES, TAIWAN_CITIES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import "./admin.css";

const toneMap: Record<LeadStatus, "danger" | "blue" | "yellow" | "primary"> = {
  新申請: "danger",
  聯繫中: "blue",
  場勘中: "yellow",
  已完成: "primary"
};

export function LeadsTable({ leads }: { leads: Lead[] }) {
  const [rows, setRows] = useState(leads);
  const [status, setStatus] = useState("");
  const [city, setCity] = useState("");
  const [query, setQuery] = useState("");
  const [savingId, setSavingId] = useState("");

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((lead) => {
      const statusMatch = !status || lead.status === status;
      const cityMatch = !city || lead.city === city;
      const queryMatch =
        !q ||
        [lead.id, lead.contactName, lead.venueName, lead.phone, lead.email].join(" ").toLowerCase().includes(q);
      return statusMatch && cityMatch && queryMatch;
    });
  }, [city, query, rows, status]);

  async function updateStatus(id: string, nextStatus: LeadStatus) {
    setSavingId(id);
    const response = await fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus })
    });
    if (response.ok) {
      setRows((current) => current.map((lead) => (lead.id === id ? { ...lead, status: nextStatus } : lead)));
    }
    setSavingId("");
  }

  function exportCsv() {
    const header = ["ID", "時間", "聯絡人", "電話", "Email", "場域", "縣市", "狀態"];
    const lines = filteredRows.map((lead) =>
      [lead.id, lead.timestamp, lead.contactName, lead.phone, lead.email, lead.venueName, lead.city, lead.status]
        .map((item) => `"${String(item).replace(/"/g, '""')}"`)
        .join(",")
    );
    const blob = new Blob(["\uFEFF" + [header.join(","), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ecoco-leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="leads-panel card">
      <div className="leads-toolbar">
        <Input label="搜尋" name="q" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="姓名、場域、電話或 Email" />
        <Select label="縣市" name="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="全部縣市" options={TAIWAN_CITIES.map((item) => ({ value: item, label: item }))} />
        <Select label="進度" name="status" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="全部進度" options={LEAD_STATUSES.map((item) => ({ value: item, label: item }))} />
        <Button variant="secondary" onClick={exportCsv}>
          匯出 CSV
        </Button>
      </div>
      <div className="table-wrap">
        <table className="leads-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>聯絡人</th>
              <th>場域</th>
              <th>縣市</th>
              <th>機型</th>
              <th>進度</th>
              <th>更新</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>
                  <strong>{lead.contactName}</strong>
                  <span>{lead.phone}</span>
                </td>
                <td>
                  <strong>{lead.venueName}</strong>
                  <span>{lead.email}</span>
                </td>
                <td>{lead.city}</td>
                <td>{lead.machineType}</td>
                <td>
                  <Badge tone={toneMap[lead.status]}>{lead.status}</Badge>
                </td>
                <td>
                  <select
                    value={lead.status}
                    disabled={savingId === lead.id}
                    onChange={(event) => updateStatus(lead.id, event.target.value as LeadStatus)}
                    aria-label={`${lead.id} 進度`}
                  >
                    {LEAD_STATUSES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
