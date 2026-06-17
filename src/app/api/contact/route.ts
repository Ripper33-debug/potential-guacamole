import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    // Log lead — replace with email/CRM integration in production
    console.log("[contact]", {
      name: `${data.firstName} ${data.lastName}`,
      company: data.company,
      email: data.email,
      market: data.market,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
