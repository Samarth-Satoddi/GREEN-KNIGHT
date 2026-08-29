"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export function SectionWrapper({
  children,
  id,
  className = "",
  style,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}

export function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const dirMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: -30, y: 0 },
    right: { x: 30, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  center = true,
}: {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  center?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={`mb-10 sm:mb-16 ${center ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {badge && (
        <span
          className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-full text-[12px] sm:text-[14px] font-bold tracking-widest uppercase mb-4 sm:mb-5 shadow-xs"
          style={{
            background: "rgba(11,110,79,0.1)",
            color: "#0B6E4F",
            border: "1px solid rgba(11,110,79,0.25)",
          }}
        >
          <span
            className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
            style={{ background: "#0B6E4F" }}
          />
          {badge}
        </span>
      )}
      <h2
        className="text-[32px] sm:text-[40px] lg:text-[48px] font-extrabold leading-tight mb-4 sm:mb-5"
        style={{
          color: "var(--text)",
          fontFamily: "'Playfair Display', serif",
          letterSpacing: "-0.02em",
        }}
      >
        {title}{" "}
        {highlight && (
          <span
            style={{
              background: "linear-gradient(135deg, #0B6E4F, #C9A227)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {highlight}
          </span>
        )}
      </h2>
      {subtitle && (
        <p
          className={`text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.65] max-w-[760px] ${center ? "mx-auto" : ""}`}
          style={{ color: "var(--text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
