"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Volume2,
  VolumeX,
  Shield,
  ArrowRight,
  Brain,
  Code2,
  Cloud,
  ShieldCheck,
  Zap,
  Cog,
  Lightbulb,
  BarChart2,
} from "lucide-react";
import { playChime } from "@/lib/audio";
import dynamic from "next/dynamic";

const RoundTableScene = dynamic(() => import("./roundtable/RoundTableScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full" style={{ aspectRatio: "16 / 9", maxHeight: "680px", background: "#060F09" }} />
  ),
});
import { roundTableServices } from "@/data/roundTableServices";

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain:       <Brain       size={14} strokeWidth={1.8} />,
  Code2:       <Code2       size={14} strokeWidth={1.8} />,
  Cloud:       <Cloud       size={14} strokeWidth={1.8} />,
  ShieldCheck: <ShieldCheck size={14} strokeWidth={1.8} />,
  Zap:         <Zap         size={14} strokeWidth={1.8} />,
  Cog:         <Cog         size={14} strokeWidth={1.8} />,
  Lightbulb:   <Lightbulb   size={14} strokeWidth={1.8} />,
  BarChart2:   <BarChart2   size={14} strokeWidth={1.8} />,
};

export default function RoundTableSection() {
  const [soundEnabled, setSoundEnabled]   = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent | { matches: boolean }) =>
      setReducedMotion(e.matches);
    handler(mq);
    mq.addEventListener("change", handler as (e: MediaQueryListEvent) => void);
    return () =>
      mq.removeEventListener("change", handler as (e: MediaQueryListEvent) => void);
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playChime(true);
  };

  return (
    <section
      id="round-table"
      className="relative w-full py-16 sm:py-20 lg:py-24 overflow-hidden border-y border-[#C9A227]/25"
      style={{
        background: "linear-gradient(180deg, #041009 0%, #06180E 50%, #030D07 100%)",
        color: "#F5EED0",
      }}
    >
      {/* ── Background Environmental Lighting & Fine Grid ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle radial emerald & gold lighting */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 85% 55% at 50% 15%, rgba(11,110,79,0.22) 0%, rgba(201,162,39,0.08) 50%, transparent 75%)",
          }}
        />

        {/* Fine dark green technical grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201, 162, 39, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201, 162, 39, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
          {/* Small Gold Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.28em] mb-4"
            style={{
              background: "rgba(201, 162, 39, 0.12)",
              color: "#C9A227",
              border: "1px solid rgba(201, 162, 39, 0.35)",
            }}
          >
            <Shield size={14} className="text-[#C9A227]" />
            <span>THE GREEN KNIGHTS</span>
          </div>

          {/* Large Heading */}
          <h2
            className="text-[36px] sm:text-[48px] lg:text-[60px] font-extrabold tracking-tight leading-[1.08] mb-4 text-[#F5EED0]"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            The{" "}
            <span
              style={{
                background: "linear-gradient(120deg, #C9A227 0%, #E5BE3B 50%, #C9A227 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Round Table
            </span>
          </h2>

          {/* Subtitle */}
          <p
            className="text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-relaxed max-w-2xl mx-auto text-[#F5EED0]/85 mb-5"
          >
            Where intelligence, technology, and transformation come together.
          </p>

          {/* Audio toggle & Full page link */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/round-table"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shadow-md hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                color: "#FFFFFF",
                border: "1px solid rgba(201, 162, 39, 0.4)",
              }}
            >
              <span>Explore Dedicated Round Table Page</span>
              <ArrowRight size={13} />
            </Link>

            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: soundEnabled
                  ? "rgba(11,110,79,0.25)"
                  : "rgba(255,255,255,0.06)",
                color: soundEnabled ? "#C9A227" : "#DDD",
                border: soundEnabled
                  ? "1px solid rgba(201,162,39,0.4)"
                  : "1px solid rgba(255,255,255,0.12)",
              }}
              aria-label={soundEnabled ? "Mute interaction sound" : "Enable interaction sound"}
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{soundEnabled ? "Audio: On" : "Audio: Off"}</span>
            </button>
          </div>
        </div>

        {/* ── BALANCED ORIGINAL ROUND TABLE ARTWORK (MAX-W 1000PX, 55-65% WIDTH) ── */}
        <div className="w-full max-w-[1000px] mx-auto mb-8 sm:mb-10 px-2 sm:px-4">
          <div
            className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden"
            style={{
              border: "1.5px solid rgba(201, 162, 39, 0.35)",
              boxShadow:
                "0 20px 80px rgba(0,0,0,0.8), 0 0 60px rgba(11,110,79,0.25), inset 0 0 50px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center justify-center w-full">
              <RoundTableScene reducedMotion={reducedMotion} large={true} />
            </div>
          </div>
        </div>

        {/* ── INSTRUCTION & EIGHT SERVICE PILLARS ── */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Instruction */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-10 sm:w-16" style={{ background: "rgba(201,162,39,0.3)" }} />
            <span
              className="text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#C9A227" }}
            >
              Explore the eight technology pillars
            </span>
            <div className="h-px w-10 sm:w-16" style={{ background: "rgba(201,162,39,0.3)" }} />
          </div>

          {/* 8 Clickable Service Badges / Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl">
            {roundTableServices.map((svc) => (
              <Link
                key={svc.id}
                href={svc.slug}
                className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all duration-200"
                style={{
                  background: "rgba(13, 31, 18, 0.92)",
                  border: "1px solid rgba(201, 162, 39, 0.22)",
                  color: "#F5EED0",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-2px)";
                  el.style.borderColor = "rgba(201,162,39,0.65)";
                  el.style.background = "#14301C";
                  el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.5), 0 0 16px rgba(201,162,39,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "rgba(201, 162, 39, 0.22)";
                  el.style.background = "rgba(13, 31, 18, 0.92)";
                  el.style.boxShadow = "0 4px 14px rgba(0,0,0,0.4)";
                }}
              >
                <span className="text-[#C9A227] transition-transform duration-200 group-hover:scale-110">
                  {ICON_MAP[svc.iconName]}
                </span>
                <span className="text-[12px] sm:text-[13px] font-bold tracking-tight">
                  {svc.name}
                </span>
                <span className="text-[#C9A227] text-xs font-bold opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
