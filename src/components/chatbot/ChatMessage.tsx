"use client";

import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";

export interface MessageItem {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp?: string;
  isLeadPrompt?: boolean;
}

interface ChatMessageProps {
  message: MessageItem;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === "assistant";

  // Helper to render basic markdown elements: bold (**text**), line breaks, bullet lists
  const renderFormattedText = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Process bold formatting **...**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      const formattedParts = parts.map((part, pIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={pIdx} className="font-bold text-gray-900 dark:text-emerald-300">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      // Bullet points
      if (line.trim().startsWith("•") || line.trim().startsWith("-") || line.trim().startsWith("*")) {
        return (
          <div key={idx} className="flex items-start gap-2 my-0.5 pl-1">
            <span className="text-emerald-500 font-bold shrink-0">•</span>
            <span>{formattedParts}</span>
          </div>
        );
      }

      // Empty line spacing
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      return (
        <p key={idx} className="leading-[1.65] my-0.5">
          {formattedParts}
        </p>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
        isBot ? "self-start items-start" : "self-end items-start flex-row-reverse"
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-0.5 ${
          isBot
            ? "border border-amber-500/30 text-amber-400"
            : "border border-emerald-500/30 text-white"
        }`}
        style={{
          background: isBot
            ? "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)"
            : "linear-gradient(135deg, #145A32 0%, #0B6E4F 100%)",
        }}
      >
        {isBot ? <Shield size={16} /> : <User size={16} />}
      </div>

      {/* Bubble */}
      <div
        className={`px-4 py-3 rounded-2xl text-[14px] sm:text-[14.5px] leading-relaxed shadow-sm transition-all ${
          isBot
            ? "rounded-tl-sm text-gray-800 dark:text-gray-100"
            : "rounded-tr-sm text-white"
        }`}
        style={{
          background: isBot
            ? "var(--glass-bg)"
            : "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
          backdropFilter: isBot ? "blur(20px)" : "none",
          border: isBot
            ? "1px solid var(--glass-border)"
            : "1px solid rgba(11, 110, 79, 0.4)",
          boxShadow: isBot
            ? "0 4px 20px rgba(11, 110, 79, 0.05)"
            : "0 4px 15px rgba(11, 110, 79, 0.25)",
        }}
      >
        {isBot && (
          <div className="flex items-center gap-1.5 mb-1 text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            <span>Green Knight AI</span>
          </div>
        )}

        <div className="space-y-0.5">{renderFormattedText(message.content)}</div>

        {message.timestamp && (
          <div
            className={`text-[10px] mt-1.5 text-right opacity-60 ${
              isBot ? "text-gray-500 dark:text-gray-400" : "text-white/80"
            }`}
          >
            {message.timestamp}
          </div>
        )}
      </div>
    </motion.div>
  );
}
