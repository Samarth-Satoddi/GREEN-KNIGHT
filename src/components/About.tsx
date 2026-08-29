"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { SectionHeader, FadeIn } from "./SectionWrapper";
import { Target, Eye, Zap, Shield, ArrowRight } from "lucide-react";

const pillars = [
  {
    icon: <Target size={26} />,
    title: "Our Mission",
    text: "To empower businesses through transformative AI and technology solutions that drive measurable growth, operational excellence, and competitive advantage in the digital era.",
  },
  {
    icon: <Eye size={26} />,
    title: "Our Vision",
    text: "To be the world's most trusted digital knight — a guardian of business innovation — delivering intelligent technology that shapes the future of every industry we serve.",
  },
  {
    icon: <Zap size={26} />,
    title: "Our Approach",
    text: "We combine deep technical expertise with strategic thinking, moving from discovery to deployment with precision. Every solution is crafted to be scalable, secure, and future-ready.",
  },
  {
    icon: <Shield size={26} />,
    title: "Our Promise",
    text: "Like the knights of old, we stand by our clients with honour and commitment. We don't just deliver projects — we build lasting partnerships based on trust, results, and excellence.",
  },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-12 sm:py-16 lg:py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/3 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 100% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── Section Intro: The Story Behind Green Knights ── */}
        <SectionHeader
          badge="About Us"
          title="The Story Behind"
          highlight="Green Knights"
          subtitle="Born from the belief that technology should be a force for transformation, Green Knights of Tech & AI was founded to bridge the gap between complex enterprise challenges and intelligent, human-centred solutions."
        />

        {/* ── Green Knights Philosophy Section with Knight Artwork ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-20">
          {/* Left Column (Approx 42-45%): Green Knight holding shield artwork */}
          <div className="lg:col-span-5 relative flex items-end justify-center order-2 lg:order-1 min-h-[260px] sm:min-h-[440px] lg:min-h-[540px] w-full">
            <FadeIn direction="left" delay={0.1} className="w-full h-full flex items-end justify-center">
              <div className="relative w-full h-full min-h-[260px] sm:min-h-[440px] lg:min-h-[540px] flex items-end justify-center">
                {/* Soft emerald aura glow behind the knight */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(11,110,79,0.18) 0%, rgba(201,162,39,0.08) 50%, transparent 80%)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Subtle gold ambient glow around shield */}
                <div
                  className="absolute w-3/4 h-3/4 pointer-events-none rounded-full"
                  style={{
                    left: "50%",
                    top: "45%",
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(201,162,39,0.22) 0%, transparent 70%)",
                    filter: "blur(25px)",
                  }}
                />

                {/* Official Green Knight Artwork */}
                <Image
                  src="/images/brand/gk-knight-shield.png"
                  alt="Green Knight holding the Green Knights shield"
                  fill
                  sizes="(max-width: 1024px) 100vw, 550px"
                  className="object-contain object-bottom relative z-10 drop-shadow-[0_15px_30px_rgba(5,18,11,0.25)]"
                  priority
                />

                {/* Subtle bottom fade blending into cream background */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-14 z-20 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, var(--cream) 0%, transparent 100%)",
                  }}
                />
              </div>
            </FadeIn>
          </div>

          {/* Right Column (Approx 55-58%): Philosophy Story & Call to Action */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <FadeIn direction="right" delay={0.2}>
              <div>
                <div
                  className="w-12 h-1.5 rounded-full mb-4 sm:mb-6"
                  style={{ background: "linear-gradient(90deg, #0B6E4F, #C9A227)" }}
                />
                <span
                  className="text-[12px] sm:text-[14px] font-bold uppercase tracking-widest block mb-2 sm:mb-3"
                  style={{ color: "#0B6E4F" }}
                >
                  THE GREEN KNIGHTS PHILOSOPHY
                </span>
                <h3
                  className="text-[28px] sm:text-[36px] lg:text-[46px] font-extrabold mb-4 sm:mb-6 leading-tight"
                  style={{
                    color: "var(--text)",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Digital Knights of the Round Table
                </h3>
                <p
                  className="text-[17px] sm:text-[18px] lg:text-[19px] leading-[1.65] mb-4 sm:mb-6 font-bold max-w-[780px] text-emerald-900 dark:text-emerald-300"
                >
                  Technology requires more than tools. It requires strategy, collaboration, responsibility and disciplined execution.
                </p>
                <p
                  className="text-[16px] sm:text-[17px] lg:text-[18px] leading-[1.65] mb-6 sm:mb-8 max-w-[780px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Green Knights of Tech &amp; AI operates like a modern round table — each partner bringing specialized technical authority, collaborating with absolute transparency, and guarding enterprise interests across AI, Cloud, Cybersecurity, and Digital Transformation.
                </p>

                <div className="flex flex-wrap gap-2.5 sm:gap-3 mb-6 sm:mb-8">
                  {["Strategy First", "AI Researchers", "Enterprise Security", "Disciplined Execution"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-[13px] sm:text-[15px] lg:text-[16px] font-semibold"
                        style={{
                          background: "rgba(11,110,79,0.1)",
                          color: "#0B6E4F",
                          border: "1px solid rgba(11,110,79,0.25)",
                        }}
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <Link
                  href="/#round-table"
                  className="inline-flex items-center justify-center gap-3 px-7 py-3.5 sm:px-8 sm:py-4.5 rounded-xl font-bold text-[15px] sm:text-[17px] text-white shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.99] group w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, #0B6E4F 0%, #06402E 100%)",
                    boxShadow: "0 6px 20px rgba(11, 110, 79, 0.25)",
                  }}
                >
                  <span>Discover Our Approach</span>
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Pillars grid - 2x2 spacious layout */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
              className="glass-card rounded-2xl p-8 sm:p-10 group flex flex-col justify-between"
            >
              <div>
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: "rgba(11,110,79,0.12)",
                    color: "#0B6E4F",
                  }}
                >
                  {pillar.icon}
                </div>
                <h4
                  className="font-bold text-xl sm:text-2xl mb-4"
                  style={{ color: "var(--text)" }}
                >
                  {pillar.title}
                </h4>
                <p
                  className="text-[16px] sm:text-[17px] leading-[1.75]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {pillar.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
