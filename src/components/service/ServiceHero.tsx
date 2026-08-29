"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ServiceData } from "@/data/services";
import AnimatedCounter from "@/components/AnimatedCounter";

interface ServiceHeroProps {
  service: ServiceData;
}

export default function ServiceHero({ service }: ServiceHeroProps) {
  const scrollToContact = () => {
    const el = document.getElementById("book-consultation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToRelated = () => {
    const el = document.getElementById("related-services");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-16 overflow-hidden mb-8 sm:mb-12"
      style={{
        background: "linear-gradient(135deg, rgba(11,110,79,0.08) 0%, rgba(201,162,39,0.1) 50%, rgba(20,90,50,0.06) 100%)",
        border: "1px solid rgba(11,110,79,0.2)",
        boxShadow: "0 20px 40px rgba(11,110,79,0.08)",
      }}
    >
      {/* Animated glow spot */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-25"
        style={{
          background: `radial-gradient(circle, ${service.color} 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      <div className="relative z-10 max-w-4xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[12px] sm:text-[14px] font-bold tracking-wide uppercase mb-4 sm:mb-6 shadow-xs"
          style={{
            background: `${service.color}18`,
            color: service.color,
            border: `1px solid ${service.color}35`,
          }}
        >
          <Sparkles size={14} />
          {service.badge} · {service.category}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-[26px] xs:text-[32px] sm:text-[44px] lg:text-[52px] font-extrabold tracking-tight mb-4 sm:mb-6 leading-[1.15]"
          style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}
        >
          {service.title}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[15px] sm:text-[18px] lg:text-[19px] font-medium leading-[1.7] mb-6 sm:mb-8 max-w-[750px]"
          style={{ color: "var(--text-muted)" }}
        >
          {service.tagline}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToContact}
            className="btn-shine flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-[15px] sm:text-[16px] text-white transition-all cursor-pointer shadow-lg hover:shadow-2xl w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
              boxShadow: "0 10px 25px rgba(11,110,79,0.35)",
            }}
          >
            Book a Consultation
            <ArrowRight size={18} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToRelated}
            className="flex items-center justify-center gap-2.5 px-6 py-3.5 sm:px-7 sm:py-4 rounded-xl font-semibold text-[15px] sm:text-[16px] transition-all cursor-pointer hover:bg-[#0B6E4F]10 w-full sm:w-auto"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              color: "var(--text)",
            }}
          >
            Explore Related Services
          </motion.button>
        </motion.div>

        {/* Hero Quick Statistics */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8"
          style={{ borderTop: "1px solid rgba(11,110,79,0.18)" }}
        >
          {service.heroStats.map((stat, i) => (
            <div
              key={i}
              className="p-3.5 sm:p-5 rounded-2xl transition-all"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(10px)",
              }}
            >
              <p className="text-xl sm:text-3xl font-extrabold" style={{ color: service.color }}>
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="text-[12px] sm:text-[14px] font-semibold mt-1 truncate" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
