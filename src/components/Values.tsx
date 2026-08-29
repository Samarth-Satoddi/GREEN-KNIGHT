"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./SectionWrapper";
import { Users, Lightbulb, Brain, RefreshCw, Scale } from "lucide-react";

const values = [
  {
    icon: <Users size={28} />,
    title: "Collaboration",
    description:
      "We believe the best solutions emerge when diverse minds work together. Our round-table philosophy means every voice counts, every perspective strengthens our work, and every client becomes part of our inner circle.",
    color: "#0B6E4F",
    gradient: "linear-gradient(135deg, rgba(11,110,79,0.12), rgba(11,110,79,0.04))",
  },
  {
    icon: <Lightbulb size={28} />,
    title: "Innovation",
    description:
      "Standing still is not in our nature. We continuously explore emerging technologies, challenge conventional thinking, and craft solutions that don't just solve today's problems but anticipate tomorrow's opportunities.",
    color: "#C9A227",
    gradient: "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.04))",
  },
  {
    icon: <Brain size={28} />,
    title: "Intelligence",
    description:
      "Every decision, every architecture, every line of code is grounded in deep knowledge and strategic thinking. We bring AI-augmented intelligence to every engagement, enabling smarter outcomes at every level.",
    color: "#0B6E4F",
    gradient: "linear-gradient(135deg, rgba(11,110,79,0.12), rgba(11,110,79,0.04))",
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Transformation",
    description:
      "We are catalysts for change. From legacy modernisation to full digital reinvention, we guide organisations through fundamental shifts that create lasting competitive advantage and operational excellence.",
    color: "#C9A227",
    gradient: "linear-gradient(135deg, rgba(201,162,39,0.12), rgba(201,162,39,0.04))",
  },
  {
    icon: <Scale size={28} />,
    title: "Governance",
    description:
      "With great technology comes great responsibility. We embed ethical AI principles, robust data governance, and enterprise-grade security into everything we build — ensuring compliance, trust, and long-term resilience.",
    color: "#145A32",
    gradient: "linear-gradient(135deg, rgba(20,90,50,0.12), rgba(20,90,50,0.04))",
  },
];

export default function Values() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="values"
      className="py-16 sm:py-24 lg:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--cream) 0%, rgba(11,110,79,0.04) 50%, var(--cream) 100%)",
      }}
    >
      {/* Decorative rings */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-10"
        style={{ border: "1px solid #0B6E4F" }}
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.07]"
        style={{ border: "1px dashed #C9A227" }}
      />

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          badge="Core Values"
          title="The Code of the"
          highlight="Digital Knights"
          subtitle="Five foundational principles guide every engagement, decision, and solution we deliver — forming the unbreakable code of Green Knights."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {values.slice(0, 3).map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} inView={inView} />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mt-5 sm:mt-6 max-w-2xl mx-auto lg:max-w-none lg:grid-cols-2 lg:px-48">
          {values.slice(3).map((value, i) => (
            <ValueCard key={value.title} value={value} index={i + 3} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  value,
  index,
  inView,
}: {
  value: (typeof values)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="group relative rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-400 cursor-default"
      style={{
        background: "var(--glass-bg)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--glass-border)",
      }}
      whileHover={{
        y: -8,
        boxShadow:
          "0 30px 60px rgba(11,110,79,0.15), 0 10px 20px rgba(11,110,79,0.08)",
        borderColor: "rgba(11,110,79,0.35)",
      }}
    >
      {/* Background gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl pointer-events-none"
        style={{ background: value.gradient }}
      />

      {/* Icon */}
      <div className="relative z-10">
        <motion.div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 sm:mb-5 transition-all duration-300"
          style={{ background: value.gradient, color: value.color }}
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {value.icon}
        </motion.div>

        <h3
          className="text-lg sm:text-2xl lg:text-[26px] font-bold mb-2.5 sm:mb-3"
          style={{
            color: "var(--text)",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {value.title}
        </h3>
        <p
          className="text-[15px] sm:text-[17px] leading-[1.75]"
          style={{ color: "var(--text-muted)" }}
        >
          {value.description}
        </p>

        {/* Bottom accent */}
        <div
          className="mt-6 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
          style={{ background: `linear-gradient(90deg, ${value.color}, transparent)` }}
        />
      </div>
    </motion.div>
  );
}
