"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeader } from "./SectionWrapper";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: <Mail size={22} />,
    label: "Email",
    value: "hello@greenknights.tech",
    href: "mailto:hello@greenknights.tech",
  },
  {
    icon: <Phone size={22} />,
    label: "Phone",
    value: "+1 (555) GRN-TECH",
    href: "tel:+15554768324",
  },
  {
    icon: <MapPin size={22} />,
    label: "Address",
    value: "The Round Table, 1 Knight's Plaza, Innovation District",
    href: "#",
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    _gotcha: "",
  });
  const [mountTime] = useState(() => Date.now());
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          company: form.company,
          service: form.service,
          message: form.message,
          honeypot: form._gotcha,
          timestamp: mountTime,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", service: "", message: "", _gotcha: "" });
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1.125rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--glass-border)",
    background: "var(--glass-bg)",
    color: "var(--text)",
    fontSize: "1.0625rem",
    lineHeight: "1.5",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(11,110,79,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(201,162,39,0.04) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeader
          badge="Contact Us"
          title="Ready to Begin"
          highlight="Your Journey?"
          subtitle="Join hundreds of forward-thinking enterprises who have trusted Green Knights to transform their technology. Let's discuss what's possible."
        />

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-10"
              style={{
                background: "linear-gradient(135deg, #0B6E4F, #145A32)",
                boxShadow: "0 25px 60px rgba(11,110,79,0.3)",
              }}
            >
              <h3
                className="text-2xl font-extrabold text-white mb-3"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Get in Touch
              </h3>
              <p className="text-[15px] sm:text-[16px] text-white/85 leading-[1.7] mb-6 sm:mb-8">
                Our knights are ready to serve. Reach out and we&apos;ll respond within 24 hours.
              </p>

              <div className="flex flex-col gap-5 sm:gap-6">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="flex items-start gap-3.5 sm:gap-4 group"
                  >
                    <div
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: "rgba(201,162,39,0.2)",
                        color: "#C9A227",
                      }}
                    >
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[13px] sm:text-[14px] font-semibold text-white/60 mb-0.5">{info.label}</p>
                      <p className="text-[15px] sm:text-[17px] text-white font-medium group-hover:text-yellow-300 transition-colors break-words">
                        {info.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/12">
                <p className="text-[13px] sm:text-[14px] font-semibold text-white/60 mb-1.5">Business Hours</p>
                <p className="text-[15px] sm:text-[16px] text-white font-medium">Monday – Friday: 9:00 AM – 6:00 PM</p>
                <p className="text-[14px] sm:text-[15px] text-white/80">Emergency support: 24/7</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-6"
              style={{
                height: "180px",
                background:
                  "linear-gradient(135deg, rgba(11,110,79,0.08), rgba(201,162,39,0.06))",
                border: "1px solid rgba(11,110,79,0.18)",
              }}
            >
              <div className="text-center">
                <MapPin size={32} style={{ color: "#0B6E4F", margin: "0 auto 8px" }} />
                <p className="text-[16px] sm:text-[17px] font-bold" style={{ color: "#0B6E4F" }}>
                  Innovation District
                </p>
                <p className="text-[13px] sm:text-[14px] font-medium" style={{ color: "var(--text-muted)" }}>
                  Interactive Map Location
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div
              className="rounded-2xl sm:rounded-3xl p-6 sm:p-10"
              style={{
                background: "var(--glass-bg)",
                backdropFilter: "blur(20px)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 20px 50px rgba(11,110,79,0.08)",
              }}
            >
              <h3
                className="text-2xl sm:text-3xl font-extrabold mb-2"
                style={{
                  color: "var(--text)",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Send a Message
              </h3>
              <p className="text-[15px] sm:text-[17px] mb-6 leading-[1.7]" style={{ color: "var(--text-muted)" }}>
                Fill out the form below and a Green Knight will be in touch within 24 hours.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center text-center py-12 gap-4"
                >
                  <CheckCircle size={52} style={{ color: "#0B6E4F" }} />
                  <h4
                    className="text-xl sm:text-2xl font-bold"
                    style={{ color: "var(--text)" }}
                  >
                    Message Sent!
                  </h4>
                  <p className="text-[15px] sm:text-[17px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
                    Thank you for reaching out. Our team will contact you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 sm:gap-6">
                  {status === "error" && errorMessage && (
                    <div
                      className="p-4 rounded-xl text-[14.5px] font-medium"
                      style={{
                        background: "rgba(220, 38, 38, 0.08)",
                        border: "1px solid rgba(220, 38, 38, 0.25)",
                        color: "#DC2626",
                      }}
                    >
                      {errorMessage}
                    </div>
                  )}

                  {/* Honeypot field (hidden from genuine users) */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="_gotcha"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form._gotcha}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[14px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100"
                      >
                        Full Name *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#0B6E4F";
                          e.target.style.boxShadow = "0 0 0 3px rgba(11,110,79,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(11,110,79,0.22)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100"
                      >
                        Email Address *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#0B6E4F";
                          e.target.style.boxShadow = "0 0 0 3px rgba(11,110,79,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(11,110,79,0.22)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100"
                      >
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="Acme Corporation"
                        style={inputStyle}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#0B6E4F";
                          e.target.style.boxShadow = "0 0 0 3px rgba(11,110,79,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(11,110,79,0.22)";
                          e.target.style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100"
                      >
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "#0B6E4F";
                          e.target.style.boxShadow = "0 0 0 3px rgba(11,110,79,0.12)";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "rgba(11,110,79,0.22)";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="" className="dark:bg-slate-900 dark:text-slate-100">Select a service</option>
                        <option value="ai" className="dark:bg-slate-900 dark:text-slate-100">AI Solutions</option>
                        <option value="software" className="dark:bg-slate-900 dark:text-slate-100">Software Development</option>
                        <option value="cloud" className="dark:bg-slate-900 dark:text-slate-100">Cloud Solutions</option>
                        <option value="security" className="dark:bg-slate-900 dark:text-slate-100">Cybersecurity</option>
                        <option value="transformation" className="dark:bg-slate-900 dark:text-slate-100">Digital Transformation</option>
                        <option value="erp" className="dark:bg-slate-900 dark:text-slate-100">ERP Solutions</option>
                        <option value="consulting" className="dark:bg-slate-900 dark:text-slate-100">IT Consulting</option>
                        <option value="data" className="dark:bg-slate-900 dark:text-slate-100">Data Analytics</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project and how we can help..."
                      style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "#0B6E4F";
                        e.target.style.boxShadow = "0 0 0 3px rgba(11,110,79,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(11,110,79,0.22)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-center gap-2.5 w-full py-4 rounded-xl font-bold text-[16px] sm:text-[17px] text-white"
                    style={{
                      background:
                        status === "loading"
                          ? "rgba(11,110,79,0.6)"
                          : "linear-gradient(135deg, #0B6E4F, #145A32)",
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      boxShadow: "0 8px 25px rgba(11,110,79,0.3)",
                    }}
                    id="contact-submit"
                  >
                    {status === "loading" ? (
                      <>
                        <span
                          className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin"
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
