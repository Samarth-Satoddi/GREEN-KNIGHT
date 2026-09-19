"use client";

import { motion } from "framer-motion";
import { Layers, Cpu, Compass, MessageSquareCode } from "lucide-react";

interface QuickActionsProps {
  onSelectAction: (prompt: string) => void;
  disabled?: boolean;
}

const actionChips = [
  {
    label: "Explore Services",
    prompt: "What services do you provide?",
    icon: <Layers size={13} />,
  },
  {
    label: "Our Technologies",
    prompt: "What technologies and tech stack do you use?",
    icon: <Cpu size={13} />,
  },
  {
    label: "How We Can Help",
    prompt: "How does your 6-phase development process work?",
    icon: <Compass size={13} />,
  },
  {
    label: "Contact the Team",
    prompt: "I want to discuss a project with the Green Knights team.",
    icon: <MessageSquareCode size={13} />,
  },
];

export default function QuickActions({
  onSelectAction,
  disabled = false,
}: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {actionChips.map((chip, index) => (
        <motion.button
          key={chip.label}
          type="button"
          onClick={() => onSelectAction(chip.prompt)}
          disabled={disabled}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: index * 0.05 }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          style={{
            background: "rgba(11, 110, 79, 0.08)",
            color: "#0B6E4F",
            border: "1px solid rgba(11, 110, 79, 0.2)",
          }}
          onMouseEnter={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = "rgba(11, 110, 79, 0.16)";
              e.currentTarget.style.borderColor = "rgba(11, 110, 79, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (!disabled) {
              e.currentTarget.style.background = "rgba(11, 110, 79, 0.08)";
              e.currentTarget.style.borderColor = "rgba(11, 110, 79, 0.2)";
            }
          }}
        >
          <span className="text-amber-600 dark:text-amber-400 group-hover:rotate-6 transition-transform">
            {chip.icon}
          </span>
          <span className="dark:text-emerald-300">{chip.label}</span>
        </motion.button>
      ))}
    </div>
  );
}
