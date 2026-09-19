import {
  GREEN_KNIGHTS_KNOWLEDGE,
  CANONICAL_UNKNOWN_ANSWER,
  buildSystemPrompt,
} from "./knowledge";

export interface LLMMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface LLMResponse {
  text: string;
  provider: "openai" | "gemini" | "groq" | "knowledge-engine";
}

/**
 * Clean LLM client abstraction layer for Green Knights AI Assistant.
 * Seamlessly routes to OpenAI, Google Gemini, Groq, or the internal Knowledge Engine fallback.
 */
export class LLMClient {
  /**
   * Generates a grounded response based on message history.
   */
  async generateResponse(messages: LLMMessage[]): Promise<LLMResponse> {
    const openaiApiKey = process.env.OPENAI_API_KEY;
    const geminiApiKey =
      process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY;
    const groqApiKey = process.env.GROQ_API_KEY;

    let lastError: string | null = null;

    // 1. Try Google Gemini if configured
    if (geminiApiKey && !geminiApiKey.includes("placeholder")) {
      try {
        const response = await this.callGemini(messages, geminiApiKey);
        if (response) {
          return { text: response, provider: "gemini" };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        lastError = `Gemini: ${msg}`;
        console.error("[LLMClient] Gemini call failed:", msg);
      }
    }

    // 2. Try OpenAI if configured
    if (openaiApiKey && !openaiApiKey.includes("placeholder")) {
      try {
        const response = await this.callOpenAI(messages, openaiApiKey);
        if (response) {
          return { text: response, provider: "openai" };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        lastError = `OpenAI: ${msg}`;
        console.error("[LLMClient] OpenAI call failed:", msg);
      }
    }

    // 3. Try Groq if configured
    if (groqApiKey && !groqApiKey.includes("placeholder")) {
      try {
        const response = await this.callGroq(messages, groqApiKey);
        if (response) {
          return { text: response, provider: "groq" };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        lastError = `Groq: ${msg}`;
        console.error("[LLMClient] Groq call failed:", msg);
      }
    }

    // If an external LLM was configured but encountered an error, log a sanitized warning
    // and seamlessly fall back to the verified Knowledge Engine with zero visitor downtime.
    if (lastError) {
      console.warn(
        `[LLMClient] LLM provider issue (${lastError}). Seamlessly serving response via verified Knowledge Engine fallback.`
      );
    }

    // If no API key is configured or external provider had a transient error
    const userMessage =
      messages.filter((m) => m.role === "user").pop()?.content.trim() || "";
    const localAnswer = this.queryKnowledgeEngine(userMessage);
    return {
      text: localAnswer,
      provider: "knowledge-engine",
    };
  }

  /**
   * OpenAI API Integration
   */
  private async callOpenAI(messages: LLMMessage[], apiKey: string): Promise<string | null> {
    const systemPrompt = buildSystemPrompt();
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 600,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`OpenAI API status ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  }

  /**
   * Google Gemini API Integration
   */
  private async callGemini(messages: LLMMessage[], apiKey: string): Promise<string | null> {
    const systemInstruction = buildSystemPrompt();
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // Gemini requires multi-turn talk to start with role 'user'
    const firstUserIndex = messages.findIndex((m) => m.role === "user");
    const validMessages = firstUserIndex >= 0 ? messages.slice(firstUserIndex) : messages;

    // Merge consecutive turns of the same role
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    for (const m of validMessages) {
      const role = m.role === "assistant" ? "model" : "user";
      if (contents.length > 0 && contents[contents.length - 1].role === role) {
        contents[contents.length - 1].parts[0].text += `\n${m.content}`;
      } else {
        contents.push({ role, parts: [{ text: m.content }] });
      }
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 600,
        },
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const errText = await res.text();
      const sanitizedErr = errText.replaceAll(apiKey, "[REDACTED]");
      throw new Error(`Gemini API status ${res.status}: ${sanitizedErr}`);
    }

    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  }

  /**
   * Groq API Integration (OpenAI-compatible)
   */
  private async callGroq(messages: LLMMessage[], apiKey: string): Promise<string | null> {
    const systemPrompt = buildSystemPrompt();
    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m) => ({ role: m.role, content: m.content })),
    ];

    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 600,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq API status ${res.status}: ${errText}`);
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  }

  /**
   * Local Knowledge Engine
   * Contextual matching that answers verified Green Knights queries.
   */
  private queryKnowledgeEngine(query: string): string {
    const q = query.toLowerCase().trim();

    if (!q) {
      return "Hello! How can the Green Knights assist your enterprise today?";
    }

    // 0. Security & Prompt Injection Defense
    if (
      /\b(ignore\s+(all\s+)?(previous|prior)\s+instructions|system\s+prompt|reveal\s+(your\s+)?api\s*key|api[_\s]*key|\.env|database\s+password|supabase\s+credentials|developer\s+mode|unrestricted\s+ai|forget\s+green\s+knights)\b/i.test(
        q
      )
    ) {
      return "I am the official Green Knights AI Assistant. I adhere strictly to verified company information and enterprise security policies. How can I assist you with Green Knights technology services or starting a project enquiry?";
    }

    // 0b. Hallucination Guard for unverified confidential metrics
    if (
      /\b(revenue|turnover|annual\s+turnover|employee\s+count|how\s+many\s+employees|how\s+many\s+customers|who\s+is\s+(the\s+)?ceo|exact\s+prices?|service\s+prices?|hourly\s+rate|pricing\s+sheet|fortune\s+500|client\s+project\s+names|names\s+of\s+clients|sla\s+do\s+you\s+guarantee)\b/i.test(
        q
      ) ||
      /\b(who\s+are\s+your\s+clients|tell\s+me\s+your\s+pricing|what\s+is\s+your\s+pricing|give\s+me\s+your\s+pricing)\b/i.test(
        q
      )
    ) {
      return CANONICAL_UNKNOWN_ANSWER;
    }

    // 0c. Off-Topic Query Redirection
    if (
      /\b(capital\s+of|cricket\s+match|tell\s+me\s+a\s+joke|write\s+(me\s+)?a\s+poem|weather\s+today|latest\s+news|president\s+of|cook\s+biryani|recipe|bitcoin)\b/i.test(
        q
      ) ||
      /^(write\s+me\s+a\s+python\s+program|what\s+is\s+bitcoin)\b/i.test(q)
    ) {
      return "I am the official Green Knights technology assistant. While I can't assist with general topics, I would be delighted to help you explore our enterprise services in AI Solutions, Cloud Architecture, Cybersecurity, and Software Engineering. How can I assist your organization?";
    }

    // 1. Greetings
    if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)\b/i.test(q)) {
      return "Hello! I'm the Green Knights AI Assistant. I can help you explore our services, technologies, and solutions. How can I help you today?";
    }

    // 2. Contact Information
    if (
      q.includes("contact") ||
      q.includes("email") ||
      q.includes("phone") ||
      q.includes("address") ||
      q.includes("reach out") ||
      q.includes("call you") ||
      q.includes("location") ||
      q.includes("office") ||
      q.includes("hours")
    ) {
      return `Here are the official contact details for Green Knights of Tech & AI:

• **Email:** ${GREEN_KNIGHTS_KNOWLEDGE.contact.email}
• **Phone:** ${GREEN_KNIGHTS_KNOWLEDGE.contact.phone}
• **Headquarters:** ${GREEN_KNIGHTS_KNOWLEDGE.contact.address}
• **Business Hours:** ${GREEN_KNIGHTS_KNOWLEDGE.contact.businessHours}
• **Emergency Support:** ${GREEN_KNIGHTS_KNOWLEDGE.contact.emergencySupport}

You can also start an enquiry right here by clicking "Start Project Enquiry" or using our guided lead form.`;
    }

    // 2b. Website Pages & Site Structure
    if (
      q.includes("why us") ||
      q.includes("why choose us") ||
      q.includes("advantage")
    ) {
      return `The **Why Us** section (/#why-us) highlights the 8 primary reasons enterprises choose Green Knights:

1. **Enterprise Security:** Military-grade zero-trust protocols & continuous threat monitoring.
2. **AI-First Approach:** Solutions designed with intelligent agents and custom LLMs at the core.
3. **Fast Delivery:** Agile sprints and GitOps CI/CD ensuring rapid, zero-downtime deployments.
4. **Proven Innovation:** Track record of 500+ successful projects across enterprise workloads.
5. **Expert Engineers:** Curated senior engineers, architects, and researchers with 10+ years experience.
6. **Scalable Solutions:** Cloud-native systems built to scale from startup to Fortune 500 demands.
7. **24/7 Support:** Continuous telemetry monitoring, SLA-backed response, and managed SRE.
8. **Quality Guaranteed:** Rigorous QA pipelines and ISO-certified processes.

Would you like to explore how our team can support your specific project goals?`;
    }

    if (
      q.includes("service page") ||
      q.includes("services page") ||
      q.includes("service pages") ||
      q.includes("services overview") ||
      q.includes("service catalog")
    ) {
      return `The **Services** page (/services) is our comprehensive enterprise technology catalog featuring:

• **Interactive Service Directory:** Explore our 8 core technology disciplines:
  1. **AI Solutions** – Custom LLMs, AI agents, RAG systems, & process automation.
  2. **Software Development** – High-throughput enterprise web apps & microservices.
  3. **Cloud Solutions** – Multi-cloud architecture, DevOps, & Kubernetes across AWS, GCP, Azure.
  4. **Cybersecurity** – Zero Trust architecture, penetration testing, & compliance (SOC2, ISO27001).
  5. **Digital Transformation** – Decoupling legacy systems & modernizing business agility.
  6. **ERP Solutions** – SAP, Oracle NetSuite, & custom enterprise resource planning.
  7. **IT Consulting** – Strategic technology roadmaps, system audits, & Fractional CTO advisory.
  8. **Data Analytics** – Modern data warehouses (Snowflake, BigQuery) & executive BI pipelines.
• **Live Search & Filter:** Filter services by category (Core AI, Cloud & Infra, Engineering & ERP, Security & Analytics, Strategic Advisory).
• **Individual Deep-Dive Pages:** Each service has a dedicated page (e.g. /services/ai-solutions) detailing architecture, case studies, and technologies.

Which service would you like to explore in detail?`;
    }

    if (
      q.includes("round table") ||
      q.includes("roundtable") ||
      q.includes("knights page")
    ) {
      return `The **Round Table** page (/round-table) is an immersive digital chamber where the 8 digital knights of Green Knights unite to deliver sovereign technology transformation:

• **The Interactive Chamber:** Experience the Arthurian-inspired modern council of technology guardians.
• **The 8 Pillars:** Each knight represents an elite discipline (AI Solutions, Software Engineering, Cloud, Cybersecurity, Digital Transformation, ERP, IT Consulting, and Data Analytics).
• **Discipline Philosophies:** Discover the mission, ethos, and sovereign technical standards driving each pillar.

You can visit it anytime via the "Round Table" link in the top navigation!`;
    }

    if (
      q.includes("about page") ||
      q.includes("about us page")
    ) {
      return `The **About Us** page (/about) details the heritage, values, and leadership of Green Knights:

• **Our Story:** Bridging complex enterprise challenges with intelligent, human-centered technology.
• **Mission & Vision:** Empowering organizations through sovereign, high-impact digital engineering.
• **Core Values:** Honor, Technical Excellence, Data Sovereignty, and Long-Term Partnership.
• **Executive Leadership:** The team of architects, data scientists, and strategists behind Green Knights.`;
    }

    if (
      q.includes("what pages") ||
      q.includes("all pages") ||
      q.includes("list pages") ||
      q.includes("website pages") ||
      q.includes("site structure") ||
      q.includes("site map") ||
      q.includes("sitemap")
    ) {
      return `The Green Knights website features the following core pages and sections:

1. **Home (/)** – Sovereign technology overview, Round Table teaser, 8 pillars, and AI Assistant.
2. **About (/about)** – Our origin story, mission, vision, core values, and executive team.
3. **Services (/services)** – Complete directory of our 8 enterprise services with search, filtering, and deep-dive pages.
4. **Round Table (/round-table)** – Interactive immersive chamber showcasing the 8 technology knights.
5. **Why Us (/#why-us)** – 8 competitive pillars (Enterprise Security, AI-First, 24/7 Support, etc.).
6. **Industries (/#industries)** – Domain-specific solutions for Healthcare, Banking, Retail, Manufacturing, EdTech, and Government.
7. **Our Process (/#process)** – Our 6-phase engineering lifecycle (Discover, Strategy, Design, Development, Deployment, Support).
8. **Contact (/#contact)** – Send a Message form, phone, email, headquarters address, and consultation booking.

Which page or topic would you like to explore further?`;
    }

    // 3. Services Overview
    if (
      (q.includes("what") && (q.includes("services") || q.includes("service"))) ||
      q.includes("what do you provide") ||
      q.includes("what do you do") ||
      q.includes("list of services") ||
      q.includes("explore services") ||
      q.includes("capabilities")
    ) {
      return `We provide enterprise technology solutions across 8 core disciplines:

1. **AI Solutions** – Custom LLMs, AI agents, RAG systems, & process automation.
2. **Software Development** – High-throughput enterprise web apps & microservices.
3. **Cloud Solutions** – Multi-cloud architecture, DevOps, & Kubernetes across AWS, GCP, Azure.
4. **Cybersecurity** – Zero Trust architecture, penetration testing, & compliance (SOC2, ISO27001).
5. **Digital Transformation** – Decoupling legacy systems & modernizing business agility.
6. **ERP Solutions** – SAP, Oracle NetSuite, & custom enterprise resource planning.
7. **IT Consulting** – Strategic technology roadmaps, system audits, & Fractional CTO advisory.
8. **Data Analytics** – Modern data warehouses (Snowflake, BigQuery) & executive BI pipelines.

Which specific service would you like to explore in detail?`;
    }

    // 4. Individual Service Inquiries
    if (q.includes("ai") || q.includes("artificial intelligence") || q.includes("machine learning") || q.includes("chatbot") || q.includes("rag") || q.includes("agent")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "ai-solutions")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

**Primary Technologies:**
${s.technologies.join(", ")}

Would you like to discuss building an AI solution for your organization?`;
    }

    if (q.includes("software") || q.includes("web app") || q.includes("mobile") || q.includes("engineering") || q.includes("frontend") || q.includes("backend")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "software-development")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

**Primary Technologies:**
${s.technologies.join(", ")}

Tell me about your software development project, and we can discuss the architectural design.`;
    }

    if (q.includes("cloud") || q.includes("aws") || q.includes("azure") || q.includes("gcp") || q.includes("devops") || q.includes("kubernetes")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "cloud-solutions")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

**Cloud Platforms:**
${s.technologies.join(", ")}

Are you planning a new cloud deployment or migrating legacy infrastructure?`;
    }

    if (q.includes("security") || q.includes("cyber") || q.includes("soc2") || q.includes("iso") || q.includes("compliance") || q.includes("penetration test")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "cybersecurity")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

**Security Tooling:**
${s.technologies.join(", ")}

We can conduct a comprehensive vulnerability assessment for your systems.`;
    }

    if (q.includes("digital transformation") || q.includes("legacy") || q.includes("moderniz")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "digital-transformation")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

We help legacy businesses leapfrog technical debt into modern, scalable cloud architectures.`;
    }

    if (q.includes("erp") || q.includes("sap") || q.includes("oracle") || q.includes("supply chain")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "erp-solutions")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

We unify fragmented operational data into a single coherent source of truth.`;
    }

    if (q.includes("consulting") || q.includes("advisory") || q.includes("cto") || q.includes("audit") || q.includes("strategy")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "it-consulting")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

Our principal consultants provide executive technical stewardship and architectural guidance.`;
    }

    if (q.includes("data") || q.includes("analytics") || q.includes("bi") || q.includes("snowflake") || q.includes("bigquery") || q.includes("dashboard")) {
      const s = GREEN_KNIGHTS_KNOWLEDGE.services.find((x) => x.id === "data-analytics")!;
      return `**${s.title} (${s.category})**
${s.summary}

**Core Capabilities:**
• ${s.features.join("\n• ")}

**Data Technologies:**
${s.technologies.join(", ")}

We build streaming data pipelines and high-impact executive dashboards.`;
    }

    // 5. Technologies Overview
    if (
      q.includes("technolog") ||
      q.includes("tech stack") ||
      q.includes("what stack") ||
      q.includes("tools") ||
      q.includes("languages")
    ) {
      return `Green Knights engineers across an enterprise-grade technology ecosystem:

• **AI & ML:** Python, PyTorch, TensorFlow, LangChain, OpenAI, Hugging Face, Vector DBs (pgvector, Pinecone).
• **Frontend & Apps:** Next.js, React, TypeScript, Tailwind CSS, React Native.
• **Backend & Core:** Node.js, Go, Python (FastAPI/Django), GraphQL, REST APIs.
• **Cloud & Infrastructure:** AWS, Google Cloud, Azure, Kubernetes, Docker, Terraform.
• **Databases & Warehousing:** PostgreSQL, Supabase, Redis, Snowflake, BigQuery.
• **Security:** Zero Trust, HashiCorp Vault, SOC2 & ISO 27001 control implementations.

Is there a particular framework or technology stack you are considering?`;
    }

    // 6. Industries Served
    if (
      q.includes("industr") ||
      q.includes("sectors") ||
      q.includes("who do you work with") ||
      q.includes("client types")
    ) {
      return `We deliver technology solutions across high-stakes industries:

• **Healthcare & Life Sciences:** HIPAA-compliant architectures, patient telemetry, and AI diagnostics.
• **Banking, BFSI & Insurance:** Fraud prevention, document extraction, sub-second settlement.
• **Retail & E-Commerce:** High-throughput checkout (3x speed boost) and personalization.
• **Manufacturing & Supply Chain:** Predictive maintenance, IoT telemetry, ERP integrations.
• **Education & EdTech:** Scalable platforms for tens of thousands of simultaneous learners.
• **Government & Public Sector:** High-trust civic portals and sovereign infrastructure.

Would you like to know more about our work in a specific sector?`;
    }

    // 7. Process / How We Work
    if (
      q.includes("process") ||
      q.includes("how we work") ||
      q.includes("how do you work") ||
      q.includes("methodology") ||
      q.includes("how we can help") ||
      q.includes("steps") ||
      q.includes("timeline")
    ) {
      return `We execute through our structured 6-phase framework:

1. **01 Discover (1–2 Weeks):** Deep audit of objectives, technical landscape, and requirements.
2. **02 Strategy (1–2 Weeks):** Architectural blueprint, stack selection, and delivery roadmaps.
3. **03 Design (2–3 Weeks):** UX prototypes, wireframes, and enterprise security models.
4. **04 Development (4–16 Weeks):** Agile sprints with clean code, automated CI/CD, and bi-weekly demos.
5. **05 Deployment (1–2 Weeks):** Zero-downtime releases, load testing, and comprehensive handover.
6. **06 Support (Ongoing):** 24/7 telemetry monitoring, proactive optimization, and continuous SLA support.

Would you like to start phase 1 discovery for your project?`;
    }

    // 8. About Green Knights / Company Background
    if (
      q.includes("who are you") ||
      q.includes("about") ||
      q.includes("company") ||
      q.includes("green knight") ||
      q.includes("mission") ||
      q.includes("vision") ||
      q.includes("story")
    ) {
      return `${GREEN_KNIGHTS_KNOWLEDGE.about.story}

• **Our Mission:** ${GREEN_KNIGHTS_KNOWLEDGE.about.mission}
• **Our Vision:** ${GREEN_KNIGHTS_KNOWLEDGE.about.vision}
• **Our Promise:** ${GREEN_KNIGHTS_KNOWLEDGE.about.promise}

We stand as your sovereign digital guardians, delivering engineering that drives measurable growth.`;
    }

    // 9. Lead / Consultation Intent
    if (
      q.includes("hire") ||
      q.includes("consult") ||
      q.includes("quote") ||
      q.includes("pricing") ||
      q.includes("estimate") ||
      q.includes("project") ||
      q.includes("proposal") ||
      q.includes("start")
    ) {
      return `We would be honored to partner with you on your project!

To help us scope your requirement and connect you with the appropriate lead architect:
1. What service or challenge are you addressing?
2. What is your preferred timeline?

You can also use our guided enquiry form right here in this chat, or send an email directly to **${GREEN_KNIGHTS_KNOWLEDGE.contact.email}**. A Green Knight will get back to you within 24 hours.`;
    }

    // 10. Unknown / Unverified Query Fallback
    return CANONICAL_UNKNOWN_ANSWER;
  }
}

export const llmClient = new LLMClient();
