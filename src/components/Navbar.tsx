"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      requestAnimationFrame(() => setDarkMode(true));
    }
    const handleScroll = () => setScrolled(window.scrollY > 15);
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
          background: scrolled ? "rgba(255, 248, 220, 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(11, 110, 79, 0.16)" : "none",
          boxShadow: scrolled ? "0 4px 30px rgba(11, 110, 79, 0.08)" : "none",
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-[84px]">

            {/* ── Logo + Brand name ── */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Green Knights Home"
            >
              <motion.div
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 350 }}
                className="relative w-11 h-11 flex-shrink-0"
              >
                <Image
                  src="/images/brand/gk-shield-vector.png"
                  alt="Green Knights Shield"
                  fill
                  sizes="44px"
                  className="object-contain"
                  priority
                />
              </motion.div>
              <div className="text-left hidden sm:block">
                <p
                  className="font-extrabold text-[16px] sm:text-[17px] leading-none tracking-wide uppercase"
                  style={{ color: "#0B6E4F" }}
                >
                  Green Knights
                </p>
                <p
                  className="text-[12px] font-bold leading-none tracking-widest uppercase mt-1"
                  style={{ color: "#145A32", opacity: 0.85 }}
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
                    className="relative px-3 xl:px-4 py-2 text-[14px] xl:text-[15.5px] font-semibold rounded-lg transition-all duration-150 group whitespace-nowrap"
                    style={{
                      color: isActive ? "#C9A227" : "#1A1A1A",
                      background: isActive ? "rgba(201,162,39,0.1)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: isActive ? 700 : 600,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "#0B6E4F";
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(11,110,79,0.08)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      }
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-4 right-4 h-0.5 rounded-full"
                        style={{ background: "#C9A227", boxShadow: "0 0 8px rgba(201,162,39,0.6)" }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* ── Right side ── */}
            <div className="flex items-center gap-3">
              {/* Dark mode */}
              <button
                onClick={toggleDark}
                className="p-2.5 rounded-full transition-all duration-200 hidden md:flex items-center justify-center"
                style={{
                  color: "#4B5563",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
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
                className="hidden md:flex items-center gap-2 text-[15px] sm:text-[16px] font-semibold text-white px-5 py-2.5 rounded-xl shadow-md"
                style={{
                  background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.01em",
                  transition: "box-shadow 0.25s, transform 0.25s",
                }}
                id="navbar-book-btn"
              >
                Book a Consultation
                <ArrowRight size={15} />
              </motion.button>

              {/* Mobile toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-3 min-w-[48px] min-h-[48px] flex items-center justify-center rounded-xl"
                style={{
                  color: "#0B6E4F",
                  background: "rgba(11,110,79,0.1)",
                  border: "none",
                  cursor: "pointer",
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
            className="fixed top-[84px] left-0 right-0 z-40 lg:hidden"
            style={{
              background: "rgba(255,248,220,0.98)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(11,110,79,0.16)",
              boxShadow: "0 16px 40px rgba(11,110,79,0.14)",
            }}
          >
            <div className="max-w-7xl mx-auto px-5 py-5 flex flex-col gap-1.5">
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
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3.5 rounded-xl text-[16px] font-semibold transition-all flex items-center justify-between"
                    style={{
                      color: isActive ? "#C9A227" : "#1A1A1A",
                      background: isActive ? "rgba(201,162,39,0.12)" : "transparent",
                      border: isActive ? "1px solid rgba(201,162,39,0.3)" : "none",
                      cursor: "pointer",
                      fontWeight: isActive ? 700 : 600,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(11,110,79,0.08)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#0B6E4F";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "#1A1A1A";
                      }
                    }}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full" style={{ background: "#C9A227" }} />
                    )}
                  </motion.button>
                );
              })}
              <div className="flex gap-2.5 mt-3 pt-3" style={{ borderTop: "1px solid rgba(11,110,79,0.12)" }}>
                <button
                  onClick={toggleDark}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-[15px] font-semibold flex-1 justify-center"
                  style={{ background: "rgba(11,110,79,0.09)", color: "#0B6E4F", border: "none", cursor: "pointer" }}
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  {darkMode ? "Light" : "Dark"} Mode
                </button>
                <button
                  onClick={() => handleNavClick("/#contact")}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl text-[16px] font-semibold flex-1 justify-center text-white"
                  style={{ background: "linear-gradient(135deg, #0B6E4F, #145A32)", border: "none", cursor: "pointer" }}
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
