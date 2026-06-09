import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getCases, saveCases } from "@/lib/google-sheets";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const cases = await getCases();
  const nextCases = cases.map((item) => (item.id === id ? { ...item, ...body } : item));
  return NextResponse.json({ cases: await saveCases(nextCases) });
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { id } = await params;
  const cases = await getCases();
  return NextResponse.json({ cases: await saveCases(cases.filter((item) => item.id !== id)) });
}
