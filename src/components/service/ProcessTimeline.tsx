"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";
import { CheckCircle2, Clock } from "lucide-react";

interface ProcessTimelineProps {
  service: ServiceData;
}

export default function ProcessTimeline({ service }: ProcessTimelineProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Execution Workflow
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Implementation Process Roadmap
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l-2 border-[#0B6E4F]30 space-y-8">
        {service.process.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative"
          >
            {/* Timeline dot */}
            <div
              className="absolute -left-[31px] sm:-left-[39px] top-2.5 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-md"
              style={{ background: service.color }}
            >
              {i + 1}
            </div>

            <div
              className="p-7 sm:p-8 rounded-2xl"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#C9A227]18 text-[#C9A227]">
                    Phase {i + 1}: {step.phase}
                  </span>
                  <h3 className="font-bold text-[19px] sm:text-[21px]" style={{ color: "var(--text)" }}>
                    {step.title}
                  </h3>
                </div>

                <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold" style={{ color: "var(--text-muted)" }}>
                  <Clock size={15} />
                  {step.duration}
                </span>
              </div>

              <p className="text-[16px] leading-[1.7] mb-5 text-gray-600">
                {step.description}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {step.deliverables.map((del, d) => (
                  <span key={d} className="inline-flex items-center gap-1.5 text-[13px] px-3.5 py-1.5 rounded bg-[#0B6E4F]08 text-[#0B6E4F] font-semibold">
                    <CheckCircle2 size={14} />
                    {del}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
