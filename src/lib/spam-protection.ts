/**
 * Anti-Spam, Rate Limiting & Input Validation Utilities
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory sliding window IP map (per-instance protection)
const ipRateMap = new Map<string, RateLimitRecord>();

// Clean up stale entries every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRateMap.entries()) {
    if (now > record.resetAt) {
      ipRateMap.delete(ip);
    }
  }
}, 15 * 60 * 1000);

/**
 * Checks if an IP has exceeded the contact form rate limit (e.g., 5 requests per 10 minutes).
 */
export function checkRateLimit(ip: string, limit = 5, windowMs = 10 * 60 * 1000): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = ipRateMap.get(ip);

  if (!record || now > record.resetAt) {
    ipRateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: limit - record.count };
}

export interface ContactFormData {
  fullName: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  honeypot?: string;
  timestamp?: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Performs rigorous server-side validation on submitted contact fields.
 */
export function validateContactSubmission(data: ContactFormData): ValidationResult {
  // 1. Honeypot check (must be completely empty)
  if (data.honeypot && data.honeypot.trim() !== "") {
    return { valid: false, error: "Spam detected." };
  }

  // 2. Minimum form fill timing check (if client provided timestamp)
  if (data.timestamp) {
    const elapsed = Date.now() - data.timestamp;
    if (elapsed < 1200) {
      return { valid: false, error: "Submission too fast. Please try again." };
    }
  }

  // 3. Full Name
  const fullName = (data.fullName || "").trim();
  if (!fullName) {
    return { valid: false, error: "Please enter your full name." };
  }
  if (fullName.length < 2 || fullName.length > 100) {
    return { valid: false, error: "Full name must be between 2 and 100 characters." };
  }

  // 4. Email
  const email = (data.email || "").trim().toLowerCase();
  if (!email) {
    return { valid: false, error: "Please enter your email address." };
  }
  if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: "Please provide a valid email address." };
  }

  // 5. Company (Optional)
  const company = (data.company || "").trim();
  if (company.length > 150) {
    return { valid: false, error: "Company name cannot exceed 150 characters." };
  }

  // 6. Service (Optional)
  const service = (data.service || "").trim();
  if (service.length > 100) {
    return { valid: false, error: "Service name cannot exceed 100 characters." };
  }

  // 7. Message
  const message = (data.message || "").trim();
  if (!message) {
    return { valid: false, error: "Please enter your project details or message." };
  }
  if (message.length < 10) {
    return { valid: false, error: "Message must be at least 10 characters." };
  }
  if (message.length > 5000) {
    return { valid: false, error: "Message cannot exceed 5000 characters." };
  }

  return { valid: true };
}
