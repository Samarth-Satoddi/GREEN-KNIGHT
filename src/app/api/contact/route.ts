import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { checkRateLimit, validateContactSubmission } from "@/lib/spam-protection";
import { sendEnquiryNotification } from "@/lib/email";
import { filterRelevantConversation } from "@/lib/ai/conversation-filter";

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
      source,
      conversation,
    } = body || {};

    const resolvedFullName = (full_name || name || "").trim();
    const resolvedEmail = (email || "").trim().toLowerCase();
    const resolvedCompany = (company || "").trim();
    const resolvedService = (service || "").trim();
    const resolvedMessage = (message || "").trim();
    const resolvedHoneypot = (honeypot || _gotcha || "").trim();
    const resolvedTimestamp = timestamp || _ts;
    const resolvedSource = (source || "contact_form").trim().toLowerCase() === "chatbot" ? "chatbot" : "contact_form";
    const rawConversation = Array.isArray(conversation) ? conversation : null;
    const resolvedConversation = rawConversation
      ? filterRelevantConversation(rawConversation)
      : null;

    // 3. Rigorous validation & anti-spam checks
    if (resolvedSource === "chatbot") {
      if (!resolvedFullName || resolvedFullName.length < 2) {
        return NextResponse.json(
          { success: false, error: "Please provide your full name." },
          { status: 400 }
        );
      }
      if (!resolvedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resolvedEmail)) {
        return NextResponse.json(
          { success: false, error: "Please provide a valid email address." },
          { status: 400 }
        );
      }
      if (!resolvedMessage || resolvedMessage.length < 2) {
        return NextResponse.json(
          { success: false, error: "Please provide a brief project requirement description." },
          { status: 400 }
        );
      }
    } else {
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
    }

    // 4. Save to Supabase PostgreSQL using server-only Admin client
    const insertPayload: Record<string, unknown> = {
      full_name: resolvedFullName,
      email: resolvedEmail,
      company: resolvedCompany || null,
      service: resolvedService || null,
      message: resolvedMessage,
      status: "new",
      source: resolvedSource,
      conversation: resolvedConversation,
    };

    let { data: insertedData, error: dbError } = await supabaseAdmin
      .from("contact_submissions")
      .insert(insertPayload)
      .select("id, created_at")
      .single();

    // Resilient fallback in case database table hasn't added source or conversation columns yet
    if (
      dbError &&
      (dbError.message?.toLowerCase().includes("source") ||
        dbError.message?.toLowerCase().includes("conversation") ||
        dbError.code === "PGRST204" ||
        dbError.code === "42703")
    ) {
      console.warn(
        "[Database Submission] Column missing, executing fallback insert:",
        dbError.message
      );
      const fallbackMessage =
        resolvedSource === "chatbot" && resolvedConversation
          ? `${resolvedMessage}\n\n[Source: 🤖 Chatbot Lead]\n\n--- Relevant Chatbot Conversation ---\n` +
            resolvedConversation
              .map(
                (m: { role: string; content: string }) =>
                  `${m.role === "assistant" ? "Green Knight AI" : resolvedFullName}: ${m.content}`
              )
              .join("\n\n")
          : resolvedMessage;

      const fallbackRes = await supabaseAdmin
        .from("contact_submissions")
        .insert({
          full_name: resolvedFullName,
          email: resolvedEmail,
          company: resolvedCompany || null,
          service: resolvedService || null,
          message: fallbackMessage,
          status: "new",
        })
        .select("id, created_at")
        .single();

      insertedData = fallbackRes.data;
      dbError = fallbackRes.error;
    }

    const isNetworkOrDnsError =
      dbError &&
      (dbError.message?.includes("fetch failed") ||
        dbError.message?.includes("ENOTFOUND") ||
        dbError.details?.includes("ENOTFOUND"));

    if (dbError && !(process.env.NODE_ENV !== "production" && isNetworkOrDnsError)) {
      console.error("[Database Submission Error]:", dbError);
      return NextResponse.json(
        {
          success: false,
          error: "We could not save your submission at this time. Please try again shortly.",
        },
        { status: 500 }
      );
    }

    if (isNetworkOrDnsError && process.env.NODE_ENV !== "production") {
      console.warn(
        "[Database Dev Mode]: Supabase database unreachable (DNS/ENOTFOUND). Proceeding with lead dispatch for local testing."
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
      source: resolvedSource,
      conversation: resolvedConversation || undefined,
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
