import { Resend } from "resend";

interface EnquiryEmailParams {
  id?: string;
  fullName: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  submittedAt: string;
  source?: string;
  conversation?: Array<{ role: string; content: string }>;
}

const serviceLabels: Record<string, string> = {
  ai: "AI Solutions",
  software: "Software Development",
  cloud: "Cloud Solutions",
  security: "Cybersecurity",
  transformation: "Digital Transformation",
  erp: "ERP Solutions",
  consulting: "IT Consulting",
  data: "Data Analytics",
};

/**
 * Sends a notification email to the configured company inbox when a new contact enquiry is received.
 */
export async function sendEnquiryNotification(params: EnquiryEmailParams): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || "enquiries@greenknights.tech";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://greenknights.tech";

  if (!apiKey || apiKey.includes("your_resend_api_key")) {
    console.warn("[Email Notification] RESEND_API_KEY not configured. Skipping email dispatch.");
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  const resend = new Resend(apiKey);
  const serviceTitle = params.service ? (serviceLabels[params.service] || params.service) : "General Inquiry";
  const adminUrl = params.id ? `${siteUrl}/admin/enquiries/${params.id}` : `${siteUrl}/admin/enquiries`;
  const isChatbot = params.source === "chatbot";
  const sourceLabel = isChatbot ? "🤖 AI Chatbot Lead" : "📩 Contact Form Submission";

  const conversationHtml = params.conversation && params.conversation.length > 0
    ? `
      <div style="margin-top: 24px; padding-top: 20px; border-top: 1px dashed #e5e7eb;">
        <div class="field-label">Relevant Chatbot Conversation</div>
        <div style="background: #f1f5f9; border-radius: 10px; padding: 14px; margin-top: 8px; font-size: 13.5px; line-height: 1.5;">
          ${params.conversation
            .map(
              (m) =>
                `<div style="margin-bottom: 10px;">
                  <strong style="color: ${m.role === "assistant" ? "#0B6E4F" : "#1E293B"};">${m.role === "assistant" ? "Green Knight AI" : escapeHtml(params.fullName)}:</strong>
                  <div style="margin-top: 3px; color: #334155; white-space: pre-wrap;">${escapeHtml(m.content)}</div>
                </div>`
            )
            .join("")}
        </div>
      </div>
    `
    : "";

  const conversationText = params.conversation && params.conversation.length > 0
    ? `\n--- Relevant Chatbot Conversation ---\n` +
      params.conversation
        .map((m) => `${m.role === "assistant" ? "Green Knight AI" : params.fullName}: ${m.content}`)
        .join("\n\n")
    : "";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f9f8; margin: 0; padding: 24px; color: #1F2937; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0B6E4F 0%, #145A32 100%); padding: 32px; text-align: center; color: #ffffff; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
          .header p { margin: 6px 0 0; font-size: 14px; opacity: 0.9; }
          .body { padding: 32px; }
          .badge { display: inline-block; padding: 4px 12px; background: rgba(11,110,79,0.12); color: #0B6E4F; border: 1px solid rgba(11,110,79,0.25); border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 20px; }
          .field { margin-bottom: 18px; }
          .field-label { font-size: 12px; font-weight: 700; text-transform: uppercase; color: #6B7280; letter-spacing: 0.05em; margin-bottom: 4px; }
          .field-value { font-size: 16px; font-weight: 500; color: #111827; }
          .message-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 18px; font-size: 15px; line-height: 1.6; white-space: pre-wrap; color: #374151; }
          .footer { padding: 24px 32px; background: #fafafa; border-top: 1px solid #f3f4f6; text-align: center; }
          .button { display: inline-block; background: #0B6E4F; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 700; font-size: 14px; margin-top: 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Green Knights</h1>
            <p>${isChatbot ? "New AI Chatbot Lead" : "New Website Customer Enquiry"}</p>
          </div>
          <div class="body">
            <span class="badge">${sourceLabel}</span>
            
            <div class="field">
              <div class="field-label">Full Name</div>
              <div class="field-value">${escapeHtml(params.fullName)}</div>
            </div>

            <div class="field">
              <div class="field-label">Email Address</div>
              <div class="field-value"><a href="mailto:${escapeHtml(params.email)}" style="color: #0B6E4F; text-decoration: none;">${escapeHtml(params.email)}</a></div>
            </div>

            <div class="field">
              <div class="field-label">Company</div>
              <div class="field-value">${escapeHtml(params.company || "Not provided")}</div>
            </div>

            <div class="field">
              <div class="field-label">Service Interest</div>
              <div class="field-value">${escapeHtml(serviceTitle)}</div>
            </div>

            <div class="field">
              <div class="field-label">Submitted On</div>
              <div class="field-value">${params.submittedAt}</div>
            </div>

            <div class="field" style="margin-top: 24px;">
              <div class="field-label">Project Requirement</div>
              <div class="message-box">${escapeHtml(params.message)}</div>
            </div>

            ${conversationHtml}
          </div>
          <div class="footer">
            <a href="${adminUrl}" class="button">View in Admin Portal &rarr;</a>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = `
${isChatbot ? "New AI Chatbot Lead" : "New Website Customer Enquiry"}
Source: ${sourceLabel}

Name: ${params.fullName}
Email: ${params.email}
Company: ${params.company || "Not provided"}
Service Interest: ${serviceTitle}
Submitted: ${params.submittedAt}

Project Details:
${params.message}
${conversationText}

Admin Link: ${adminUrl}
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: "Green Knights Website <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: `${isChatbot ? "[Chatbot Lead] " : "New Enquiry - "}${params.fullName}`,
      html: htmlContent,
      text: textContent,
      replyTo: params.email,
    });

    if (error) {
      console.error("[Resend Error]:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[Email Notification Exception]:", msg);
    return { success: false, error: msg };
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
