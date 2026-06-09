import { NextResponse } from "next/server";
import { addLead, getLeads } from "@/lib/google-sheets";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get("city");
  const status = searchParams.get("status");
  const q = searchParams.get("q")?.toLowerCase();
  const leads = await getLeads();

  const filtered = leads.filter((lead) => {
    const cityMatch = !city || lead.city === city;
    const statusMatch = !status || lead.status === status;
    const queryMatch =
      !q ||
      [lead.contactName, lead.venueName, lead.email, lead.phone, lead.city]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return cityMatch && statusMatch && queryMatch;
  });

  return NextResponse.json({ leads: filtered });
}

export async function POST(request: Request) {
  const body = await request.json();
  const required = ["applicantType", "contactName", "phone", "email", "venueName", "city", "address"];

  for (const field of required) {
    if (!body[field]) {
      return NextResponse.json({ error: `${field} is required` }, { status: 400 });
    }
  }

  const lead = await addLead({
    applicantType: body.applicantType,
    contactName: body.contactName,
    phone: body.phone,
    email: body.email,
    venueName: body.venueName,
    city: body.city,
    address: body.address,
    machineType: body.machineType ?? "",
    placementLocation: body.placementLocation ?? "",
    hasPowerOutlet: body.hasPowerOutlet ?? "",
    additionalNotes: body.additionalNotes ?? "",
    availableTime: Array.isArray(body.availableTime) ? body.availableTime : []
  });

  return NextResponse.json({ lead }, { status: 201 });
}
