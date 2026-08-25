"use client";

import {
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import Image from "next/image";
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
import { KnightService, roundTableServices } from "@/data/roundTableServices";

// ─── Constants ───────────────────────────────────────────────────────────────
const DURATION_MS = 25_000; // 25 s per revolution
const N = 8;
const BASE_ANGLES = Array.from(
  { length: N },
  (_, i) => (i * 360) / N - 90 // 01 starts at top (−90°)
);

// Hotspot badge size
const BADGE = 68; // px

// Icon map
const ICONS: Record<string, React.ReactNode> = {
  Brain: <Brain size={16} strokeWidth={1.5} />,
  Code2: <Code2 size={16} strokeWidth={1.5} />,
  Cloud: <Cloud size={16} strokeWidth={1.5} />,
  ShieldCheck: <ShieldCheck size={16} strokeWidth={1.5} />,
  Zap: <Zap size={16} strokeWidth={1.5} />,
  Cog: <Cog size={16} strokeWidth={1.5} />,
  Lightbulb: <Lightbulb size={16} strokeWidth={1.5} />,
  BarChart2: <BarChart2 size={16} strokeWidth={1.5} />,
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface RoundTableInteractiveProps {
  selectedService: KnightService | null;
  onSelect: (service: KnightService) => void;
  reducedMotion: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function RoundTableInteractive({
  selectedService,
  onSelect,
  reducedMotion,
}: RoundTableInteractiveProps) {
  // Hover state tracked locally (doesn't need to lift)
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Rotation state — driven by rAF
  const angleRef = useRef(0);
  const lastTsRef = useRef(0);
  const rafRef = useRef(0);
  const runningRef = useRef(false);

  // DOM refs for direct mutation (avoids React re-renders on every frame)
  const ringRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectorRefs = useRef<(SVGPathElement | null)[]>([]);

  // Paused when: hovering, something selected, or reduced-motion
  const isPaused = Boolean(hoveredId) || Boolean(selectedService) || reducedMotion;

  // ── rAF tick ──────────────────────────────────────────────────────────────
  const tickRef = useRef<(ts: number) => void>(() => {});

  useEffect(() => {
    tickRef.current = (ts: number) => {
      if (!runningRef.current) return;

      if (lastTsRef.current !== 0) {
        const delta = ts - lastTsRef.current;
        angleRef.current = (angleRef.current + (360 / DURATION_MS) * delta) % 360;
      }
      lastTsRef.current = ts;

      const a = angleRef.current;

      // Rotate the ring container
      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${a}deg)`;
      }

      // Counter-rotate each badge content so text stays upright
      contentRefs.current.forEach((el) => {
        if (el) el.style.transform = `rotate(${-a}deg)`;
      });

      rafRef.current = requestAnimationFrame(tickRef.current);
    };
  }); // run every render to close over latest refs

  const startRotation = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastTsRef.current = 0;
    rafRef.current = requestAnimationFrame(tickRef.current);
  }, []);

  const stopRotation = useCallback(() => {
    runningRef.current = false;
    lastTsRef.current = 0;
    cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    if (isPaused) {
      stopRotation();
    } else {
      startRotation();
    }
    return stopRotation;
  }, [isPaused, startRotation, stopRotation]);

  // ── Interaction handlers ──────────────────────────────────────────────────
  const handleHoverEnter = useCallback((id: string) => {
    setHoveredId(id);
  }, []);

  const handleHoverLeave = useCallback(() => {
    setHoveredId(null);
  }, []);

  const handleSelect = useCallback(
    (service: KnightService) => {
      onSelect(service);
    },
    [onSelect]
  );

  // ── SVG sector path builder ───────────────────────────────────────────────
  // The table circle in the image:
  //  center: 50% × 50.5% of image dimensions
  //  orbit radius for hotspots: 33% of container width
  //  SVG viewport matches container 1:1
  // We draw sectors in the SVG coordinate space as percentages → will be
  // set as a viewBox matching container size, so percentages via attributes

  function buildSectorPath(
    cx: number,
    cy: number,
    inner: number,
    outer: number,
    startAngle: number,
    endAngle: number
  ) {
    const toRad = (d: number) => (d * Math.PI) / 180;
    const sa = toRad(startAngle);
    const ea = toRad(endAngle);

    const x1o = cx + outer * Math.cos(sa);
    const y1o = cy + outer * Math.sin(sa);
    const x2o = cx + outer * Math.cos(ea);
    const y2o = cy + outer * Math.sin(ea);

    const x1i = cx + inner * Math.cos(ea);
    const y1i = cy + inner * Math.sin(ea);
    const x2i = cx + inner * Math.cos(sa);
    const y2i = cy + inner * Math.sin(sa);

    return [
      `M ${x1o} ${y1o}`,
      `A ${outer} ${outer} 0 0 1 ${x2o} ${y2o}`,
      `L ${x1i} ${y1i}`,
      `A ${inner} ${inner} 0 0 0 ${x2i} ${y2i}`,
      "Z",
    ].join(" ");
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className="relative w-full select-none"
      style={{ aspectRatio: "1 / 1" }}
    >
      {/* ── Background Image (static) ────────────────────────────────────── */}
      <Image
        src="/images/brand/gk-interactive-round-table.png.png"
        alt="Green Knights Round Table — 8 Digital Knights of Innovation"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
      />

      {/* ── SVG sector highlight overlay ─────────────────────────────────── */}
      {/* Positioned exactly over the table disk in the image.
          Table center in image: ~50% H, ~50.5% V
          Inner radius (shield ring): ~17% of container
          Outer radius (table rim):  ~46% of container
          We use a 1000×1000 viewBox for easy percentage math. */}
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      >
        {roundTableServices.map((svc, i) => {
          const isSelected = selectedService?.id === svc.id;
          const isHovered = hoveredId === svc.id;

          const sliceAngle = 360 / N;
          const startAngle = BASE_ANGLES[i] - sliceAngle / 2 - 90;
          const endAngle = startAngle + sliceAngle;

          const opacity = isSelected ? 0.16 : isHovered ? 0.10 : 0.03;
          const strokeOpacity = isSelected ? 0.55 : isHovered ? 0.4 : 0.2;

          const path = buildSectorPath(500, 505, 170, 460, startAngle, endAngle);

          return (
            <path
              key={svc.id}
              ref={(el) => { sectorRefs.current[i] = el; }}
              d={path}
              fill={isSelected ? "#C9A227" : "#0B6E4F"}
              fillOpacity={opacity}
              stroke="#C9A227"
              strokeOpacity={strokeOpacity}
              strokeWidth="1.5"
              style={{ transition: "fill-opacity 0.3s, stroke-opacity 0.3s" }}
            />
          );
        })}

        {/* Thin gold perimeter ring */}
        <circle
          cx={500}
          cy={505}
          r={462}
          fill="none"
          stroke="#C9A227"
          strokeOpacity={0.3}
          strokeWidth="2"
          strokeDasharray="8 14"
        />
      </svg>

      {/* ── Rotating service ring ─────────────────────────────────────────── */}
      {/* This div rotates. It is centered exactly on the table center in image.
          Table center: 50% H, 50.5% V
          The ring itself is sized to fill the container so percentage positioning
          of hotspots works relative to the whole image. */}
      <div
        ref={ringRef}
        className="absolute inset-0"
        style={{
          transformOrigin: "50% 50.5%",
          willChange: "transform",
        }}
      >
        {roundTableServices.map((svc, i) => {
          const isSelected = selectedService?.id === svc.id;
          const isHovered = hoveredId === svc.id;
          const active = isSelected || isHovered;
          const dimmed = Boolean(selectedService) && !active;

          // Place hotspot along orbit radius from table center
          // Table center: (50%, 50.5%), orbit radius: 33% of container width
          // Using trigonometry from base angle
          const angleDeg = BASE_ANGLES[i];
          const angleRad = (angleDeg * Math.PI) / 180;
          const ORBIT = 33; // % of container width

          // Position of hotspot center (as % from top-left corner)
          const hx = 50 + ORBIT * Math.cos(angleRad);
          const hy = 50.5 + ORBIT * Math.sin(angleRad);

          return (
            <div
              key={svc.id}
              className="absolute"
              style={{
                left: `${hx}%`,
                top: `${hy}%`,
                width: BADGE,
                height: BADGE,
                marginLeft: -BADGE / 2,
                marginTop: -BADGE / 2,
                transformOrigin: "center center",
                willChange: "transform",
              }}
            >
              {/* Counter-rotating content wrapper — keeps badge text upright */}
              <div
                ref={(el) => { contentRefs.current[i] = el; }}
                style={{
                  width: "100%",
                  height: "100%",
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              >
                <button
                  type="button"
                  onMouseEnter={() => handleHoverEnter(svc.id)}
                  onMouseLeave={handleHoverLeave}
                  onFocus={() => handleHoverEnter(svc.id)}
                  onBlur={handleHoverLeave}
                  onClick={() => handleSelect(svc)}
                  aria-label={`${svc.number} ${svc.name}`}
                  aria-pressed={isSelected}
                  className="w-full h-full rounded-full flex flex-col items-center justify-center gap-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 transition-all duration-300"
                  style={{
                    background: isSelected
                      ? "linear-gradient(145deg, #0a3d2a 0%, #06251a 100%)"
                      : active
                      ? "rgba(7, 30, 18, 0.92)"
                      : "rgba(5, 22, 13, 0.85)",
                    border: isSelected
                      ? "2px solid #C9A227"
                      : active
                      ? "1.5px solid rgba(201,162,39,0.95)"
                      : "1.5px solid rgba(201,162,39,0.45)",
                    boxShadow: isSelected
                      ? "0 0 22px rgba(201,162,39,0.75), 0 0 10px rgba(11,110,79,0.8), inset 0 1px 0 rgba(201,162,39,0.2)"
                      : active
                      ? "0 0 16px rgba(11,110,79,0.65), 0 0 8px rgba(201,162,39,0.45)"
                      : "0 2px 10px rgba(0,0,0,0.6)",
                    opacity: dimmed ? 0.55 : 1,
                  }}
                >
                  {/* Number */}
                  <span
                    style={{
                      fontSize: "9px",
                      fontWeight: 800,
                      letterSpacing: "0.1em",
                      color: isSelected ? "#C9A227" : "rgba(201,162,39,0.85)",
                      lineHeight: 1,
                    }}
                  >
                    {svc.number}
                  </span>

                  {/* Icon */}
                  <span
                    style={{
                      color: active ? "#FFF8DC" : "rgba(255,248,220,0.72)",
                      lineHeight: 1,
                    }}
                  >
                    {ICONS[svc.iconName] ?? <Brain size={16} />}
                  </span>

                  {/* Short label */}
                  <span
                    style={{
                      fontSize: "7px",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      color: isSelected ? "#FFF8DC" : "rgba(255,248,220,0.65)",
                      lineHeight: 1,
                      maxWidth: 58,
                      textAlign: "center",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {svc.shortName}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Shield — FIXED center, never rotates ─────────────────────────── */}
      {/* 
        The table's center shield in the image is at ~50% H, ~50.5% V.
        We overlay our interactive shield on top.
        Size: ~12% of container width.
      */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "50.5%",
          transform: "translate(-50%, -50%)",
          width: "12%",
          height: "12%",
        }}
      >
        {/* Breathing glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(11,110,79,0.6) 0%, rgba(201,162,39,0.25) 55%, transparent 80%)",
            filter: "blur(8px)",
            animation: "shieldBreath 3s ease-in-out infinite",
          }}
        />
        {/* Shield image */}
        <div className="relative w-full h-full">
          <Image
            src="/images/brand/gk-shield-premium.png"
            alt="Green Knights Shield"
            fill
            sizes="(max-width: 768px) 80px, 120px"
            className="object-contain drop-shadow-[0_0_14px_rgba(11,110,79,0.9)]"
          />
        </div>
      </div>

      {/* Status text (bottom of image) */}
      <div
        className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none"
        style={{ zIndex: 20 }}
      >
        <span
          className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider"
          style={{
            background: "rgba(5,18,11,0.75)",
            color: "rgba(201,162,39,0.9)",
            border: "1px solid rgba(201,162,39,0.25)",
            backdropFilter: "blur(6px)",
          }}
        >
          {selectedService
            ? `⚔ ${selectedService.name}`
            : hoveredId
            ? "⚔ Hover to explore"
            : reducedMotion
            ? "⚔ Click a knight to explore"
            : "⟳ Rotating — hover or click to explore"}
        </span>
      </div>
    </div>
  );
}
