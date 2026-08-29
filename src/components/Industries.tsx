"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./SectionWrapper";
import {
  HeartPulse,
  Landmark,
  GraduationCap,
  ShoppingCart,
  Factory,
  Building,
  Home,
  Truck,
  Zap,
  Radio,
} from "lucide-react";

const industries = [
  {
    icon: <HeartPulse size={28} />,
    title: "Healthcare & Life Sciences",
    description: "Clinical AI diagnostics, HIPAA-compliant patient portals, radiology NLP extraction, and electronic health record integration.",
    color: "#0B6E4F",
    stat: "60+ Projects",
  },
  {
    icon: <Landmark size={28} />,
    title: "Finance & Banking",
    description: "Real-time anti-money laundering ML models, algorithmic trading web portals, core banking microservices, and SOC 2 security.",
    color: "#C9A227",
    stat: "100+ Clients",
  },
  {
    icon: <ShoppingCart size={28} />,
    title: "Retail & E-Commerce",
    description: "Omnichannel inventory sync engines, predictive demand forecasting algorithms, and dynamic customer recommendation engines.",
    color: "#0B6E4F",
    stat: "80+ Deployments",
  },
  {
    icon: <Factory size={28} />,
    title: "Manufacturing & Industry 4.0",
    description: "Automated computer vision quality inspection, predictive machine maintenance, digital twin simulation, and IoT sensor pipelines.",
    color: "#C9A227",
    stat: "35+ Factories",
  },
  {
    icon: <GraduationCap size={28} />,
    title: "Education & EdTech",
    description: "AI adaptive tutoring platforms, automated grading engines, student retention analytics, and secure digital campus portals.",
    color: "#145A32",
    stat: "40+ Institutions",
  },
  {
    icon: <Building size={28} />,
    title: "Government & Public Sector",
    description: "AWS GovCloud migrations, paperless resident service portals, FedRAMP security compliance, and smart city data infrastructure.",
    color: "#145A32",
    stat: "20+ Agencies",
  },
  {
    icon: <Home size={28} />,
    title: "Real Estate & PropTech",
    description: "Smart building IoT management systems, automated property valuation algorithms, and digital lease execution portals.",
    color: "#0B6E4F",
    stat: "25+ Portfolios",
  },
  {
    icon: <Truck size={28} />,
    title: "Logistics & Supply Chain",
    description: "Autonomous customs document processing AI, real-time fleet GPS telemetry analytics, and warehouse route optimization.",
    color: "#C9A227",
    stat: "45+ Logistics Hubs",
  },
  {
    icon: <Zap size={28} />,
    title: "Energy & Clean Tech",
    description: "Predictive power grid load balancing models, solar/wind output forecasting, and carbon footprint telemetry tracking.",
    color: "#0B6E4F",
    stat: "18 Energy Grids",
  },
  {
    icon: <Radio size={28} />,
    title: "Telecommunications & 5G",
    description: "High-throughput 5G edge computing node management, automated network fault isolation, and subscriber churn prediction.",
    color: "#C9A227",
    stat: "15 Telecom Ops",
  },
];

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="industries"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(11,110,79,0.05) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeader
          badge="Global Industry Verticals"
          title="Transforming Enterprise"
          highlight="Industry Sectors"
          subtitle="Green Knights delivers tailored AI, cloud, and security architectures engineered specifically for the complex regulations and operational workflows of ten key global industries."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
              className="group relative rounded-3xl p-8 overflow-hidden cursor-default flex flex-col justify-between"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(16px)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 10px 30px rgba(11,110,79,0.04)",
              }}
              whileHover={{
                y: -8,
                boxShadow: "0 30px 60px rgba(11,110,79,0.15)",
                borderColor: `${ind.color}50`,
              }}
            >
              {/* Hover background */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-3xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${ind.color}0D 0%, transparent 60%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs"
                    style={{
                      background: `${ind.color}15`,
                      color: ind.color,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {ind.icon}
                  </motion.div>
                  <span
                    className="text-[13px] font-bold px-3 py-1 rounded-full shadow-xs"
                    style={{
                      background: `${ind.color}15`,
                      color: ind.color,
                    }}
                  >
                    {ind.stat}
                  </span>
                </div>

                <h3
                  className="text-xl sm:text-2xl font-bold mb-3 group-hover:text-[#0B6E4F] transition-colors"
                  style={{
                    color: "var(--text)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {ind.title}
                </h3>
                <p
                  className="text-[16px] sm:text-[17px] leading-[1.7]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {ind.description}
                </p>

                <div
                  className="mt-5 h-0.5 rounded-full w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${ind.color}, transparent)` }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
