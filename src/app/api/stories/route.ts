import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80),
  location: z.string().max(80).optional(),
  story: z.string().min(20).max(2000),
  locale: z.enum(["es", "en"]).optional(),
});

export async function POST(request: Request) {
  try {
    const body = schema.parse(await request.json());
    // Placeholder: persist to KV/D1/Sanity — pending moderation
    console.info("[story]", body.name, body.locale, body.story.slice(0, 40));
    return NextResponse.json({ ok: true, status: "pending_moderation" });
  } catch {
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
