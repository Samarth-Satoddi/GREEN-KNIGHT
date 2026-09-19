"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "../SectionWrapper";
import ChatWindow from "./ChatWindow";
import {
  ShieldCheck,
  Sparkles,
  Cpu,
  Clock,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";

export default function ChatbotSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const capabilities = [
    {
      icon: <Cpu size={18} className="text-emerald-500" />,
      title: "Verified Intelligence",
      description: "Answers grounded directly in official Green Knights enterprise engineering standards.",
    },
    {
      icon: <Layers size={18} className="text-amber-500" />,
      title: "Comprehensive Solutions",
      description: "Explore our 8 core service disciplines, architectures, and technical stacks.",
    },
    {
      icon: <Clock size={18} className="text-emerald-500" />,
      title: "Instant Project Onboarding",
      description: "Specify your project requirement to connect with a senior technical architect within 24 hours.",
    },
  ];

  return (
    <section
      id="ai-assistant"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Background radial glowing effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%, rgba(11,110,79,0.08) 0%, transparent 65%), radial-gradient(ellipse at 25% 70%, rgba(201,162,39,0.06) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section Header */}
        <SectionHeader
          badge="AI Assistant"
          title="Meet Your"
          highlight="Green Knight"
          subtitle="Your AI assistant for exploring our services, technology, and solutions."
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Visual Knight Branding & Value Prop (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Visual Knight Card */}
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 relative overflow-hidden text-white"
              style={{
                background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                boxShadow: "0 25px 60px rgba(11,110,79,0.3)",
              }}
            >
              {/* Decorative background shield watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none text-white">
                <Shield size={220} />
              </div>

              {/* Glowing Knight Avatar / Emblem */}
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-amber-400 shadow-lg relative z-10"
                    style={{
                      background: "linear-gradient(135deg, #145A32 0%, #0B6E4F 100%)",
                      border: "2px solid rgba(201, 162, 39, 0.4)",
                    }}
                  >
                    <Shield size={32} />
                  </div>
                  {/* Outer pulsating ring */}
                  <span className="absolute inset-0 rounded-2xl bg-emerald-400/30 animate-ping pointer-events-none" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className="text-xl sm:text-2xl font-extrabold text-white"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      Green Knights AI
                    </h3>
                    <Sparkles size={16} className="text-amber-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 font-medium">
                    Official Enterprise Concierge
                  </p>
                </div>
              </div>

              <p className="text-[15px] sm:text-[16px] text-white/90 leading-relaxed mb-6">
                Trained exclusively on verified Green Knights capabilities, technical architectures, and service frameworks. Available around the clock to assist your technical journey.
              </p>

              {/* Capabilities List */}
              <div className="space-y-4 pt-4 border-t border-white/15">
                {capabilities.map((cap) => (
                  <div key={cap.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      {cap.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{cap.title}</h4>
                      <p className="text-xs text-white/75 leading-relaxed mt-0.5">
                        {cap.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Status footer inside card */}
              <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Sovereign Security Sandbox Active</span>
                </div>
                <span className="font-semibold text-amber-300">24/7 Live</span>
              </div>
            </div>

            {/* Quick Helper Badge Box */}
            <div
              className="rounded-2xl p-4 sm:p-5 flex items-center justify-between"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    Need Direct Human Contact?
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    You can also use the traditional contact form directly below.
                  </p>
                </div>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline shrink-0 ml-2"
              >
                <span>Scroll</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Chat Window Interface (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <ChatWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
