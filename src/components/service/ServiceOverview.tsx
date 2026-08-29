import { CheckCircle2, ShieldCheck, Layers } from "lucide-react";
import { ServiceData } from "@/data/services";

interface ServiceOverviewProps {
  service: ServiceData;
}

export default function ServiceOverview({ service }: ServiceOverviewProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Service Overview &amp; Architecture
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Solving Complex Enterprise Challenges
        </h2>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Detailed Explanation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-7 sm:p-9 rounded-2xl" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#0B6E4F" }}>Executive Summary</h3>
            <p className="text-[17px] sm:text-[18px] leading-[1.7] font-medium" style={{ color: "var(--text)" }}>
              {service.overview.summary}
            </p>
          </div>

          <div className="p-7 sm:p-9 rounded-2xl" style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}>
            <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#0B6E4F" }}>Deep-Dive Analysis</h3>
            <p className="text-[16px] sm:text-[17px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
              {service.overview.detailedExplanation}
            </p>
          </div>

          {/* Target Architecture Overview */}
          <div className="p-7 sm:p-9 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(11,110,79,0.05), rgba(201,162,39,0.05))", border: "1px dashed rgba(11,110,79,0.25)" }}>
            <div className="flex items-center gap-2.5 mb-3">
              <Layers size={22} className="text-[#0B6E4F]" />
              <h3 className="text-xl sm:text-2xl font-bold" style={{ color: "var(--text)" }}>Architectural Design Topology</h3>
            </div>
            <p className="text-[16px] sm:text-[17px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
              {service.overview.architectureOverview}
            </p>
          </div>
        </div>

        {/* Problems Solved Sidebar Card */}
        <div className="p-7 sm:p-9 rounded-2xl h-fit" style={{ background: "linear-gradient(135deg, #0a1f15 0%, #0d2818 100%)", color: "white" }}>
          <h3 className="text-xl sm:text-2xl font-bold mb-5 flex items-center gap-2.5" style={{ color: "#C9A227" }}>
            <ShieldCheck size={22} />
            Business Friction Solved
          </h3>

          <ul className="space-y-4">
            {service.overview.businessProblemsSolved.map((prob, i) => (
              <li key={i} className="flex items-start gap-3 text-[15px] sm:text-[16px] text-white/90 leading-[1.7]">
                <CheckCircle2 size={18} className="text-[#C9A227] flex-shrink-0 mt-1" />
                <span>{prob}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-white/12">
            <p className="text-[13px] font-semibold text-white/60 mb-3 uppercase tracking-wider">Primary Enterprise Use Cases:</p>
            <div className="flex flex-wrap gap-2">
              {service.overview.enterpriseUseCases.map((uc, i) => (
                <span key={i} className="text-[13px] font-semibold px-3.5 py-1.5 rounded-md bg-white/10 text-white/90">
                  {uc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
