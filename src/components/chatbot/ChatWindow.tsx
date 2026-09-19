"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, RotateCcw, AlertCircle } from "lucide-react";
import ChatMessage, { MessageItem } from "./ChatMessage";
import ChatInput from "./ChatInput";
import QuickActions from "./QuickActions";
import TypingIndicator from "./TypingIndicator";
import { filterRelevantConversation } from "@/lib/ai/conversation-filter";

let msgCounter = 0;
function createMsgId(prefix: string): string {
  msgCounter += 1;
  return `${prefix}-${msgCounter}`;
}

const INITIAL_MESSAGE: MessageItem = {
  id: "welcome-msg",
  role: "assistant",
  content:
    "Hello! I'm the Green Knights AI Assistant. I can help you explore our services, technologies, and solutions. How can I help you today?",
  timestamp: "Just now",
};

interface LeadData {
  step: "idle" | "name" | "email" | "company" | "service" | "requirement" | "submitted";
  name: string;
  email: string;
  company: string;
  service: string;
  requirement: string;
}

const SERVICES_OPTIONS = [
  { id: "ai", label: "AI Solutions" },
  { id: "software", label: "Software Development" },
  { id: "cloud", label: "Cloud Solutions" },
  { id: "security", label: "Cybersecurity" },
  { id: "transformation", label: "Digital Transformation" },
  { id: "erp", label: "ERP Solutions" },
  { id: "consulting", label: "IT Consulting" },
  { id: "data", label: "Data Analytics" },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<MessageItem[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [leadState, setLeadState] = useState<LeadData>({
    step: "idle",
    name: "",
    email: "",
    company: "",
    service: "",
    requirement: "",
  });
  const [leadError, setLeadError] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom whenever messages update or typing indicator appears
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, leadState.step]);

  // Restart chat
  const handleResetChat = () => {
    setMessages([
      {
        ...INITIAL_MESSAGE,
        id: createMsgId("welcome"),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setInputValue("");
    setIsLoading(false);
    setLeadState({
      step: "idle",
      name: "",
      email: "",
      company: "",
      service: "",
      requirement: "",
    });
    setLeadError(null);
  };

  // Check if query triggers lead generation flow
  const isLeadIntent = (text: string): boolean => {
    const t = text.toLowerCase().trim();
    return (
      /\b(contact(\s+the)?\s+(team|us|me)|reach\s+out(\s+to\s+me)?|connect\s+with(\s+the\s+team)?)\b/i.test(t) ||
      /\b(consult|consultation|hire(\s+you|\s+us)?|get\s+a\s+quote|request\s+a\s+quote|start\s+a\s+project|discuss\s+a\s+project|business\s+enquiry)\b/i.test(t) ||
      /\b(i\s+want\s+a\s+consultation|can\s+someone\s+contact\s+me|please\s+contact\s+me)\b/i.test(t)
    );
  };

  // Advance the guided lead capture flow
  const handleLeadStep = async (stepInput: string) => {
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (leadState.step === "name") {
      const name = stepInput.trim();
      if (name.length < 2) {
        setLeadError("Please provide your full name.");
        return;
      }
      setLeadError(null);
      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        role: "user",
        content: name,
        timestamp: formattedTime,
      };
      const botMsg: MessageItem = {
        id: `bot-${Date.now() + 1}`,
        role: "assistant",
        content: `Pleasure to meet you, ${name}! What is the best **business email address** for our senior architects to reach you?`,
        timestamp: formattedTime,
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setLeadState((prev) => ({ ...prev, step: "email", name }));
      return;
    }

    if (leadState.step === "email") {
      const email = stepInput.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setLeadError("Please provide a valid business email address (e.g. name@company.com).");
        return;
      }
      setLeadError(null);
      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        role: "user",
        content: email,
        timestamp: formattedTime,
      };
      const botMsg: MessageItem = {
        id: `bot-${Date.now() + 1}`,
        role: "assistant",
        content: "Got it! Which **company or organization** do you represent? *(You can also type 'Skip' if personal)*",
        timestamp: formattedTime,
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setLeadState((prev) => ({ ...prev, step: "company", email }));
      return;
    }

    if (leadState.step === "company") {
      const rawCompany = stepInput.trim();
      const company = rawCompany.toLowerCase() === "skip" ? "" : rawCompany;
      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        role: "user",
        content: rawCompany,
        timestamp: formattedTime,
      };
      const botMsg: MessageItem = {
        id: `bot-${Date.now() + 1}`,
        role: "assistant",
        content: "Which **service discipline** are you primarily interested in?",
        timestamp: formattedTime,
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setLeadState((prev) => ({ ...prev, step: "service", company }));
      return;
    }

    if (leadState.step === "requirement") {
      const requirement = stepInput.trim();
      if (requirement.length < 5) {
        setLeadError("Please provide a brief description of your project requirements.");
        return;
      }
      setLeadError(null);
      setIsLoading(true);

      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        role: "user",
        content: requirement,
        timestamp: formattedTime,
      };

      const updatedHistory = [...messages, userMsg];
      setMessages(updatedHistory);

      // Filter conversation for Admin CRM storage (strip casual pleasantries)
      const filteredConversation = filterRelevantConversation(updatedHistory);

      // Submit lead to backend
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            full_name: leadState.name,
            email: leadState.email,
            company: leadState.company,
            service: leadState.service,
            message: requirement,
            source: "chatbot",
            conversation: filteredConversation.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          const confirmationMsg: MessageItem = {
            id: `bot-${Date.now() + 1}`,
            role: "assistant",
            content:
              "Thanks! We've received your requirement. A Green Knight will be in touch with you within 24 hours.",
            timestamp: formattedTime,
          };
          setMessages((prev) => [...prev, confirmationMsg]);
          setLeadState({
            step: "submitted",
            name: "",
            email: "",
            company: "",
            service: "",
            requirement: "",
          });
        } else {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-err-${Date.now()}`,
              role: "assistant",
              content:
                data.error ||
                "We received your details but encountered an issue registering the ticket. Please email hello@greenknights.tech directly or use the contact form below.",
              timestamp: formattedTime,
            },
          ]);
          setLeadState((prev) => ({ ...prev, step: "idle" }));
        }
      } catch (err) {
        console.error("[Lead Submission Error]:", err);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            role: "assistant",
            content:
              "Network connection error. Please feel free to use the contact form below or reach us directly at hello@greenknights.tech.",
            timestamp: formattedTime,
          },
        ]);
        setLeadState((prev) => ({ ...prev, step: "idle" }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle service selection during lead flow
  const handleServiceSelect = (serviceLabel: string, serviceId: string) => {
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMsg: MessageItem = {
      id: createMsgId("user"),
      role: "user",
      content: serviceLabel,
      timestamp: formattedTime,
    };

    const botMsg: MessageItem = {
      id: createMsgId("bot"),
      role: "assistant",
      content: `Excellent choice (${serviceLabel}). Please describe your **project requirements or key objectives**, and our engineering team will prepare tailored recommendations:`,
      timestamp: formattedTime,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setLeadState((prev) => ({ ...prev, step: "requirement", service: serviceId }));
  };

  // Handle general message sending
  const handleSendMessage = async (textToSend?: string) => {
    const rawContent = (textToSend !== undefined ? textToSend : inputValue).trim();
    if (!rawContent || isLoading) return;

    setInputValue("");
    setLeadError(null);

    // If currently in lead capture mode, handle step
    if (leadState.step !== "idle" && leadState.step !== "submitted") {
      await handleLeadStep(rawContent);
      return;
    }

    // Check if user wants to start an enquiry
    if (isLeadIntent(rawContent)) {
      const formattedTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const userMsg: MessageItem = {
        id: `user-${Date.now()}`,
        role: "user",
        content: rawContent,
        timestamp: formattedTime,
      };
      const botMsg: MessageItem = {
        id: `bot-${Date.now() + 1}`,
        role: "assistant",
        content:
          "I'll gladly connect you with our engineering leadership! Let's start with your **full name**:",
        timestamp: formattedTime,
      };
      setMessages((prev) => [...prev, userMsg, botMsg]);
      setLeadState((prev) => ({ ...prev, step: "name" }));
      return;
    }

    // Standard AI question handling
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMessage: MessageItem = {
      id: `user-${Date.now()}`,
      role: "user",
      content: rawContent,
      timestamp: formattedTime,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.message) {
        const botReply: MessageItem = {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: data.message,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botReply]);
      } else {
        const errMsg: MessageItem = {
          id: `assistant-err-${Date.now()}`,
          role: "assistant",
          content:
            data.error ||
            "I encountered a temporary communication glitch. Please try asking again or feel free to use our contact form below.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    } catch {
      const errMsg: MessageItem = {
        id: `assistant-err-${Date.now()}`,
        role: "assistant",
        content:
          "Unable to reach the assistant server. Please check your internet connection.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="w-full rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col transition-all"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(20px)",
        border: "1px solid var(--glass-border)",
        boxShadow: "0 20px 50px rgba(11, 110, 79, 0.08)",
        height: "560px",
      }}
    >
      {/* Panel Header */}
      <div
        className="px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b"
        style={{
          borderColor: "var(--glass-border)",
          background:
            "linear-gradient(135deg, rgba(11, 110, 79, 0.08) 0%, rgba(20, 90, 50, 0.04) 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-amber-400 shadow-sm"
            style={{
              background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
              border: "1px solid rgba(201, 162, 39, 0.3)",
            }}
          >
            <Shield size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white leading-tight">
                Green Knights AI
              </h3>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-bold tracking-wide bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </span>
            </div>
            <p className="text-[11.5px] text-gray-500 dark:text-gray-400">
              Sovereign Enterprise Tech Assistant
            </p>
          </div>
        </div>

        {/* Header Action: Reset Chat */}
        <button
          type="button"
          onClick={handleResetChat}
          title="Reset Chat Session"
          className="p-2 rounded-xl text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors cursor-pointer"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-3.5 scrollbar-thin"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </AnimatePresence>

        {/* Interactive Service Chips during Lead Capture */}
        {leadState.step === "service" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="self-start max-w-[90%] sm:max-w-[80%] bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-3.5 space-y-2.5 ml-11"
          >
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Select a service below:
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {SERVICES_OPTIONS.map((srv) => (
                <button
                  key={srv.id}
                  type="button"
                  onClick={() => handleServiceSelect(srv.label, srv.id)}
                  className="px-2.5 py-1.5 rounded-xl text-left text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-gray-800 dark:text-gray-200 border border-emerald-500/30 hover:border-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                >
                  {srv.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Lead Step Validation Error */}
        {leadError && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-500 text-xs font-medium self-start ml-11"
          >
            <AlertCircle size={14} className="shrink-0" />
            <span>{leadError}</span>
          </motion.div>
        )}

        {/* Typing Indicator */}
        {isLoading && <TypingIndicator />}

        {/* Quick action buttons on initial screen */}
        {messages.length === 1 && !isLoading && (
          <div className="ml-11 mt-1">
            <p className="text-[11.5px] font-semibold text-gray-500 dark:text-gray-400 mb-1.5">
              Suggested Topics:
            </p>
            <QuickActions onSelectAction={(prompt) => handleSendMessage(prompt)} />
          </div>
        )}
      </div>

      {/* Input Footer Area */}
      <div
        className="p-3 sm:p-4 border-t"
        style={{
          borderColor: "var(--glass-border)",
          background: "rgba(255, 255, 255, 0.4)",
        }}
      >
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={() => handleSendMessage()}
          disabled={isLoading}
          placeholder={
            leadState.step === "name"
              ? "Type your full name..."
              : leadState.step === "email"
              ? "Type your email address..."
              : leadState.step === "company"
              ? "Type company name (or 'Skip')..."
              : leadState.step === "requirement"
              ? "Describe your project requirement..."
              : "Ask Green Knights AI anything..."
          }
        />
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] text-gray-400 dark:text-gray-500">
          <span>Enterprise AI Guarded by Green Knights</span>
          <span>Shift+Enter for new line</span>
        </div>
      </div>
    </div>
  );
}
