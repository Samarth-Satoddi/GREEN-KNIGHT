import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  let dbStatus = "unreachable";

  try {
    const { error } = await supabaseAdmin
      .from("contact_submissions")
      .select("id")
      .limit(1);

    dbStatus = error ? "degraded" : "healthy";
  } catch {
    dbStatus = "unavailable";
  }

  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "Green Knights Web Platform",
      database: dbStatus,
    },
    { status: 200 }
  );
}
