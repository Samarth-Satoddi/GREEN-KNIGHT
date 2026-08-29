"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Mail, Phone, MapPin, ShieldCheck } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Round Table", href: "/round-table" },
  { label: "Why Choose Us", href: "/#why-us" },
  { label: "Industries", href: "/#industries" },
  { label: "Our Process", href: "/#process" },
  { label: "Contact Us", href: "/#contact" },
];

const serviceLinks = [
  { label: "AI Solutions", href: "/services/ai-solutions" },
  { label: "Software Development", href: "/services/software-development" },
  { label: "Cloud Solutions", href: "/services/cloud-solutions" },
  { label: "Cybersecurity", href: "/services/cybersecurity" },
  { label: "Digital Transformation", href: "/services/digital-transformation" },
  { label: "ERP Solutions", href: "/services/erp-solutions" },
  { label: "IT Consulting", href: "/services/it-consulting" },
  { label: "Data Analytics", href: "/services/data-analytics" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative text-white overflow-hidden border-t border-[#C9A227]30"
      style={{
        background:
          "linear-gradient(180deg, #07190f 0%, #041009 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-12 sm:pt-16 pb-8 sm:pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/brand/gk-shield-vector.png"
                  alt="Green Knights Shield"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-extrabold text-[17px] sm:text-[18px] tracking-wide text-white uppercase">
                  Green Knights
                </p>
                <p className="text-[12px] font-bold tracking-widest text-[#C9A227] uppercase mt-0.5">
                  of Tech &amp; AI
                </p>
              </div>
            </Link>

            <p className="text-[15px] sm:text-[16px] text-white/85 leading-[1.75] max-w-sm font-normal">
              Empowering enterprises with intelligent AI solutions, cloud engineering, cybersecurity, and transformational technology services. Your trusted digital partner.
            </p>

            <div className="flex items-center gap-3 text-[14px] text-white/90 font-semibold">
              <ShieldCheck size={18} className="text-[#C9A227]" />
              <span>Enterprise Ready &amp; ISO Compliant</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-extrabold text-[16px] sm:text-[18px] text-[#C9A227] uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] sm:text-[16px] font-semibold text-white/85 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services links */}
          <div>
            <h3 className="font-extrabold text-[16px] sm:text-[18px] text-[#C9A227] uppercase tracking-wider mb-5">
              Our Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[15px] sm:text-[16px] font-semibold text-white/85 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-extrabold text-[16px] sm:text-[18px] text-[#C9A227] uppercase tracking-wider mb-5">
              Contact
            </h3>
            <ul className="space-y-4 text-[15px] sm:text-[16px] text-white/85 font-medium">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#C9A227] flex-shrink-0 mt-1" />
                <a href="mailto:hello@greenknights.tech" className="hover:text-white transition-colors">
                  hello@greenknights.tech
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#C9A227] flex-shrink-0 mt-1" />
                <a href="tel:+15554768324" className="hover:text-white transition-colors">
                  +1 (555) GRN-TECH
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#C9A227] flex-shrink-0 mt-1" />
                <span>The Round Table, 1 Knight&apos;s Plaza, Innovation District</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13.5px] sm:text-[14px] text-white/70 font-medium">
            © {new Date().getFullYear()} Green Knights of Tech &amp; AI. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[14px] font-bold text-[#C9A227] hover:text-yellow-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
