import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getContent, saveContent } from "@/lib/google-sheets";

export async function GET() {
  return NextResponse.json({ content: await getContent() });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const body = await request.json();
  const content = await saveContent(body);
  return NextResponse.json({ content });
}
