"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./SectionWrapper";
import {
  Search,
  Map,
  Palette,
  Code2,
  Rocket,
  LifeBuoy,
} from "lucide-react";

const steps = [
  {
    icon: <Search size={22} />,
    number: "01",
    title: "Discover",
    description:
      "We begin with deep discovery — understanding your business objectives, technical landscape, challenges, and long-term vision through stakeholder interviews and comprehensive analysis.",
    duration: "1–2 Weeks",
  },
  {
    icon: <Map size={22} />,
    number: "02",
    title: "Strategy",
    description:
      "Our architects and strategists craft a detailed technology roadmap, selecting the optimal stack, architecture pattern, and delivery approach tailored to your specific context.",
    duration: "1–2 Weeks",
  },
  {
    icon: <Palette size={22} />,
    number: "03",
    title: "Design",
    description:
      "UX researchers and designers create wireframes, prototypes, and high-fidelity designs that prioritise user experience, accessibility, and brand alignment.",
    duration: "2–3 Weeks",
  },
  {
    icon: <Code2 size={22} />,
    number: "04",
    title: "Development",
    description:
      "Agile sprints with senior engineers building your solution with clean code, rigorous testing, security-first principles, and continuous client feedback loops.",
    duration: "4–16 Weeks",
  },
  {
    icon: <Rocket size={22} />,
    number: "05",
    title: "Deployment",
    description:
      "Seamless deployment through CI/CD pipelines with zero-downtime releases, comprehensive performance testing, and thorough documentation for your team.",
    duration: "1–2 Weeks",
  },
  {
    icon: <LifeBuoy size={22} />,
    number: "06",
    title: "Support",
    description:
      "24/7 monitoring, proactive maintenance, performance optimisation, and dedicated support — ensuring your solution continues to deliver peak value long after launch.",
    duration: "Ongoing",
  },
];

export default function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%, rgba(11,110,79,0.06) 0%, transparent 50%)",
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeader
          badge="Our Process"
          title="From Vision to"
          highlight="Reality"
          subtitle="A proven six-phase delivery framework that transforms your boldest ideas into production-ready technology with precision and transparency."
        />

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-5 sm:left-6 lg:left-1/2 top-0 bottom-0 w-0.5 lg:-translate-x-0.5"
            style={{
              background:
                "linear-gradient(180deg, #0B6E4F, #C9A227, #0B6E4F, #C9A227, #0B6E4F, #145A32)",
            }}
          />

          <div className="flex flex-col gap-6 sm:gap-12">
            {steps.map((step, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className={`relative flex items-start gap-3.5 sm:gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Step number node */}
                  <div className="relative z-10 flex-shrink-0 ml-0 lg:ml-0">
                    <div
                      className="w-10 h-10 sm:w-13 sm:h-13 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-base"
                      style={{
                        background: "linear-gradient(135deg, #0B6E4F, #C9A227)",
                        boxShadow: "0 4px 20px rgba(11,110,79,0.4)",
                        border: "3px solid var(--cream)",
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`flex-1 min-w-0 lg:max-w-[calc(50%-4rem)] ${
                      isEven ? "" : "lg:text-right"
                    }`}
                  >
                    <div
                      className="group rounded-2xl p-5 sm:p-8 cursor-default"
                      style={{
                        background: "var(--glass-bg)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <div
                        className={`flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-3 sm:mb-4 ${
                          isEven ? "" : "lg:justify-end"
                        }`}
                      >
                        <div
                          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: "rgba(11,110,79,0.1)",
                            color: "#0B6E4F",
                          }}
                        >
                          {step.icon}
                        </div>
                        <h3
                          className="text-lg sm:text-2xl font-bold"
                          style={{
                            color: "var(--text)",
                            fontFamily: "'Playfair Display', serif",
                          }}
                        >
                          {step.title}
                        </h3>
                        <span
                          className="ml-auto text-[11px] sm:text-[13px] font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full"
                          style={{
                            background: "rgba(201,162,39,0.18)",
                            color: "#C9A227",
                          }}
                        >
                          {step.duration}
                        </span>
                      </div>
                      <p
                        className="text-[14.5px] sm:text-[17px] leading-[1.7]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for desktop alternating layout */}
                  <div className="hidden lg:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
