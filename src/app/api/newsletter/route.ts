import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(["es", "en"]).optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    // Placeholder: connect Resend, Mailchimp, or Vercel KV later
    console.info("[newsletter]", body.email, body.locale);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
}
