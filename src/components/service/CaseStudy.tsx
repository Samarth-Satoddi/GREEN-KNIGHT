import { ServiceData } from "@/data/services";
import { Award } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

interface CaseStudyProps {
  service: ServiceData;
}

export default function CaseStudy({ service }: CaseStudyProps) {
  const cs = service.caseStudy;

  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Proven Track Record
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Featured Enterprise Case Study
        </h2>
      </div>

      <div
        className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-11 text-white relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0a1f15 0%, #0d2818 50%, #06140d 100%)",
          border: "1px solid rgba(201,162,39,0.35)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div className="flex items-center gap-2 text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#C9A227] mb-3 sm:mb-4">
          <Award size={16} />
          {cs.clientType}
        </div>

        <h3 className="text-xl sm:text-3xl lg:text-[32px] font-bold mb-5 sm:mb-6 text-white leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
          {cs.title}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-6 sm:mb-8">
          <div className="p-4 sm:p-6 rounded-2xl bg-white/6 border border-white/12">
            <h4 className="text-[14px] sm:text-[15px] font-extrabold text-red-400 uppercase tracking-wider mb-2">The Enterprise Challenge</h4>
            <p className="text-[14.5px] sm:text-[16px] text-white/90 leading-[1.7]">{cs.problem}</p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/6 border border-white/12">
            <h4 className="text-[14px] sm:text-[15px] font-extrabold text-emerald-400 uppercase tracking-wider mb-2">The Green Knights Solution</h4>
            <p className="text-[14.5px] sm:text-[16px] text-white/90 leading-[1.7]">{cs.solution}</p>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-[14px] font-semibold text-white/60 mb-3 uppercase tracking-wider">Technologies Deployed:</p>
          <div className="flex flex-wrap gap-2.5">
            {cs.technologiesUsed.map((t, i) => (
              <span key={i} className="text-[14px] px-3.5 py-1.5 rounded-md bg-[#C9A227]20 text-[#C9A227] font-semibold border border-[#C9A227]35">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/12 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {cs.businessResults.map((res, i) => (
            <div key={i} className="text-center p-5 rounded-xl bg-white/6 border border-white/8">
              <p className="text-2xl sm:text-3xl lg:text-[34px] font-extrabold text-[#C9A227] mb-1">
                <AnimatedCounter value={res.value} />
              </p>
              <p className="text-[14px] text-white/85 font-semibold">{res.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
