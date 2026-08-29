import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getTechnologyData,
  allTechSlugs,
} from "@/data/technologies";
import { GetTechIcon } from "@/lib/technologyIcons";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Home,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  Briefcase,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allTechSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tech = getTechnologyData(slug);

  if (!tech) {
    return { title: "Technology Not Found | Green Knights" };
  }

  return {
    title: `${tech.name} Enterprise Architecture | Green Knights of Tech & AI`,
    description: tech.shortIntro,
    openGraph: {
      title: `${tech.name} Solutions & Services | Green Knights`,
      description: tech.shortIntro,
      type: "article",
    },
  };
}

export default async function TechnologyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tech = getTechnologyData(slug);

  if (!tech) {
    notFound();
  }

  // Find previous and next tech for pagination navigation
  const currentIndex = allTechSlugs.indexOf(slug);
  const prevSlug =
    allTechSlugs[(currentIndex - 1 + allTechSlugs.length) % allTechSlugs.length];
  const nextSlug = allTechSlugs[(currentIndex + 1) % allTechSlugs.length];
  const prevTech = getTechnologyData(prevSlug);
  const nextTech = getTechnologyData(nextSlug);

  // Structured Data JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${tech.name} Enterprise Technology Overview`,
    description: tech.shortIntro,
    publisher: {
      "@type": "Organization",
      name: "Green Knights of Tech & AI",
      url: "https://greenknights.ai",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main
        className="min-h-screen pt-28 pb-20"
        style={{
          background: "linear-gradient(180deg, rgba(11,110,79,0.04) 0%, var(--cream) 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ── Breadcrumb Navigation ── */}
          <nav className="flex items-center gap-2 text-[13px] sm:text-[14px] font-semibold text-gray-600 mb-8 overflow-x-auto">
            <Link href="/" className="hover:text-[#0B6E4F] flex items-center gap-1.5">
              <Home size={15} />
              Home
            </Link>
            <ChevronRight size={13} />
            <Link href="/#tech-stack" className="hover:text-[#0B6E4F]">
              Technologies
            </Link>
            <ChevronRight size={13} />
            <span className="text-[#0B6E4F] font-bold">{tech.name}</span>
          </nav>

          {/* ── 1. Hero Section ── */}
          {/* ── 1. Hero Section ── */}
          <div
            className="p-5 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(11,110,79,0.08) 0%, rgba(201,162,39,0.08) 100%)",
              border: "1px solid rgba(11,110,79,0.2)",
              boxShadow: "0 20px 50px rgba(11,110,79,0.06)",
            }}
          >
            <div className="flex items-center gap-3.5 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-white/90 shadow-md flex items-center justify-center flex-shrink-0">
                <GetTechIcon name={tech.name} size={32} />
              </div>
              <div className="min-w-0">
                <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-wider px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#0B6E4F]15 text-[#0B6E4F] inline-block mb-1">
                  {tech.category}
                </span>
                <h1
                  className="text-2xl xs:text-3xl sm:text-4xl lg:text-[50px] font-extrabold truncate"
                  style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}
                >
                  {tech.name}
                </h1>
              </div>
            </div>
            <p className="text-[15px] sm:text-[18px] leading-[1.7] text-gray-700 dark:text-slate-200 max-w-[750px] mt-3 sm:mt-4 font-medium">
              {tech.shortIntro}
            </p>
          </div>

          {/* ── 2. Overview Section ── */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-5" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
              Technology Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-5 sm:p-7 rounded-2xl bg-white/80 dark:bg-emerald-950/40 border border-black/5 dark:border-emerald-800/30 shadow-xs">
                <h3 className="text-[14px] sm:text-[15px] font-extrabold uppercase text-[#0B6E4F] dark:text-emerald-400 tracking-wider mb-2 sm:mb-2.5 flex items-center gap-2">
                  <Layers size={18} />
                  What is {tech.name}?
                </h3>
                <p className="text-[14.5px] sm:text-[16px] leading-[1.7] text-gray-700 dark:text-slate-300">
                  {tech.overview.description}
                </p>
              </div>

              <div className="p-5 sm:p-7 rounded-2xl bg-white/80 dark:bg-emerald-950/40 border border-black/5 dark:border-emerald-800/30 shadow-xs">
                <h3 className="text-[14px] sm:text-[15px] font-extrabold uppercase text-[#C9A227] tracking-wider mb-2 sm:mb-2.5 flex items-center gap-2">
                  <Zap size={18} />
                  Enterprise Importance
                </h3>
                <p className="text-[14.5px] sm:text-[16px] leading-[1.7] text-gray-700 dark:text-slate-300">
                  {tech.overview.importance}
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 p-5 sm:p-7 rounded-2xl bg-white/80 dark:bg-emerald-950/40 border border-black/5 dark:border-emerald-800/30 shadow-xs">
              <h3 className="text-[14px] sm:text-[15px] font-extrabold uppercase text-gray-800 dark:text-slate-200 tracking-wider mb-3 sm:mb-4">
                Key Enterprise Use Cases
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {tech.overview.enterpriseUseCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[14px] sm:text-[15px] font-semibold text-gray-800 dark:text-slate-200">
                    <CheckCircle2 size={16} className="text-[#0B6E4F] dark:text-emerald-400 flex-shrink-0" />
                    <span>{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 3. Why Green Knights Uses It ── */}
          <section className="mb-10 sm:mb-12 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#0a1f15] text-white border border-[#C9A227]35">
            <span className="text-[12px] sm:text-[13px] font-bold uppercase tracking-widest text-[#C9A227] inline-block mb-1.5 sm:mb-2">
              Architecture &amp; Strategy
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold mb-3 sm:mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Why Green Knights Leverages {tech.name}
            </h2>
            <p className="text-[14.5px] sm:text-[17px] leading-[1.7] text-white/85 max-w-[750px]">
              {tech.whyGreenKnightsUsesIt}
            </p>
          </section>

          {/* ── 4. Key Features ── */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-6" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
              Key Technical Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {tech.keyFeatures.map((feat, idx) => (
                <div key={idx} className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-emerald-950/40 border border-black/5 dark:border-emerald-800/30 shadow-xs">
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-gray-900 dark:text-slate-100 mb-2 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#0B6E4F] dark:text-emerald-400" />
                    {feat.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] leading-[1.7] text-gray-600 dark:text-slate-300">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. Business Benefits ── */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-6" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
              Business &amp; ROI Benefits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {tech.businessBenefits.map((benefit, idx) => (
                <div key={idx} className="p-5 sm:p-7 rounded-2xl bg-white/80 dark:bg-emerald-950/40 border border-[#0B6E4F]18 shadow-xs">
                  <h3 className="text-[16px] sm:text-[18px] font-bold text-[#0B6E4F] dark:text-emerald-400 mb-2 flex items-center gap-2">
                    <ShieldCheck size={20} />
                    {benefit.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] leading-[1.7] text-gray-600 dark:text-slate-300">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 6. Services Using This Technology ── */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-xl sm:text-3xl font-extrabold mb-4 sm:mb-5" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
              Services Powered by {tech.name}
            </h2>
            <div className="flex flex-wrap gap-2.5 sm:gap-3.5">
              {tech.relatedServices.map((svc, idx) => (
                <Link
                  key={idx}
                  href={`/services/${svc.slug}`}
                  className="px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-emerald-950/50 border border-[#0B6E4F]25 shadow-xs hover:border-[#0B6E4F] hover:shadow-md transition-all flex items-center gap-2 text-[14px] sm:text-[15px] font-bold text-[#0B6E4F] dark:text-emerald-400"
                >
                  <Briefcase size={15} />
                  <span>{svc.name}</span>
                  <ArrowRight size={14} />
                </Link>
              ))}
            </div>
          </section>

          {/* ── 7. Related Technologies ── */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-5" style={{ color: "var(--text)", fontFamily: "'Playfair Display', serif" }}>
              Related Technologies
            </h2>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {tech.relatedTechSlugs.map((relSlug) => {
                const relTech = getTechnologyData(relSlug);
                return (
                  <Link key={relSlug} href={`/technologies/${relSlug}`}>
                    <span className="px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl bg-white/80 dark:bg-emerald-950/50 border border-black/5 dark:border-emerald-800/30 text-[13.5px] sm:text-[15px] font-semibold text-gray-700 dark:text-slate-200 hover:border-[#0B6E4F] hover:text-[#0B6E4F] transition-all inline-flex items-center gap-1.5 sm:gap-2 shadow-xs">
                      <span>{relTech.categoryEmoji}</span>
                      <span>{relTech.name}</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* ── Pagination: Previous / Next Technology ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6 sm:pt-8 border-t border-black/10 dark:border-white/10 mb-12 sm:mb-16">
            <Link
              href={`/technologies/${prevSlug}`}
              className="flex items-center gap-2 text-[13.5px] sm:text-[14px] font-bold text-gray-600 dark:text-slate-300 hover:text-[#0B6E4F] dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft size={16} />
              Previous: {prevTech.name}
            </Link>

            <Link
              href={`/technologies/${nextSlug}`}
              className="flex items-center justify-end sm:justify-start gap-2 text-[13.5px] sm:text-[14px] font-bold text-gray-600 dark:text-slate-300 hover:text-[#0B6E4F] dark:hover:text-emerald-400 transition-colors"
            >
              Next: {nextTech.name}
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* ── 8. Call To Action ── */}
          <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl text-center bg-gradient-to-r from-[#0B6E4F] to-[#145A32] text-white shadow-2xl">
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold mb-3 sm:mb-4 text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
              Need an Enterprise Solution Powered by {tech.name}?
            </h2>
            <p className="text-[15px] sm:text-[18px] text-white/90 max-w-[750px] mx-auto mb-6 sm:mb-8 leading-[1.7]">
              Connect with senior architects at Green Knights of Tech &amp; AI to discuss your technical architecture and project requirements.
            </p>
            <Link
              href="/#contact"
              className="btn-shine inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold text-[15px] sm:text-[16px] bg-white text-[#0B6E4F] shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
            >
              Talk to Our Experts
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
