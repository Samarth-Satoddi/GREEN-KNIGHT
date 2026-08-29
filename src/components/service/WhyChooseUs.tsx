import { ServiceData } from "@/data/services";
import * as LucideIcons from "lucide-react";

interface WhyChooseUsProps {
  service: ServiceData;
}

export default function WhyChooseUs({ service }: WhyChooseUsProps) {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md shadow-xs" style={{ background: "rgba(11,110,79,0.1)", color: "#0B6E4F", border: "1px solid rgba(11,110,79,0.2)" }}>
          Knightly Differentiators
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-extrabold mt-4 mb-2" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
          Why Choose Green Knights
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {service.whyChooseUs.map((diff, i) => {
          const iconMap = LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>;
          const IconComp = iconMap[diff.iconName] || LucideIcons.Shield;

          return (
            <div
              key={i}
              className="p-5 sm:p-8 rounded-2xl flex items-start gap-3.5 sm:gap-4"
              style={{
                background: "linear-gradient(135deg, rgba(11,110,79,0.05) 0%, rgba(201,162,39,0.05) 100%)",
                border: "1px solid rgba(11,110,79,0.14)",
              }}
            >
              <div
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: "#0B6E4F", color: "white" }}
              >
                <IconComp size={22} />
              </div>

              <div>
                <h3 className="font-bold text-lg sm:text-2xl mb-1.5 sm:mb-2.5" style={{ color: "var(--text)" }}>
                  {diff.title}
                </h3>
                <p className="text-[14.5px] sm:text-[16px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
                  {diff.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
