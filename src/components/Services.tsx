"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./SectionWrapper";
import {
  Brain,
  Code2,
  Cloud,
  Shield,
  RefreshCw,
  Database,
  Cpu,
  BarChart3,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    slug: "ai-solutions",
    icon: <Brain size={26} />,
    title: "AI Solutions",
    description:
      "From machine learning models to generative AI integration, we build intelligent systems that automate decisions, uncover insights, and create transformative business value.",
    badge: "Core Offering",
    color: "#0B6E4F",
  },
  {
    slug: "software-development",
    icon: <Code2 size={26} />,
    title: "Software Development",
    description:
      "Full-stack engineering using modern frameworks. We architect, build, and scale custom software solutions designed for performance, maintainability, and growth.",
    badge: null,
    color: "#145A32",
  },
  {
    slug: "cloud-solutions",
    icon: <Cloud size={26} />,
    title: "Cloud Solutions",
    description:
      "Expert cloud migration, architecture, and optimisation across AWS, Azure, and Google Cloud. We ensure your infrastructure is resilient, cost-efficient, and future-proof.",
    badge: null,
    color: "#0B6E4F",
  },
  {
    slug: "cybersecurity",
    icon: <Shield size={26} />,
    title: "Cybersecurity",
    description:
      "Comprehensive security assessments, threat detection, compliance management, and incident response. We guard your digital assets with the vigilance of a true knight.",
    badge: "Critical",
    color: "#C9A227",
  },
  {
    slug: "digital-transformation",
    icon: <RefreshCw size={26} />,
    title: "Digital Transformation",
    description:
      "End-to-end transformation programmes that modernise legacy systems, reinvent business processes, and drive cultural change across your entire organisation.",
    badge: null,
    color: "#145A32",
  },
  {
    slug: "erp-solutions",
    icon: <Cpu size={26} />,
    title: "ERP Solutions",
    description:
      "Implementation, customisation, and support for enterprise resource planning systems that unify your operations, reduce inefficiencies, and drive smarter business decisions.",
    badge: null,
    color: "#0B6E4F",
  },
  {
    slug: "it-consulting",
    icon: <Database size={26} />,
    title: "IT Consulting",
    description:
      "Strategic technology advisory from experienced CTO-level consultants. We align your technology roadmap with business objectives to deliver maximum return on investment.",
    badge: null,
    color: "#C9A227",
  },
  {
    slug: "data-analytics",
    icon: <BarChart3 size={26} />,
    title: "Data Analytics",
    description:
      "Transform raw data into strategic intelligence. Our data engineers and analysts build pipelines, dashboards, and predictive models that power confident business decisions.",
    badge: "High Demand",
    color: "#145A32",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      className="py-16 sm:py-20 lg:py-24 relative"
      style={{ background: "var(--cream-dark)" }}
    >
      {/* Background radial highlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(11,110,79,0.05) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeader
          badge="Our Services"
          title="Solutions That"
          highlight="Drive Growth"
          subtitle="Eight premium service pillars, each crafted to solve complex enterprise challenges and accelerate your digital journey."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <Link
                href={`/services/${svc.slug}`}
                className="group block relative rounded-2xl p-6 sm:p-8 overflow-hidden h-full flex flex-col justify-between cursor-pointer"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--glass-border)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {/* Gradient hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl pointer-events-none"
                  style={{
                    background: `linear-gradient(135deg, ${svc.color}0D 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Badge */}
                  {svc.badge && (
                    <span
                      className="absolute top-0 right-0 text-[12px] sm:text-[13px] font-bold px-2.5 py-1 rounded-bl-xl rounded-tr-xl"
                      style={{
                        background:
                          svc.badge === "Core Offering"
                            ? "rgba(11,110,79,0.12)"
                            : svc.badge === "Critical"
                            ? "rgba(201,162,39,0.15)"
                            : "rgba(20,90,50,0.12)",
                        color: svc.color,
                      }}
                    >
                      {svc.badge}
                    </span>
                  )}

                  <motion.div
                    className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center mb-4 sm:mb-5"
                    style={{
                      background: `${svc.color}15`,
                      color: svc.color,
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {svc.icon}
                  </motion.div>

                  <h3
                    className="font-bold text-lg sm:text-[22px] lg:text-[24px] mb-2.5 sm:mb-3 leading-snug group-hover:text-[#0B6E4F] transition-colors"
                    style={{ color: "var(--text)" }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className="text-[15px] sm:text-[17px] leading-[1.7] mb-5 sm:mb-6 font-normal"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {svc.description}
                  </p>
                </div>

                <div className="relative z-10 mt-auto pt-4 border-t border-black/5 dark:border-white/5">
                  <div
                    className="flex items-center justify-between text-[15px] sm:text-[16px] font-bold transition-colors duration-200"
                    style={{ color: svc.color }}
                  >
                    <span>Learn More</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-200" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4.5 rounded-xl font-bold text-[15px] sm:text-[17px] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto"
            style={{
              background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
            }}
          >
            Explore All 8 Enterprise Service Pillars
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
