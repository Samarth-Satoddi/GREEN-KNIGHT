"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ServiceData } from "@/data/services";

interface FAQProps {
  service: ServiceData;
}

export default function FAQ({ service }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  // Generate JSON-LD FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="mb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Frequently Asked Questions
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Got Questions? We Have Answers.
        </h2>
      </div>

      <div className="space-y-4">
        {service.faqs.map((faq, i) => {
          const isOpen = openIndex === i;

          return (
            <div
              key={i}
              className="rounded-2xl overflow-hidden transition-all"
              style={{
                background: "var(--glass-bg)",
                border: isOpen ? "1.5px solid #0B6E4F" : "1px solid var(--glass-border)",
                boxShadow: isOpen ? "0 10px 25px rgba(11,110,79,0.08)" : "none",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full text-left p-4 sm:p-7 flex items-center justify-between gap-3 sm:gap-4 cursor-pointer"
                style={{ background: "transparent", border: "none" }}
              >
                <span className="font-bold text-[15px] sm:text-[18px] flex items-center gap-2.5 sm:gap-3.5" style={{ color: "var(--text)" }}>
                  <HelpCircle size={20} className="text-[#0B6E4F] flex-shrink-0" />
                  <span>{faq.question}</span>
                </span>

                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-[#0B6E4F]"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-5 sm:px-7 pb-5 sm:pb-7 text-[14.5px] sm:text-[16px] leading-[1.7] border-t border-black/5 dark:border-white/5 pt-3.5 sm:pt-4" style={{ color: "var(--text-muted)" }}>
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
