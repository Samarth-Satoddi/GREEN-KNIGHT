"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Round Table", href: "/round-table" },
  { label: "Why Us", href: "/#why-us" },
  { label: "Industries", href: "/#industries" },
  { label: "Our Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      requestAnimationFrame(() => setDarkMode(true));
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDark = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href === "/") {
      if (pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        router.push("/");
      }
      return;
    }
    if (href === "/about" || href === "/round-table" || href === "/services") {
      router.push(href);
      return;
    }

    if (href.startsWith("/#")) {
      const targetId = href.replace("/", "");
      if (pathname === "/") {
        const el = document.querySelector(targetId);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      } else {
        router.push(href);
      }
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? darkMode
              ? "rgba(10, 27, 19, 0.94)"
              : "rgba(255, 248, 220, 0.94)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? darkMode
              ? "1px solid rgba(16, 185, 129, 0.2)"
              : "1px solid rgba(11, 110, 79, 0.16)"
            : "none",
          boxShadow: scrolled
            ? darkMode
              ? "0 4px 30px rgba(0, 0, 0, 0.4)"
              : "0 4px 30px rgba(11, 110, 79, 0.08)"
            : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[88px]">
            {/* ── Logo + Brand name (Enlarged) ── */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group"
              aria-label="Green Knights Home"
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 350 }}
                className="relative w-13 h-13 sm:w-14 sm:h-14 flex-shrink-0"
              >
                <Image
                  src="/images/brand/gk-shield-vector.png"
                  alt="Green Knights Shield"
                  fill
                  sizes="56px"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="text-left">
                <p
                  className="font-black text-[16px] xs:text-[18px] sm:text-[22px] lg:text-[24px] leading-tight tracking-tight uppercase transition-colors"
                  style={{ color: darkMode ? "#34D399" : "#0B6E4F" }}
                >
                  Green Knights
                </p>
                <p
                  className="text-[10.5px] xs:text-[12px] sm:text-[14px] font-extrabold leading-tight tracking-[0.14em] sm:tracking-[0.22em] uppercase mt-0.5 transition-colors"
                  style={{ color: darkMode ? "#A7F3D0" : "#145A32", opacity: 0.95 }}
                >
                  of Tech &amp; AI
                </p>
              </div>
            </Link>

            {/* ── Desktop nav ── */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive =
                  (link.href === "/" && pathname === "/") ||
                  (link.href === "/about" && pathname === "/about") ||
                  (link.href === "/round-table" && pathname === "/round-table") ||
                  (link.href === "/services" && pathname === "/services");

                return (
                  <button
                    key={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="relative px-3 xl:px-4 py-2 text-[14px] xl:text-[15.5px] rounded-lg transition-all duration-150 whitespace-nowrap cursor-pointer hover:bg-emerald-500/10"
                    style={{
                      color: isActive
                        ? "#C9A227"
                        : darkMode
                        ? "#F8FAFC"
                        : "#111827",
                      background: isActive
                        ? "rgba(201, 162, 39, 0.12)"
                        : "transparent",
                      border: "none",
                      fontWeight: isActive ? 700 : 600,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = darkMode ? "#34D399" : "#0B6E4F";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = darkMode ? "#F8FAFC" : "#111827";
                      }
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-3 right-3 h-0.5 rounded-full"
                        style={{
                          background: "#C9A227",
                          boxShadow: "0 0 8px rgba(201,162,39,0.6)",
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ── Right side ── */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-full transition-all duration-200 hidden md:flex items-center justify-center hover:bg-emerald-500/10 cursor-pointer"
                style={{
                  color: darkMode ? "#FBBF24" : "#1F2937",
                  background: "transparent",
                  border: "none",
                }}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Book a Consultation CTA */}
              <motion.button
                onClick={() => handleNavClick("/#contact")}
                whileHover={{ scale: 1.05, y: -2, boxShadow: "0 8px 24px rgba(11,110,79,0.45)" }}
                whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-white px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                  letterSpacing: "0.01em",
                }}
                id="navbar-book-btn"
              >
                Book a Consultation
                <ArrowRight size={15} />
              </motion.button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl cursor-pointer"
                style={{
                  color: darkMode ? "#34D399" : "#0B6E4F",
                  background: darkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(11,110,79,0.1)",
                  border: "none",
                }}
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[88px] left-0 right-0 z-40 lg:hidden max-h-[calc(100vh-88px)] overflow-y-auto"
            style={{
              background: darkMode
                ? "rgba(10, 27, 19, 0.98)"
                : "rgba(255,248,220,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: darkMode
                ? "1px solid rgba(16, 185, 129, 0.2)"
                : "1px solid rgba(11,110,79,0.16)",
              boxShadow: darkMode
                ? "0 16px 40px rgba(0, 0, 0, 0.5)"
                : "0 16px 40px rgba(11,110,79,0.14)",
            }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col gap-1.5 pb-8">
              {navLinks.map((link, i) => {
                const isActive =
                  (link.href === "/" && pathname === "/") ||
                  (link.href === "/about" && pathname === "/about") ||
                  (link.href === "/round-table" && pathname === "/round-table") ||
                  (link.href === "/services" && pathname === "/services");

                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3.5 rounded-xl text-[16px] transition-all flex items-center justify-between cursor-pointer min-h-[48px]"
                    style={{
                      color: isActive
                        ? "#C9A227"
                        : darkMode
                        ? "#F8FAFC"
                        : "#111827",
                      background: isActive
                        ? "rgba(201, 162, 39, 0.12)"
                        : "transparent",
                      border: isActive
                        ? "1px solid rgba(201,162,39,0.3)"
                        : "none",
                      fontWeight: isActive ? 700 : 600,
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full" style={{ background: "#C9A227" }} />
                    )}
                  </motion.button>
                );
              })}
              <div
                className="flex flex-col sm:flex-row gap-2.5 mt-3 pt-3"
                style={{
                  borderTop: darkMode
                    ? "1px solid rgba(16, 185, 129, 0.2)"
                    : "1px solid rgba(11,110,79,0.12)",
                }}
              >
                <button
                  onClick={toggleDark}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-[15px] font-semibold flex-1 justify-center cursor-pointer min-h-[48px]"
                  style={{
                    background: darkMode ? "rgba(16, 185, 129, 0.15)" : "rgba(11,110,79,0.09)",
                    color: darkMode ? "#34D399" : "#0B6E4F",
                    border: "none",
                  }}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>
                <button
                  onClick={() => handleNavClick("/#contact")}
                  className="flex items-center gap-2 px-4 py-3.5 rounded-xl text-[16px] font-semibold flex-1 justify-center text-white cursor-pointer min-h-[48px] shadow-md"
                  style={{ background: "linear-gradient(135deg, #0B6E4F, #145A32)", border: "none" }}
                >
                  Book a Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
