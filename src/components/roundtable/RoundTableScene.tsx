"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Code2,
  Cloud,
  ShieldCheck,
  Zap,
  Cog,
  Lightbulb,
  BarChart2,
} from "lucide-react";
import { roundTableServices } from "@/data/roundTableServices";

// ── Icons for 8 Services ──────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ReactNode> = {
  Brain: <Brain size={12} strokeWidth={1.8} />,
  Code2: <Code2 size={12} strokeWidth={1.8} />,
  Cloud: <Cloud size={12} strokeWidth={1.8} />,
  ShieldCheck: <ShieldCheck size={12} strokeWidth={1.8} />,
  Zap: <Zap size={12} strokeWidth={1.8} />,
  Cog: <Cog size={12} strokeWidth={1.8} />,
  Lightbulb: <Lightbulb size={12} strokeWidth={1.8} />,
  BarChart2: <BarChart2 size={12} strokeWidth={1.8} />,
};

// ── Geometry & Rotation Constants ─────────────────────────────────────────────
const N = 8;
const DURATION_MS = 25_000; // 25 seconds per full 360° revolution

// Background aspect ratio 1448x1086 (4:3)
// Table center: 50% left, 52% top
const CENTER_X = 50; // %
const CENTER_Y = 52; // %

// Perspective Ellipse radii for hotspot orbit
const RADIUS_X = 20.5; // % of container width
const RADIUS_Y = 16.0; // % of container height

// Base starting angles for 8 service positions (starts at top = -90°)
const BASE_ANGLES = Array.from({ length: N }, (_, i) => (i * 360) / N - 90);

interface RoundTableSceneProps {
  reducedMotion?: boolean;
  large?: boolean;
}

export default function RoundTableScene({
  reducedMotion = false,
  large = false,
}: RoundTableSceneProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // rAF global rotation state (0° -> 360°)
  const angleRef = useRef(0);
  const lastTsRef = useRef(0);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  // DOM refs for direct position mutation (avoids React re-renders every frame)
  const hotspotRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const isPaused = reducedMotion;

  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  const updateHotspots = useCallback((currentRotation: number) => {
    hotspotRefs.current.forEach((el, i) => {
      if (!el) return;
      const baseAngle = BASE_ANGLES[i];
      const angleDeg = (currentRotation + baseAngle) % 360;
      const angleRad = (angleDeg * Math.PI) / 180;

      // Calculate perspective ellipse coordinates
      const x = RADIUS_X * Math.cos(angleRad);
      const y = RADIUS_Y * Math.sin(angleRad);

      const leftPct = CENTER_X + x;
      const topPct = CENTER_Y + y;

      el.style.left = `${leftPct}%`;
      el.style.top = `${topPct}%`;
    });
  }, []);

  // rAF loop update — updates hotspot X/Y coordinates along the perspective ellipse
  const tickRef = useRef<(ts: number) => void>(() => {});

  useEffect(() => {
    tickRef.current = (ts: number) => {
      if (!runningRef.current) return;
      if (!isDraggingRef.current && !hoveredId) {
        if (lastTsRef.current !== 0) {
          const delta = ts - lastTsRef.current;
          angleRef.current = (angleRef.current + (360 / DURATION_MS) * delta) % 360;
        }
        updateHotspots(angleRef.current);
      }
      lastTsRef.current = ts;

      rafRef.current = requestAnimationFrame(tickRef.current);
    };
  }, [hoveredId, updateHotspots]);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  const stop = useCallback(() => {
    runningRef.current = false;
    lastTsRef.current = 0;
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (isPaused) {
      stop();
    } else {
      start();
    }
    return stop;
  }, [isPaused, start, stop]);

  // Pointer drag event handlers for mouse & touch
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = angleRef.current;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    // 1px drag = ~0.35 degrees of rotation
    angleRef.current = (startAngleRef.current + deltaX * 0.35 + 360) % 360;
    updateHotspots(angleRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    }
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={
        large
          ? "round-table-scene relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[60vw] max-w-[1000px] mx-auto select-none overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-[#C9A227]/40 shadow-[0_20px_60px_rgba(0,0,0,0.65)] transition-all duration-300 cursor-grab active:cursor-grabbing"
          : "round-table-scene relative w-[95%] sm:w-[90%] md:w-[80%] lg:w-[58vw] max-w-[860px] mx-auto select-none overflow-hidden rounded-2xl sm:rounded-3xl border border-[#0B6E4F]/20 shadow-2xl transition-all duration-300 cursor-grab active:cursor-grabbing"
      }
      style={{ aspectRatio: "4 / 3" }}
    >
      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 1 — 100% STATIC BACKGROUND IMAGE
        ══════════════════════════════════════════════════════════════════════ */}
      <div className="static-background absolute inset-0 pointer-events-none">
        <Image
          src="/images/brand/roundtable-background.png"
          alt="Green Knights Round Table Environment — 8 Digital Knights"
          fill
          priority
          sizes="(max-width: 768px) 95vw, (max-width: 1024px) 80vw, 1000px"
          className="object-contain"
        />
      </div>

      {/* Torch pulse ambient glow overlays */}
      <div className="absolute inset-0 pointer-events-none z-5">
        <div
          className="absolute rounded-full"
          style={{
            width: large ? 120 : 80,
            height: large ? 120 : 80,
            left: "7%",
            top: "14%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, rgba(255,160,0,0.55) 0%, transparent 70%)",
            filter: "blur(14px)",
            animation: "torchPulse 2.4s ease-in-out infinite",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: large ? 120 : 80,
            height: large ? 120 : 80,
            right: "7%",
            top: "14%",
            transform: "translate(50%, -50%)",
            background: "radial-gradient(circle, rgba(255,160,0,0.55) 0%, transparent 70%)",
            filter: "blur(14px)",
            animation: "torchPulse 2.4s ease-in-out infinite 1.2s",
          }}
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 2 — 8 ORBITING SERVICE HOTSPOTS
        ══════════════════════════════════════════════════════════════════════ */}
      <div className="service-carousel-layer absolute inset-0 z-20 pointer-events-none">
        {roundTableServices.map((svc, i) => {
          const isHovered = hoveredId === svc.id;

          const baseAngle = BASE_ANGLES[i];
          const angleRad = (baseAngle * Math.PI) / 180;
          const initialX = CENTER_X + RADIUS_X * Math.cos(angleRad);
          const initialY = CENTER_Y + RADIUS_Y * Math.sin(angleRad);

          return (
            <Link
              key={svc.id}
              href={svc.slug}
              ref={(el) => {
                hotspotRefs.current[i] = el;
              }}
              className={
                large
                  ? "absolute group flex flex-col items-center justify-center gap-1 rounded-xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] transition-all duration-300 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-2.5 min-w-[85px] sm:min-w-[105px] md:min-w-[125px] pointer-events-auto shadow-2xl"
                  : "absolute group flex flex-col items-center justify-center gap-0.5 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] transition-all duration-300 backdrop-blur-md px-2 py-1 min-w-[62px] sm:min-w-[68px] pointer-events-auto"
              }
              style={{
                left: `${initialX}%`,
                top: `${initialY}%`,
                transform: "translate(-50%, -50%)",
                willChange: "left, top",
                background: isHovered
                  ? "rgba(6, 25, 16, 0.96)"
                  : "rgba(5, 20, 13, 0.86)",
                border: isHovered
                  ? "2px solid #C9A227"
                  : "1px solid rgba(201,162,39,0.5)",
                boxShadow: isHovered
                  ? "0 0 24px rgba(201,162,39,0.85), 0 0 14px rgba(11,110,79,0.9)"
                  : "0 4px 12px rgba(0,0,0,0.6)",
              }}
              onMouseEnter={() => setHoveredId(svc.id)}
              onMouseLeave={() => setHoveredId(null)}
              aria-label={`Explore ${svc.name}`}
            >
              {/* Icon */}
              <div className="flex items-center justify-center">
                <span
                  style={{
                    color: isHovered ? "#C9A227" : "#FFF8DC",
                  }}
                  className="transition-colors duration-200"
                >
                  {ICON_MAP[svc.iconName]}
                </span>
              </div>

              {/* Service Name */}
              <span
                className={
                  large
                    ? "font-extrabold text-[9.5px] sm:text-[11.5px] md:text-[12.5px] text-center leading-tight tracking-tight transition-colors duration-200"
                    : "font-semibold text-[8px] sm:text-[9px] text-center leading-tight tracking-tight transition-colors duration-200"
                }
                style={{
                  color: isHovered ? "#FFF8DC" : "rgba(255,248,220,0.95)",
                  maxWidth: large ? "110px" : "68px",
                }}
              >
                {svc.name}
              </span>

              {/* Tooltip description card on hover when large */}
              {large && isHovered && (
                <div
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 sm:w-56 p-2.5 rounded-xl pointer-events-none z-50 text-left shadow-2xl border border-[#C9A227]/60"
                  style={{
                    background: "rgba(4, 16, 10, 0.95)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <p className="text-[11px] sm:text-[12px] font-bold text-[#C9A227] uppercase tracking-wider mb-0.5">
                    Pillar {svc.number} • {svc.shortName}
                  </p>
                  <p className="text-[10.5px] sm:text-[11.5px] font-normal text-white/90 leading-tight">
                    {svc.description}
                  </p>
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          LAYER 3 — FIXED CENTER EMBLEM
        ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="fixed-center-shield absolute z-30 pointer-events-none"
        style={{
          left: `${CENTER_X}%`,
          top: `${CENTER_Y}%`,
          width: large ? "13.5%" : "12%",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Breathing glow animation */}
        <div
          className="absolute -inset-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(11,110,79,0.75) 0%, rgba(201,162,39,0.35) 55%, transparent 80%)",
            filter: "blur(12px)",
            animation: "shieldBreath 3s ease-in-out infinite",
          }}
        />
        {/* Gold accent ring around emblem */}
        <div
          className="absolute -inset-1 rounded-full pointer-events-none"
          style={{
            border: "1.5px solid rgba(201,162,39,0.6)",
          }}
        />
        {/* Transparent Shield PNG */}
        <div className="relative w-full h-full drop-shadow-[0_0_20px_rgba(11,110,79,0.95)]">
          <Image
            src="/images/brand/gk-shield-transparent.png"
            alt="Green Knights Official Shield"
            fill
            sizes="(max-width: 768px) 80px, 135px"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
