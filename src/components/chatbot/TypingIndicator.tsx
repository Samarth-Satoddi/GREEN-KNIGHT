"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className="flex items-center gap-2.5 max-w-[85%] self-start"
    >
      {/* Bot Avatar */}
      <div
        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-emerald-950/20"
        style={{
          background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
          color: "#C9A227",
          border: "1px solid rgba(201, 162, 39, 0.3)",
        }}
      >
        <Shield size={16} />
      </div>

      {/* Typing Bubble */}
      <div
        className="px-4 py-3 rounded-2xl flex items-center gap-1.5 shadow-sm"
        style={{
          background: "var(--glass-bg)",
          backdropFilter: "blur(16px)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mr-1">
          Knight Thinking
        </span>
        <motion.span
          animate={{ y: [-2, 2, -2], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 inline-block"
        />
        <motion.span
          animate={{ y: [-2, 2, -2], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 inline-block"
        />
        <motion.span
          animate={{ y: [-2, 2, -2], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 inline-block"
        />
      </div>
    </motion.div>
  );
}
