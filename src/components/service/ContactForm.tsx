"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck } from "lucide-react";

interface ContactFormProps {
  serviceTitle?: string;
}

export default function ContactForm({ serviceTitle }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "Healthcare",
    budget: "$25,000 - $50,000",
    service: serviceTitle || "AI Solutions",
    contactMethod: "Email",
    projectDescription: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1.125rem",
    borderRadius: "0.75rem",
    border: "1px solid var(--glass-border)",
    background: "var(--glass-bg)",
    color: "var(--text)",
    fontSize: "1.0625rem", /* 17px */
    lineHeight: "1.5",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div id="book-consultation" className="scroll-mt-24">
      <div
        className="rounded-3xl p-8 sm:p-12 relative overflow-hidden"
        style={{
          background: "var(--glass-bg)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 20px 50px rgba(11,110,79,0.08)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center mb-10">
          <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#0B6E4F]15 text-[#0B6E4F] inline-block mb-4 shadow-xs">
            Book Enterprise Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
            Schedule Your Strategic Architecture Session
          </h2>
          <p className="text-[16px] sm:text-[18px] mt-4 leading-[1.75] max-w-2xl mx-auto font-medium" style={{ color: "var(--text-muted)" }}>
            Connect directly with senior enterprise architects and technology advisors to discuss your project requirements, scope, and timeline.
          </p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 sm:p-10 rounded-2xl text-center max-w-lg mx-auto bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-lg"
          >
            <div className="w-16 h-16 rounded-full bg-[#0B6E4F] text-white flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-[#0B6E4F] mb-3">Consultation Request Received!</h3>
            <p className="text-[16px] leading-[1.75] mb-6" style={{ color: "var(--text-muted)" }}>
              Thank you, {formData.name}. A senior technical architect from Green Knights will review your project details and reach out via {formData.contactMethod.toLowerCase()} within 4 business hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-7 py-3.5 rounded-xl text-[16px] font-bold bg-[#0B6E4F] text-white hover:bg-[#145A32] transition-colors"
            >
              Submit Another Inquiry
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Full Name */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Vance"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Company / Organization *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex Global Logistics"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Corporate Email */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Corporate Email *
              </label>
              <input
                type="email"
                required
                placeholder="eleanor@apexlogistics.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Direct Phone Number *
              </label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 019-2834"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Industry */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Industry Sector
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Retail</option>
                <option>Education</option>
                <option>Government</option>
                <option>Manufacturing</option>
                <option>Logistics</option>
                <option>E-Commerce</option>
              </select>
            </div>

            {/* Estimated Budget */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Estimated Project Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option>$25,000 - $50,000</option>
                <option>$50,000 - $100,000</option>
                <option>$100,000 - $250,000</option>
                <option>$250,000+</option>
              </select>
            </div>

            {/* Service Selected */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Target Service Category
              </label>
              <input
                type="text"
                readOnly
                value={formData.service}
                style={{ ...inputStyle, cursor: "not-allowed", background: "rgba(11,110,79,0.06)", fontWeight: 700, color: "#0B6E4F" }}
              />
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Preferred Contact Method
              </label>
              <select
                value={formData.contactMethod}
                onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value })}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option>Email</option>
                <option>Phone Call</option>
                <option>WhatsApp / Video Link</option>
              </select>
            </div>

            {/* Project Description */}
            <div className="sm:col-span-2">
              <label className="block text-[15px] sm:text-[16px] font-semibold mb-2 text-gray-800 dark:text-slate-100">
                Project Overview &amp; Objectives *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe your business challenge, tech stack preferences, or desired launch timeframe..."
                value={formData.projectDescription}
                onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                style={{ ...inputStyle, resize: "vertical", minHeight: "130px" }}
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="btn-shine w-full py-4.5 rounded-xl font-bold text-white text-[16px] sm:text-[17px] shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
                }}
              >
                <Send size={19} />
                Submit Consultation Request
              </button>
              <p className="text-[13px] sm:text-[14px] text-center text-gray-600 mt-4 flex items-center justify-center gap-1.5 font-semibold">
                <ShieldCheck size={16} className="text-[#0B6E4F]" />
                Strict NDA Protected · Zero Spam Guarantee · 4-Hour Response SLA
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
