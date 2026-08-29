"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { getRelatedServices } from "@/data/services";

interface RelatedServicesProps {
  relatedSlugs: string[];
}

export default function RelatedServices({ relatedSlugs }: RelatedServicesProps) {
  const services = getRelatedServices(relatedSlugs);

  if (!services || services.length === 0) return null;

  return (
    <section id="related-services" className="mb-16 scroll-mt-24">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Complementary Capabilities
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Explore Related Services
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {services.map((svc) => (
          <Link key={svc.slug} href={`/services/${svc.slug}`} className="group">
            <motion.div
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(11,110,79,0.12)" }}
              className="p-5 sm:p-7 rounded-2xl h-full flex flex-col justify-between transition-all"
              style={{
                background: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[12px] sm:text-[13px] font-bold px-3 py-1 rounded-full bg-[#0B6E4F]15 text-[#0B6E4F]">
                    {svc.category}
                  </span>
                  <Sparkles size={16} className="text-[#C9A227]" />
                </div>

                <h3 className="font-bold text-lg sm:text-2xl mb-2 sm:mb-3 group-hover:text-[#0B6E4F] transition-colors" style={{ color: "var(--text)" }}>
                  {svc.title}
                </h3>

                <p className="text-[14px] sm:text-[16px] leading-[1.75] line-clamp-3 mb-4" style={{ color: "var(--text-muted)" }}>
                  {svc.tagline}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[14px] sm:text-[16px] font-bold text-[#0B6E4F] dark:text-emerald-400">
                <span>Explore Service Page</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
