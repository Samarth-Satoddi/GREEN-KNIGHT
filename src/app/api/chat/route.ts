import { NextRequest, NextResponse } from "next/server";
import { llmClient, LLMMessage } from "@/lib/ai/llm-client";
import { checkRateLimit } from "@/lib/spam-protection";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & rate limiting check
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip =
      (forwardedFor ? forwardedFor.split(",")[0].trim() : realIp) || "127.0.0.1";

    // Allow up to 30 chat messages per 10 minutes per IP
    const rateLimit = checkRateLimit(ip, 30, 10 * 60 * 1000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Too many requests to the AI Assistant. Please pause for a moment before sending another message.",
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

    const { messages } = body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "How can I help you today?",
          provider: "knowledge-engine",
        },
        { status: 200 }
      );
    }

    // 3. Extract and check latest user message
    const userMessages = messages.filter((m) => m && m.role === "user");
    const latestUserMsg = userMessages[userMessages.length - 1];
    const latestContent =
      typeof latestUserMsg?.content === "string" ? latestUserMsg.content.trim() : "";

    if (!latestContent) {
      return NextResponse.json(
        {
          success: true,
          message: "How can I help you today?",
          provider: "knowledge-engine",
        },
        { status: 200 }
      );
    }

    // 4. Sanitize and validate message history structure
    const sanitizedMessages: LLMMessage[] = messages
      .slice(-15) // Keep last 15 messages for context
      .filter(
        (m) =>
          m &&
          typeof m.content === "string" &&
          (m.role === "user" || m.role === "assistant")
      )
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, 1500).trim(),
      }));

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        {
          success: true,
          message: "How can I help you today?",
          provider: "knowledge-engine",
        },
        { status: 200 }
      );
    }

    // 5. Generate response via LLMClient abstraction
    const response = await llmClient.generateResponse(sanitizedMessages);

    const safeMessage =
      response.text && response.text.trim().length > 0
        ? response.text.trim()
        : "How can I help you today?";

    return NextResponse.json(
      {
        success: true,
        message: safeMessage,
        provider: response.provider,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("[Chat API Exception]:", errorMsg.replace(/AIza[0-9A-Za-z-_]{35}/g, "[REDACTED_API_KEY]"));
    return NextResponse.json(
      {
        success: false,
        error: "Sorry, I'm having trouble responding right now. Please try again or reach out through our contact form.",
      },
      { status: 500 }
    );
  }
}
