"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad)
    if (
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    // Smooth animation loop for the trailing green follower
    const loop = () => {
      // Lerp (linear interpolation) for smooth fluid motion
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);

    // Expand on interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("[role='button']") ||
          target.getAttribute("data-cursor-hover"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300 hidden md:block ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* 1. Small primary green dot right at the cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1.5 -mt-1.5 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10B981,0_0_20px_rgba(16,185,129,0.6)] will-change-transform pointer-events-none"
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />

      {/* 2. Trailing smooth green circle follower that moves together */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border will-change-transform pointer-events-none transition-[width,height,margin,background-color,border-color,box-shadow] duration-200 ease-out ${
          isHovered
            ? "-ml-5 -mt-5 w-10 h-10 border-emerald-400 bg-emerald-500/20 shadow-[0_0_25px_rgba(16,185,129,0.4)]"
            : isClicking
            ? "-ml-2.5 -mt-2.5 w-5 h-5 border-emerald-400 bg-emerald-400/30 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
            : "-ml-4 -mt-4 w-8 h-8 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(11,110,79,0.3)]"
        }`}
        style={{
          transform: "translate3d(-100px, -100px, 0)",
        }}
      />
    </div>
  );
}
