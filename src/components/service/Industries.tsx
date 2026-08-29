import { ServiceData } from "@/data/services";
import { Building2, HeartPulse, Landmark, ShoppingBag, GraduationCap, ShieldAlert, Factory, Truck, Globe } from "lucide-react";

interface IndustriesProps {
  service: ServiceData;
}

const getIndustryIcon = (industry: string) => {
  switch (industry) {
    case "Healthcare": return <HeartPulse size={24} />;
    case "Finance": return <Landmark size={24} />;
    case "Retail": return <ShoppingBag size={24} />;
    case "Education": return <GraduationCap size={24} />;
    case "Government": return <ShieldAlert size={24} />;
    case "Manufacturing": return <Factory size={24} />;
    case "Logistics": return <Truck size={24} />;
    case "Insurance": return <Building2 size={24} />;
    default: return <Globe size={24} />;
  }
};

export default function Industries({ service }: IndustriesProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Vertical Specialization
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Industries Served &amp; Enterprise Deployments
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {service.industries.map((ind, i) => (
          <div
            key={i}
            className="p-5 sm:p-7 rounded-2xl flex flex-col justify-between"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div>
              <div className="flex items-center gap-3.5 mb-4">
                <div
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${service.color}15`, color: service.color }}
                >
                  {getIndustryIcon(ind.industry)}
                </div>
                <div className="min-w-0">
                  <span className="text-[12px] sm:text-[13px] font-bold text-[#C9A227] uppercase tracking-wider block mb-0.5">{ind.industry}</span>
                  <h3 className="font-bold text-base sm:text-xl truncate" style={{ color: "var(--text)" }}>{ind.title}</h3>
                </div>
              </div>

              <p className="text-[14.5px] sm:text-[16px] leading-[1.75] mb-5" style={{ color: "var(--text-muted)" }}>
                {ind.useCase}
              </p>
            </div>

            <div className="pt-4 border-t border-black/5 flex items-center justify-between">
              <span className="text-[13px] font-bold text-[var(--text-muted)]">Empirical Result:</span>
              <span className="text-[13px] sm:text-[14px] font-extrabold px-3 py-1 rounded bg-[#0B6E4F]15 text-[#0B6E4F]">
                {ind.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
