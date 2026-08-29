"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, ArrowRight, ShieldCheck, Award, Zap, Brain, Code2, Cloud, Shield, RefreshCw, Cpu, BarChart3, Briefcase } from "lucide-react";
import { allServices } from "@/data/services";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

const categories = [
  "All",
  "Core AI",
  "Cloud & Infra",
  "Engineering & ERP",
  "Security & Analytics",
  "Strategic Advisory",
];

const iconMap: Record<string, React.ReactNode> = {
  "ai-solutions": <Brain size={26} />,
  "software-development": <Code2 size={26} />,
  "cloud-solutions": <Cloud size={26} />,
  cybersecurity: <Shield size={26} />,
  "digital-transformation": <RefreshCw size={26} />,
  "erp-solutions": <Cpu size={26} />,
  "it-consulting": <Briefcase size={26} />,
  "data-analytics": <BarChart3 size={26} />,
};

export default function ServicesLandingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices = useMemo(() => {
    return allServices.filter((svc) => {
      const matchesCategory =
        activeCategory === "All" || svc.category === activeCategory;
      const matchesSearch =
        svc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        svc.overview.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <ScrollProgress />
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Hero */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span
              className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-4 py-2 rounded-full inline-flex items-center gap-2 mb-5 shadow-xs"
              style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}
            >
              <Sparkles size={15} />
              Enterprise Technology Pillars
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight mb-5 leading-tight"
              style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}
            >
              Solutions Engineered for Market Dominance
            </h1>
            <p
              className="text-[18px] sm:text-[19px] text-gray-700 leading-[1.7] max-w-[750px] mx-auto"
            >
              Discover Green Knights&apos; eight enterprise service pillars, designed with sovereign security, high velocity, and scalable AI infrastructure.
            </p>

            {/* Real-time Search Bar */}
            <div className="mt-8 relative max-w-xl mx-auto">
              <Search
                size={22}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search services by keyword, tech stack, or business goal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-13 pr-4 py-4 rounded-2xl text-[16px] border shadow-xs focus:outline-none focus:ring-2 focus:ring-[#0B6E4F] transition-all"
                style={{
                  background: "var(--glass-bg)",
                  borderColor: "var(--glass-border)",
                  color: "var(--text)",
                }}
              />
            </div>

            {/* Category Filter Buttons */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mt-5 sm:mt-7">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl text-[13px] sm:text-[15px] font-bold transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#0B6E4F] text-white shadow-md"
                        : "bg-white/80 dark:bg-emerald-950/60 text-gray-700 dark:text-slate-200 hover:bg-[#0B6E4F]10 hover:text-[#0B6E4F] border border-black/5 dark:border-emerald-800/40"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8 Premium Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-16 sm:mb-20">
            <AnimatePresence>
              {filteredServices.map((svc, i) => (
                <motion.div
                  key={svc.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="group relative rounded-2xl p-5 sm:p-7 lg:p-8 overflow-hidden flex flex-col justify-between"
                  style={{
                    background: "var(--glass-bg)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--glass-border)",
                    boxShadow: "0 10px 30px rgba(11,110,79,0.04)",
                  }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 25px 50px rgba(11,110,79,0.15)",
                    borderColor: `${svc.color}50`,
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center"
                        style={{
                          background: `${svc.color}15`,
                          color: svc.color,
                        }}
                      >
                        {iconMap[svc.slug] || <Sparkles size={24} />}
                      </div>

                      <span
                        className="text-[12px] sm:text-[13px] font-bold px-2.5 sm:px-3 py-1 rounded-full"
                        style={{
                          background: `${svc.color}15`,
                          color: svc.color,
                        }}
                      >
                        {svc.badge}
                      </span>
                    </div>

                    <h2
                      className="font-bold text-lg sm:text-[22px] mb-2.5 sm:mb-3 group-hover:text-[#0B6E4F] transition-colors"
                      style={{ color: "var(--text)" }}
                    >
                      {svc.title}
                    </h2>

                    <p
                      className="text-[14.5px] sm:text-[16px] leading-[1.7] mb-4 text-[var(--text-muted)] line-clamp-3"
                    >
                      {svc.tagline}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {svc.technologies.slice(0, 3).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[12px] sm:text-[13px] px-2.5 py-1 rounded-md bg-black/5 dark:bg-emerald-950/60 text-gray-700 dark:text-slate-300 font-semibold"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${svc.slug}`}
                    className="w-full py-3.5 rounded-xl text-[15px] sm:text-[16px] font-bold text-white flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                    }}
                  >
                    Explore {svc.title}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 text-gray-600 text-[16px]">
              No services found matching your search term. Try resetting your query or category filters.
            </div>
          )}

          {/* Why Green Knights Feature Section */}
          <div
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-12 mb-16 text-white"
            style={{
              background: "linear-gradient(135deg, #0a1f15 0%, #0d2818 50%, #0a1f15 100%)",
              border: "1px solid rgba(201,162,39,0.35)",
            }}
          >
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[13px] font-bold uppercase tracking-widest text-[#C9A227]">
                The Green Knights Advantage
              </span>
              <h2
                className="text-2xl sm:text-4xl font-extrabold mt-3 text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why Enterprises Partner With Us
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Enterprise Experience",
                  desc: "Senior engineering talent with over a decade of production scale experience.",
                  icon: <Award className="text-[#C9A227]" size={26} />,
                },
                {
                  title: "Sovereign AI Protection",
                  desc: "Zero data leakage guarantees and private VPC deployment models.",
                  icon: <ShieldCheck className="text-[#C9A227]" size={26} />,
                },
                {
                  title: "10x Release Velocity",
                  desc: "Automated GitOps CI/CD pipelines enabling daily feature deployments.",
                  icon: <Zap className="text-[#C9A227]" size={26} />,
                },
                {
                  title: "24/7 Managed SRE",
                  desc: "Continuous proactive incident monitoring under strict SLA response guarantees.",
                  icon: <Sparkles className="text-[#C9A227]" size={26} />,
                },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/6 border border-white/12">
                  <div className="mb-3.5">{item.icon}</div>
                  <h3 className="font-bold text-lg sm:text-xl text-white mb-2">{item.title}</h3>
                  <p className="text-[16px] leading-[1.7] text-white/80">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
