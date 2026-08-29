import { ServiceData } from "@/data/services";
import { TrendingUp, DollarSign, Shield, Zap, Clock, Award, Cpu } from "lucide-react";

interface BenefitsProps {
  service: ServiceData;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "ROI": return <TrendingUp size={18} />;
    case "Cost Reduction": return <DollarSign size={18} />;
    case "Scalability": return <Cpu size={18} />;
    case "Performance": return <Zap size={18} />;
    case "Security": return <Shield size={18} />;
    case "Automation": return <Award size={18} />;
    case "Time Saving": return <Clock size={18} />;
    default: return <Zap size={18} />;
  }
};

export default function Benefits({ service }: BenefitsProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Quantifiable Gains
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Business Impact &amp; Outcomes
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {service.benefits.map((benefit, i) => (
          <div
            key={i}
            className="p-7 sm:p-8 rounded-2xl flex flex-col justify-between"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-bold px-3.5 py-1 rounded-full" style={{ background: `${service.color}15`, color: service.color }}>
                  {getCategoryIcon(benefit.category)}
                  {benefit.category}
                </span>

                <span className="text-[14px] sm:text-[15px] font-extrabold px-3.5 py-1 rounded-lg" style={{ background: "rgba(201,162,39,0.18)", color: "#C9A227" }}>
                  {benefit.metric}
                </span>
              </div>

              <h3 className="font-bold text-xl sm:text-2xl mb-3" style={{ color: "var(--text)" }}>
                {benefit.title}
              </h3>

              <p className="text-[16px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
