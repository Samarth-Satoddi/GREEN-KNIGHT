/**
 * Conversation Filtering & Classification Utility for Green Knights AI
 *
 * Distinguishes business-relevant dialogue (Business Intent, Lead Data,
 * relevant service/technical inquiries) from casual small talk (Greetings,
 * Fillers, Acknowledgments).
 *
 * Ensures that the visitor experiences a natural conversation, while
 * Supabase CRM and Resend admin notifications persist ONLY high-value
 * client context.
 */

export type MessageCategory =
  | "CASUAL"
  | "INFORMATION"
  | "BUSINESS_INTENT"
  | "LEAD_DATA";

export type ConversationPhase =
  | "NORMAL"
  | "IMPORTANT_CONVERSATION"
  | "LEAD_INTAKE"
  | "COMPLETED";

export interface DialogueMessage {
  role: "assistant" | "user";
  content: string;
}

// Business intent keywords and triggers
const BUSINESS_SIGNALS = [
  "need",
  "require",
  "interested",
  "consult",
  "consultation",
  "quote",
  "pricing",
  "price",
  "cost",
  "estimate",
  "project",
  "company",
  "business",
  "enterprise",
  "develop",
  "development",
  "build",
  "create",
  "design",
  "website",
  "web app",
  "application",
  "mobile",
  "ai",
  "artificial intelligence",
  "chatbot",
  "rag",
  "agent",
  "software",
  "cloud",
  "aws",
  "azure",
  "gcp",
  "cybersecurity",
  "security",
  "soc2",
  "compliance",
  "erp",
  "sap",
  "oracle",
  "analytics",
  "data",
  "contact team",
  "speak with",
  "hire",
  "discuss",
  "proposal",
  "timeline",
  "budget",
  "solution",
  "services",
  "infrastructure",
  "modernize",
  "legacy",
  "automation",
  "automate",
  "protection",
];

// Purely casual phrases (without business intent)
const CASUAL_PATTERNS = [
  /^(hi|hello|hey|heya|howdy|greetings)[\s!.,?]*$/i,
  /^(good\s+(morning|afternoon|evening|day|night))[\s!.,?]*$/i,
  /^(how\s+are\s+you|how\s+r\s+u|what'?s\s+up|sup|how\s+is\s+it\s+going|how\s+do\s+you\s+do)[\s!.,?]*$/i,
  /^(hi|hello|hey|greetings|good\s+(morning|afternoon|evening))[\s,.-]+(how\s+are\s+you|how\s+r\s+u|what'?s\s+up|how\s+is\s+it\s+going|how\s+do\s+you\s+do)[\s!.,?]*$/i,
  /^(thanks|thank\s+you|thx|ty|much\s+appreciated)[\s!.,?]*$/i,
  /^(ok|okay|k|alright|fine|sure|got\s+it|understood|cool|great|awesome|nice)[\s!.,?]*$/i,
  /^(bye|goodbye|see\s+you|cya|farewell|take\s+care)[\s!.,?]*$/i,
  /^(yes|no|yep|nope|yeah|nah)[\s!.,?]*$/i,
];

// Information inquiry patterns
const INFO_PATTERNS = [
  /\b(what\s+services|what\s+do\s+you\s+do|what\s+do\s+you\s+provide|list\s+services|explore\s+services)\b/i,
  /\b(what\s+technologies|what\s+tech\s+stack|what\s+tools|which\s+frameworks)\b/i,
  /\b(how\s+does\s+your\s+process\s+work|development\s+process|how\s+we\s+can\s+help|what\s+is\s+your\s+process)\b/i,
  /\b(what\s+industries|which\s+industries|sectors|who\s+do\s+you\s+work\s+with)\b/i,
  /\b(where\s+are\s+you\s+located|where\s+is\s+your\s+office|company\s+address|contact\s+info|phone\s+number|email\s+address)\b/i,
  /\b(who\s+are\s+the\s+green\s+knights|about\s+the\s+company|who\s+founded)\b/i,
];

/**
 * Classifies a user or assistant message into one of four categories.
 */
export function classifyMessage(
  content: string,
  context?: { isLeadIntake?: boolean; role?: "assistant" | "user"; phase?: ConversationPhase }
): MessageCategory {
  const text = (content || "").trim();
  const lower = text.toLowerCase();

  // 1. Check for Lead Data Patterns explicitly
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) {
    return "LEAD_DATA";
  }
  if (/^\+?[\d\s\-()]{7,20}$/.test(text)) {
    return "LEAD_DATA";
  }
  if (/^(my\s+name\s+is|i\s+am|i'm|name\s+is)\s+[a-zA-Z\s]+$/i.test(text)) {
    return "LEAD_DATA";
  }

  // 2. Check if currently inside LEAD_INTAKE phase or explicit intake context
  if (
    (context?.isLeadIntake || context?.phase === "LEAD_INTAKE") &&
    context?.role === "user"
  ) {
    // If not a pure casual dismissal (like "cancel", "bye", "thanks")
    const isPureDismissal = CASUAL_PATTERNS.some((pattern) => pattern.test(lower));
    if (!isPureDismissal) {
      return "LEAD_DATA";
    }
  }

  // 3. Check for Business Signals / Intent FIRST
  // (Ensures "Hi, I need an AI chatbot" or "Hello, we need cybersecurity" is classified as BUSINESS_INTENT)
  const hasBusinessSignal = BUSINESS_SIGNALS.some((sig) => {
    const regex = new RegExp(`\\b${sig}\\b`, "i");
    return regex.test(lower);
  });

  const hasIntentPhrasing =
    /\b(i\s+need|we\s+need|i\s+want|we\s+want|looking\s+for|can\s+you\s+build|can\s+you\s+help|interested\s+in|would\s+like|discuss\s+a\s+project|start\s+a\s+project|get\s+a\s+quote|request\s+a\s+quote|schedule\s+a\s+consultation|hire\s+you|contact\s+(the\s+)?team|struggling\s+with|needs?\s+to\s+move\s+to|protection\s+for|modernize|automate|automation)\b/i.test(
      lower
    );

  if (hasIntentPhrasing) {
    return "BUSINESS_INTENT";
  }

  // 4. Check for Informational questions
  if (isPureInformationalQuery(lower)) {
    return "INFORMATION";
  }

  // 5. Check for Pure Casual pleasantries
  const isPureCasual = CASUAL_PATTERNS.some((pattern) => pattern.test(lower));
  if (isPureCasual) {
    return "CASUAL";
  }

  // 6. Secondary check: if message contains business signals, classify as BUSINESS_INTENT
  if (hasBusinessSignal) {
    return "BUSINESS_INTENT";
  }

  // 7. If in IMPORTANT_CONVERSATION and user provides brief context/response
  if (context?.phase === "IMPORTANT_CONVERSATION" && context.role === "user") {
    return "LEAD_DATA";
  }

  // Fallback: If message is very short (< 15 chars) without business signals, treat as CASUAL
  if (text.length < 15) {
    return "CASUAL";
  }

  // Default to INFORMATION for longer descriptive queries
  return "INFORMATION";
}

function isPureInformationalQuery(text: string): boolean {
  return INFO_PATTERNS.some((pat) => pat.test(text));
}

/**
 * Filters a raw full chat history to extract ONLY meaningful, business-relevant
 * messages for storage in Supabase and display in the Admin Enquiry Portal.
 *
 * Strips out:
 * - Standalone greetings ("Hi", "Hello", "How are you?")
 * - Initial bot welcome ("Hello! I'm the Green Knights AI Assistant...")
 * - Pure acknowledgments and closings ("Okay", "Thanks", "Bye")
 *
 * Retains:
 * - Business intent statements ("I need an AI chatbot for my company")
 * - Relevant technical inquiries that lead into business discussion
 * - Lead qualification data (Name, email, company, service selection, project details)
 * - The matching AI assistant responses that provide context for the user's inquiry
 */
export function filterRelevantConversation(
  messages: Array<{ role: string; content: string }>
): DialogueMessage[] {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [];
  }

  // Step 1: Track conversation phase as we process chronologically
  let currentPhase: ConversationPhase = "NORMAL";
  let firstImportantIdx = -1;

  interface AnnotatedMessage {
    role: "assistant" | "user";
    content: string;
    category: MessageCategory;
    phase: ConversationPhase;
    originalIndex: number;
  }

  const annotated: AnnotatedMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    const role = (m.role === "assistant" ? "assistant" : "user") as
      | "assistant"
      | "user";
    const text = (m.content || "").trim();

    // Determine category based on current conversation phase
    let category: MessageCategory;

    if (role === "assistant") {
      category = isInitialBotGreeting(text, i)
        ? "CASUAL"
        : "INFORMATION";
    } else {
      category = classifyMessage(text, { role: "user", phase: currentPhase });

      // State transitions
      if (category === "BUSINESS_INTENT") {
        currentPhase = "IMPORTANT_CONVERSATION";
        if (firstImportantIdx === -1) {
          // If previous user message was an INFORMATION query, include it for context
          if (
            i >= 2 &&
            annotated[i - 2]?.category === "INFORMATION" &&
            annotated[i - 2]?.role === "user"
          ) {
            firstImportantIdx = i - 2;
          } else {
            firstImportantIdx = i;
          }
        }
      } else if (category === "LEAD_DATA") {
        currentPhase = "LEAD_INTAKE";
        if (firstImportantIdx === -1) {
          firstImportantIdx = i;
        }
      }
    }

    // Check if assistant is asking lead qualification questions
    if (
      role === "assistant" &&
      (text.includes("full name") ||
        text.includes("email address") ||
        text.includes("company or organization") ||
        text.includes("service discipline") ||
        text.includes("project requirements"))
    ) {
      currentPhase = "LEAD_INTAKE";
    }

    annotated.push({
      role,
      content: text,
      category,
      phase: currentPhase,
      originalIndex: i,
    });
  }

  // If no explicit business intent or lead data was detected
  if (firstImportantIdx === -1) {
    const firstNonCasual = annotated.findIndex(
      (m) => m.role === "user" && m.category !== "CASUAL"
    );
    if (firstNonCasual !== -1) {
      firstImportantIdx = firstNonCasual;
    } else {
      // Purely casual conversation: do not store anything
      return [];
    }
  }

  // Step 2: Extract relevant messages from firstImportantIdx onwards
  const relevantSlice = annotated.slice(firstImportantIdx);
  const result: DialogueMessage[] = [];

  for (let i = 0; i < relevantSlice.length; i++) {
    const item = relevantSlice[i];

    // Exclude casual pleasantries (e.g. "Hi", "Thanks", "Bye")
    if (item.category === "CASUAL") {
      continue;
    }

    // Exclude initial bot welcome greeting
    if (item.role === "assistant" && isInitialBotGreeting(item.content)) {
      continue;
    }

    // Exclude bot messages that are pure casual filler
    if (item.role === "assistant" && isPureCasualBotReply(item.content)) {
      continue;
    }

    result.push({
      role: item.role,
      content: item.content,
    });
  }

  return result;
}

function isInitialBotGreeting(content: string, index?: number): boolean {
  if (index !== undefined && index > 0) return false;
  return (
    content.includes("I'm the Green Knights AI Assistant") ||
    content.includes("How can I help you today?")
  );
}

function isPureCasualBotReply(content: string): boolean {
  const lower = content.toLowerCase().trim();
  return (
    /^(hello!|hi!|hey!)\s*how\s+can\s+i\s+help\s+you\s+today\??$/i.test(lower) ||
    /^(you'?re\s+welcome|happy\s+to\s+help|glad\s+i\s+could\s+help)!?$/i.test(
      lower
    ) ||
    /^(goodbye|bye|have\s+a\s+great\s+day)!?$/i.test(lower)
  );
}
