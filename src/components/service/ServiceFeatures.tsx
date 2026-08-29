"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/data/services";
import * as LucideIcons from "lucide-react";

interface ServiceFeaturesProps {
  service: ServiceData;
}

export default function ServiceFeatures({ service }: ServiceFeaturesProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Capabilities &amp; Modules
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Key Technical Features
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {service.features.map((feature, i) => {
          // Dynamic Lucide icon lookup fallback
          const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>;
          const IconComponent = iconMap[feature.iconName] || LucideIcons.Zap;

          return (
            <motion.div
              key={i}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(11,110,79,0.12)" }}
              transition={{ duration: 0.2 }}
              className="p-5 sm:p-8 rounded-2xl relative overflow-hidden group flex flex-col justify-between"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div>
                <div
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center mb-4 sm:mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{
                    background: `${service.color}15`,
                    color: service.color,
                  }}
                >
                  <IconComponent size={24} />
                </div>

                <h3 className="font-bold text-lg sm:text-2xl mb-2 sm:mb-3" style={{ color: "var(--text)" }}>
                  {feature.title}
                </h3>

                <p className="text-[14.5px] sm:text-[16px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
                  {feature.description}
                </p>
              </div>

              {/* Accent corner border line */}
              <div
                className="absolute top-0 right-0 w-16 h-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at top right, ${service.color}25, transparent 70%)`,
                }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
