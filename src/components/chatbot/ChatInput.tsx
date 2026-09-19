"use client";

import { useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  disabled = false,
  placeholder = "Ask Green Knights AI anything...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend();
      }
    }
  };

  const handleSendClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!disabled && value.trim()) {
      onSend();
    }
  };

  return (
    <div className="relative flex items-end gap-2 bg-white/90 dark:bg-slate-900/90 border border-emerald-600/20 dark:border-emerald-500/30 rounded-2xl p-2 shadow-inner focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        maxLength={1500}
        placeholder={placeholder}
        aria-label="Ask Green Knights AI anything"
        className="flex-1 bg-transparent resize-none outline-none text-xs sm:text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 py-1.5 px-3 max-h-[120px] leading-relaxed font-sans"
        style={{ minHeight: "36px" }}
      />

      <motion.button
        type="button"
        onClick={handleSendClick}
        disabled={disabled || !value.trim()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Send message"
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-900/20"
        style={{
          background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
        }}
      >
        {disabled ? (
          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : (
          <Send size={16} />
        )}
      </motion.button>
    </div>
  );
}
