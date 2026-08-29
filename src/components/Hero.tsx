"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Brain,
  Cloud,
  ShieldCheck,
} from "lucide-react";

const trustBadges = ["Enterprise Ready", "AI Driven", "Secure by Design"];

/* ─── Motion variants for entrance animations ─── */
const containerVar = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
} as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Mouse parallax motion values for background ambient light */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 45, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 45, damping: 20 });

  const orbX = useTransform(springX, [-1, 1], [15, -15]);
  const orbY = useTransform(springY, [-1, 1], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative w-full pt-[110px] sm:pt-[120px] lg:pt-[130px] pb-12 sm:pb-16 noise-overlay flex flex-col justify-center items-center overflow-hidden min-h-[85vh] text-center"
      style={{
        background: "var(--cream)",
      }}
    >
      {/* ── Layered Background: mesh grid, watermark & ambient glowing lighting ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(11, 110, 79, 0.06) 1.5px, transparent 1.5px),
              linear-gradient(90deg, rgba(11, 110, 79, 0.06) 1.5px, transparent 1.5px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ambient Top Emerald Radial Glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            top: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(900px, 95vw)",
            height: "min(650px, 80vw)",
            background: "radial-gradient(ellipse at center, rgba(11,110,79,0.14) 0%, rgba(201,162,39,0.08) 50%, transparent 75%)",
            filter: "blur(60px)",
            x: orbX,
            y: orbY,
          }}
        />

        {/* Ambient Bottom Gold Glow */}
        <motion.div
          className="absolute rounded-full"
          style={{
            bottom: "-10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(750px, 85vw)",
            height: "min(450px, 60vw)",
            background: "radial-gradient(ellipse at center, rgba(201,162,39,0.10) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />

        {/* ── Optional Watermark: Subtle Green Knights Shield behind text ── */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] lg:w-[580px] lg:h-[580px] opacity-[0.04] pointer-events-none"
        >
          <Image
            src="/images/brand/gk-shield-vector.png"
            alt="Green Knights Watermark"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ── Main Full-Width Centered Editorial Container ── */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 flex flex-col items-center justify-center">
        
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center max-w-[1020px] mx-auto"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={fadeUp} className="mb-4 sm:mb-5">
            <span
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11.5px] sm:text-[12.5px] font-bold tracking-[0.10em] uppercase shadow-xs"
              style={{
                background: "rgba(11, 110, 79, 0.10)",
                color: "#0B6E4F",
                border: "1px solid rgba(11, 110, 79, 0.24)",
              }}
            >
              <motion.span
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full"
                style={{ background: "#0B6E4F" }}
              />
              AI-Powered Enterprise Solutions
            </span>
          </motion.div>

          {/* Main Headline — Reduced by 25-30% for Balanced Proportions */}
          <motion.h1
            variants={fadeUp}
            className="text-[32px] sm:text-[44px] md:text-[54px] lg:text-[64px] xl:text-[70px] font-extrabold tracking-tight mb-5 leading-[1.08]"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "var(--text)",
              letterSpacing: "-0.025em",
            }}
          >
            <span>Building</span>
            <br />
            <span style={{ color: "#0B6E4F" }}>Intelligent</span>
            <br />
            <span>Technology for</span>
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, #C9A227 0%, #E5BE3B 50%, #C9A227 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tomorrow
            </span>
          </motion.h1>

          {/* Company Description */}
          <motion.p
            variants={fadeUp}
            className="mb-7 text-[15px] sm:text-[17px] lg:text-[18px] leading-[1.65] max-w-[700px] mx-auto font-medium"
            style={{ color: "var(--text-muted)" }}
          >
            <strong style={{ color: "#0B6E4F", fontWeight: 700 }}>GREEN KNIGHTS OF TECH &amp; AI</strong> helps
            enterprises transform with AI, cloud, cybersecurity, automation, and next-generation
            software engineering.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-7"
          >
            <motion.button
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.04, y: -3, boxShadow: "0 16px 38px rgba(11,110,79,0.40)" }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2.5 font-bold text-white px-8 py-3.5 sm:px-9 sm:py-4 w-full sm:w-auto cursor-pointer"
              style={{
                background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                borderRadius: "14px",
                border: "none",
                fontSize: "1rem",
                letterSpacing: "0.01em",
                boxShadow: "0 8px 24px rgba(11,110,79,0.28)",
                transition: "box-shadow 0.25s, transform 0.25s",
              }}
              id="hero-primary-cta"
            >
              Book a Consultation
              <motion.span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
                <ArrowRight size={18} strokeWidth={2.5} />
              </motion.span>
            </motion.button>

            <motion.button
              onClick={() => scrollToSection("#services")}
              whileHover={{ scale: 1.04, y: -2, background: "rgba(11,110,79,0.08)", borderColor: "#0B6E4F" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2.5 font-bold px-8 py-3.5 sm:px-9 sm:py-4 w-full sm:w-auto cursor-pointer"
              style={{
                background: "var(--glass-bg)",
                color: "var(--text)",
                borderRadius: "14px",
                border: "1.5px solid rgba(11,110,79,0.28)",
                fontSize: "1rem",
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                transition: "border-color 0.25s, background-color 0.25s, transform 0.25s",
              }}
              id="hero-secondary-cta"
            >
              Explore Services
            </motion.button>
          </motion.div>

          {/* Bottom Highlights (Horizontal on Desktop, Stack on Mobile) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-y-2 gap-x-7 text-[13.5px] sm:text-[15px] font-bold"
            style={{ color: "var(--text-muted)" }}
          >
            {trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-2">
                <Sparkles size={15} className="text-[#0B6E4F]" strokeWidth={2.5} />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ═══ KEY METRICS ROW ═══ */}
        <motion.div
          variants={containerVar}
          initial="hidden"
          animate="show"
          className="mt-14 sm:mt-18 lg:mt-20 w-full max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              { value: "Enterprise AI",  label: "Intelligent Automation", accent: "#0B6E4F", icon: <Brain size={22} strokeWidth={2} /> },
              { value: "Cloud Native",   label: "AWS, Azure & GCP",        accent: "#C9A227", icon: <Cloud size={22} strokeWidth={2} /> },
              { value: "Zero Trust",     label: "Enterprise Security",     accent: "#0B6E4F", icon: <ShieldCheck size={22} strokeWidth={2} /> },
              { value: "24/7 SLA",       label: "Dedicated Support",       accent: "#C9A227", icon: <Sparkles size={22} strokeWidth={2} /> },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 22px 45px rgba(11,110,79,0.16)" }}
                className="flex items-center gap-3.5 sm:gap-4 p-4 sm:p-5 rounded-[20px]"
                style={{
                  background: "var(--glass-bg)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "0 10px 30px rgba(11, 110, 79, 0.06)",
                  transition: "transform 0.25s, box-shadow 0.25s",
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${stat.accent}18`,
                    border: `1.5px solid ${stat.accent}30`,
                    color: stat.accent,
                  }}
                >
                  {stat.icon}
                </div>

                <div className="text-left min-w-0">
                  <p
                    className="text-base sm:text-lg lg:text-[20px] font-extrabold leading-tight mb-0.5"
                    style={{ color: stat.accent, fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[11px] sm:text-[12px] font-bold text-[var(--text-muted)] uppercase tracking-wider leading-none truncate">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Scroll indicator button (Desktop only) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="hidden lg:flex mt-12 justify-center w-full"
        >
          <button
            onClick={() => scrollToSection("#round-table")}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
            style={{ background: "transparent", border: "none" }}
            aria-label="Scroll to explore"
          >
            <span
              className="text-[12px] font-bold tracking-[0.14em] uppercase text-[var(--text-muted)] group-hover:text-[#0B6E4F] transition-colors"
            >
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: "1.5px solid rgba(11, 110, 79, 0.35)" }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1 h-1.5 rounded-full"
                style={{ background: "#0B6E4F" }}
              />
            </motion.div>
          </button>
        </motion.div>

      </div>
    </section>
  );
}
