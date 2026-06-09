import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getCases, saveCases } from "@/lib/google-sheets";
import type { CaseStudy } from "@/types";

export async function GET() {
  return NextResponse.json({ cases: await getCases() });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const cases = await getCases();
  const newCase: CaseStudy = {
    id: body.id ?? crypto.randomUUID(),
    title: body.title,
    description: body.description,
    category: body.category,
    imageUrl: body.imageUrl,
    isPublic: Boolean(body.isPublic),
    sortOrder: Number(body.sortOrder ?? cases.length + 1),
    badgeTone: body.badgeTone === "secondary" ? "secondary" : "primary",
    metricValue: body.metricValue ?? "",
    metricLabel: body.metricLabel ?? "",
    metricIcon: body.metricIcon ?? "",
    testimonial: body.testimonial ?? ""
  };
  const nextCases = [
    ...cases,
    newCase
  ];

  return NextResponse.json({ cases: await saveCases(nextCases) }, { status: 201 });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid payload, array expected" }, { status: 400 });
  }

  return NextResponse.json({ cases: await saveCases(body) });
}
