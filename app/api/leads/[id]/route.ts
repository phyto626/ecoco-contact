import { NextResponse } from "next/server";
import type { LeadStatus } from "@/types";
import { updateLeadStatus } from "@/lib/google-sheets";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const status = body.status as LeadStatus;

  if (!status) return NextResponse.json({ error: "status is required" }, { status: 400 });

  const lead = await updateLeadStatus(id, status);
  if (!lead) return NextResponse.json({ error: "lead not found" }, { status: 404 });

  return NextResponse.json({ lead });
}
