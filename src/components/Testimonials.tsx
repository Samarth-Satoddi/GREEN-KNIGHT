import { SectionHeader } from "./SectionWrapper";
import { MessageSquareCheck } from "lucide-react";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(11,110,79,0.04) 0%, var(--cream) 50%, rgba(201,162,39,0.04) 100%)",
      }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <SectionHeader
          badge="Testimonials & Impact"
          title="Client Success"
          highlight="Stories"
          subtitle="Green Knights of Tech & AI is committed to delivering measurable business impact across enterprise projects."
        />

        <div
          className="relative rounded-3xl p-8 sm:p-12 text-center"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
            boxShadow: "0 25px 60px rgba(11,110,79,0.08)",
          }}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#0B6E4F]15 text-[#0B6E4F] flex items-center justify-center mx-auto mb-5">
            <MessageSquareCheck size={32} />
          </div>

          <h3
            className="text-2xl sm:text-3xl font-extrabold mb-4"
            style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}
          >
            Enterprise Case Studies & Approved Testimonials
          </h3>

          <p
            className="text-[16px] sm:text-[17px] leading-[1.7] max-w-[750px] mx-auto mb-8"
            style={{ color: "var(--text-muted)" }}
          >
            Client success stories and approved enterprise testimonials will be published after client clearance. We prioritize strict client non-disclosure agreements (NDAs) and confidential architecture protection.
          </p>

          <span className="inline-block text-[14px] font-semibold px-5 py-2.5 rounded-full bg-[#0B6E4F]10 text-[#0B6E4F] border border-[#0B6E4F]22">
            Strict Non-Disclosure Protected · Verified Enterprise Deployments
          </span>
        </div>
      </div>
    </section>
  );
}
