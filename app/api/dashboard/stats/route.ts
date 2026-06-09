import { NextResponse } from "next/server";
import { LEAD_STATUSES } from "@/lib/constants";
import { getLeads } from "@/lib/google-sheets";

export async function GET() {
  const leads = await getLeads();
  const cityMap = new Map<string, number>();

  for (const lead of leads) {
    cityMap.set(lead.city, (cityMap.get(lead.city) ?? 0) + 1);
  }

  return NextResponse.json({
    stats: {
      totalLeads: leads.length,
      activeLeads: leads.filter((lead) => lead.status !== "已完成").length,
      completedLeads: leads.filter((lead) => lead.status === "已完成").length,
      cityCounts: Array.from(cityMap.entries()).map(([city, count]) => ({ city, count })),
      statusCounts: LEAD_STATUSES.map((status) => ({
        status,
        count: leads.filter((lead) => lead.status === status).length
      }))
    }
  });
}
