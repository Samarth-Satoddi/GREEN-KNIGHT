import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { checkRateLimit, validateContactSubmission } from "@/lib/spam-protection";
import { sendEnquiryNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & rate limiting check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    const rateLimit = checkRateLimit(ip, 5, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please wait a few minutes before submitting again.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request payload
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    const {
      full_name,
      name,
      email,
      company,
      service,
      message,
      honeypot,
      _gotcha,
      timestamp,
      _ts,
    } = body || {};

    const resolvedFullName = (full_name || name || "").trim();
    const resolvedEmail = (email || "").trim().toLowerCase();
    const resolvedCompany = (company || "").trim();
    const resolvedService = (service || "").trim();
    const resolvedMessage = (message || "").trim();
    const resolvedHoneypot = (honeypot || _gotcha || "").trim();
    const resolvedTimestamp = timestamp || _ts;

    // 3. Rigorous validation & anti-spam checks
    const validation = validateContactSubmission({
      fullName: resolvedFullName,
      email: resolvedEmail,
      company: resolvedCompany,
      service: resolvedService,
      message: resolvedMessage,
      honeypot: resolvedHoneypot,
      timestamp: resolvedTimestamp,
    });

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error || "Invalid form submission." },
        { status: 400 }
      );
    }

    // 4. Save to Supabase PostgreSQL using server-only Admin client
    const { data: insertedData, error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        full_name: resolvedFullName,
        email: resolvedEmail,
        company: resolvedCompany || null,
        service: resolvedService || null,
        message: resolvedMessage,
        status: "new",
      })
      .select("id, created_at")
      .single();

    if (dbError) {
      console.error("[Database Submission Error]:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: "We could not save your submission at this time. Please try again shortly.",
        },
        { status: 500 }
      );
    }

    // 5. Send Resend email notification (async / non-blocking)
    const formattedDate = new Date().toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    sendEnquiryNotification({
      id: insertedData?.id,
      fullName: resolvedFullName,
      email: resolvedEmail,
      company: resolvedCompany,
      service: resolvedService,
      message: resolvedMessage,
      submittedAt: formattedDate,
    }).catch((err) => {
      console.error("[Background Email Dispatch Error]:", err);
    });

    // 6. Return friendly success response
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out. A Green Knight will be in touch within 24 hours.",
        id: insertedData?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Contact API Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
