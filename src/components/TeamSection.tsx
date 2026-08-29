import { Users, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./SectionWrapper";

export default function TeamSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "var(--cream)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <SectionHeader
          badge="Leadership & Expertise"
          title="Leadership & Senior"
          highlight="Engineering Team"
          subtitle="Green Knights of Tech & AI is led by veteran software engineers, AI researchers, and technical consultants."
        />

        <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] shadow-lg">
          <div className="w-16 h-16 rounded-2xl bg-[#0B6E4F]15 text-[#0B6E4F] flex items-center justify-center mx-auto mb-5">
            <Users size={32} />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
            Leadership Profiles & Executive Bios
          </h3>

          <p className="text-[16px] sm:text-[17px] leading-[1.7] max-w-[750px] mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
            Official leadership profiles, executive bios, and team highlights will be published upon client approval. Our team brings deep technical expertise across AI engineering, cloud architecture, and enterprise software delivery.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              "AI & Machine Learning Engineers",
              "Full-Stack Software Architects",
              "Cloud Infrastructure Specialists",
              "Cybersecurity Consultants",
            ].map((role, i) => (
              <span key={i} className="text-[14px] sm:text-[15px] font-semibold px-4.5 py-2 rounded-full bg-[#0B6E4F]10 text-[#0B6E4F] border border-[#0B6E4F]22 flex items-center gap-2">
                <CheckCircle2 size={15} />
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
