import { ServiceData } from "@/data/services";
import { Code2 } from "lucide-react";

interface TechnologyStackProps {
  service: ServiceData;
}

export default function TechnologyStack({ service }: TechnologyStackProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Production Tech Ecosystem
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Technologies &amp; Tools Utilized
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {service.technologies.map((tech, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-2xl flex items-start gap-3.5 sm:gap-4 transition-all hover:border-[#0B6E4F]"
            style={{
              background: "var(--glass-bg)",
              border: "1px solid var(--glass-border)",
            }}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: "rgba(11,110,79,0.12)", color: "#0B6E4F" }}
            >
              <Code2 size={20} />
            </div>

            <div>
              <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider block mb-1" style={{ color: "#C9A227" }}>
                {tech.category}
              </span>
              <h3 className="font-bold text-base sm:text-xl mb-1 sm:mb-1.5" style={{ color: "var(--text)" }}>
                {tech.name}
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
                {tech.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
