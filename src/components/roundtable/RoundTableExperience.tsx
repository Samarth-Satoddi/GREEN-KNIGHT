"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Shield, ArrowRight } from "lucide-react";
import { playChime } from "@/lib/audio";
import dynamic from "next/dynamic";

const RoundTableScene = dynamic(() => import("./RoundTableScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full" style={{ aspectRatio: "16 / 9", maxHeight: "680px", background: "#060F09" }} />
  ),
});
import RoundTableMobile from "./RoundTableMobile";

interface RoundTableExperienceProps {
  embedded?: boolean;
  large?: boolean;
}

export default function RoundTableExperience({ embedded = false, large = false }: RoundTableExperienceProps) {
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

  const content = (
    <div className={embedded ? "w-full relative z-10" : "max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>
      {/* ── Standalone Section Header (only shown if not embedded in Hero) ── */}
      {!embedded && (
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3"
            style={{
              background: "rgba(11,110,79,0.10)",
              color:      "#0B6E4F",
              border:     "1px solid rgba(11,110,79,0.2)",
            }}
          >
            <Shield size={13} className="text-[#C9A227]" />
            <span>The Green Round Table</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3"
            style={{
              color:      "#0A251B",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Digital Knights of Innovation &amp; Strategy
          </h2>

          <p
            className="max-w-2xl text-sm sm:text-base leading-relaxed mb-3"
            style={{ color: "#2D4A3E" }}
          >
            Click any service hotspot orbiting the table to explore that technology capability.
          </p>

          <div className="flex items-center justify-center gap-3 mt-2 flex-wrap">
            <Link
              href="/round-table"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 shadow-sm hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                color: "#FFFFFF",
              }}
            >
              <span>Explore Dedicated Round Table Page</span>
              <ArrowRight size={13} />
            </Link>

            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
              style={{
                background: soundEnabled
                  ? "rgba(11,110,79,0.15)"
                  : "rgba(0,0,0,0.05)",
                color:  soundEnabled ? "#0B6E4F" : "#666",
                border: soundEnabled
                  ? "1px solid rgba(11,110,79,0.3)"
                  : "1px solid rgba(0,0,0,0.1)",
              }}
              aria-label={
                soundEnabled ? "Mute interaction sound" : "Enable interaction sound"
              }
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
              <span>{soundEnabled ? "Audio: On" : "Audio: Off"}</span>
            </button>
          </div>
        </div>
      )}

      {/* Audio Toggle (compact for embedded view) */}
      {embedded && (
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={toggleSound}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: soundEnabled ? "rgba(11,110,79,0.15)" : "rgba(0,0,0,0.05)",
              color: soundEnabled ? "#0B6E4F" : "#666",
              border: soundEnabled ? "1px solid rgba(11,110,79,0.3)" : "1px solid rgba(0,0,0,0.1)",
            }}
            aria-label={soundEnabled ? "Mute interaction sound" : "Enable interaction sound"}
          >
            {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span>{soundEnabled ? "Audio: On" : "Audio: Off"}</span>
          </button>
        </div>
      )}

      {/* ── Round Table Scene (always shown when large=true, or desktop on embedded) ── */}
      <div className={large ? "flex items-center justify-center w-full" : "hidden lg:flex items-center justify-center w-full"}>
        <RoundTableScene reducedMotion={reducedMotion} large={large} />
      </div>

      {/* ── Mobile capability selector (only when not in large cinematic mode) ── */}
      {!large && (
        <div className="block lg:hidden">
          <RoundTableMobile />
        </div>
      )}
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section
      id="round-table"
      className="py-12 sm:py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #FBF8EE 0%, #F5F0DA 45%, #EDE6CE 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(11,110,79,0.06) 0%, transparent 80%)",
        }}
      />
      {content}
    </section>
  );
}
