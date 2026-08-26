"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ShieldCheck,
  Brain,
  Zap,
  TrendingUp,
  Users,
  Layers,
  Clock,
  Award,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={24} />,
    title: "Enterprise Security",
    description:
      "Military-grade security protocols, zero-trust architecture, and continuous threat monitoring protect your most critical assets.",
  },
  {
    icon: <Brain size={24} />,
    title: "AI-First Approach",
    description:
      "Every solution is designed with artificial intelligence at its core — augmenting human capability and delivering smarter outcomes.",
  },
  {
    icon: <Zap size={24} />,
    title: "Fast Delivery",
    description:
      "Agile methodologies and DevOps practices ensure rapid deployment without compromising quality or security.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Proven Innovation",
    description:
      "Backed by a track record of 500+ successful projects across diverse industries and complex technology stacks.",
  },
  {
    icon: <Users size={24} />,
    title: "Expert Engineers",
    description:
      "A curated team of senior engineers, data scientists, architects, and strategists — all with 10+ years of enterprise experience.",
  },
  {
    icon: <Layers size={24} />,
    title: "Scalable Solutions",
    description:
      "Architecture designed to grow with your business — from startup scale to Fortune 500 enterprise workloads.",
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Support",
    description:
      "Round-the-clock monitoring, support, and incident response. When issues arise, our knights are always on guard.",
  },
  {
    icon: <Award size={24} />,
    title: "Quality Guaranteed",
    description:
      "ISO-certified processes, rigorous QA pipelines, and a commitment to excellence in every deliverable we produce.",
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="why-us"
      ref={ref}
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0B6E4F 0%, #145A32 60%, #0d3d22 100%)",
      }}
    >
      {/* Background decorations */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      <div
        className="absolute right-0 top-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,162,39,0.15) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] sm:text-[14px] font-bold tracking-widest uppercase mb-5"
            style={{
              background: "rgba(201,162,39,0.2)",
              color: "#C9A227",
              border: "1px solid rgba(201,162,39,0.35)",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#C9A227" }}
            />
            Why Choose Us
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold leading-tight mb-5 text-white"
            style={{
              fontFamily: "'Playfair Display', serif",
              letterSpacing: "-0.02em",
            }}
          >
            The Green Knights{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #C9A227, #E8C547)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Advantage
            </span>
          </h2>
          <p className="text-[18px] sm:text-[19px] text-white/90 max-w-[750px] mx-auto leading-[1.7]">
            We don&apos;t just deliver technology — we deliver transformation. Here&apos;s why
            the world&apos;s leading enterprises choose Green Knights as their trusted
            digital partner.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl p-8 cursor-default flex flex-col justify-between"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.14)",
                transition: "all 0.35s ease",
              }}
              whileHover={{
                background: "rgba(255,255,255,0.14)",
                borderColor: "rgba(201,162,39,0.4)",
                y: -6,
                boxShadow: "0 20px 40px rgba(0,0,0,0.25)",
              }}
            >
              <div>
                <motion.div
                  className="w-13 h-13 rounded-xl flex items-center justify-center mb-5"
                  style={{
                    background: "rgba(201,162,39,0.18)",
                    color: "#C9A227",
                  }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feat.icon}
                </motion.div>
                <h3 className="font-bold text-xl sm:text-2xl mb-3 text-white">
                  {feat.title}
                </h3>
                <p className="text-[16px] leading-[1.7] text-white/80">
                  {feat.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
