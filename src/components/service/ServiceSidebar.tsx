import Link from "next/link";
import { allServices } from "@/data/services";
import { Sparkles, ChevronRight, Layers, ArrowLeft } from "lucide-react";

interface ServiceSidebarProps {
  currentSlug: string;
}

export default function ServiceSidebar({ currentSlug }: ServiceSidebarProps) {
  return (
    <aside className="hidden lg:block w-76 flex-shrink-0">
      <div className="sticky top-28 space-y-6">
        {/* Back link */}
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#0B6E4F] hover:text-[#145A32] transition-colors"
        >
          <ArrowLeft size={15} />
          All Enterprise Services
        </Link>

        {/* Sidebar Box */}
        <div
          className="p-6 rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.78)",
            border: "1px solid rgba(11,110,79,0.14)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 10px 30px rgba(11,110,79,0.05)",
          }}
        >
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-black/5">
            <Layers size={20} className="text-[#0B6E4F]" />
            <h3 className="font-bold text-[15px] tracking-wide uppercase text-gray-900">
              Service Pillars
            </h3>
          </div>

          <nav className="space-y-2" aria-label="Service Sidebar Navigation">
            {allServices.map((svc) => {
              const isActive = svc.slug === currentSlug;

              return (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  className={`flex items-center justify-between p-3.5 rounded-xl text-[14px] sm:text-[15px] font-semibold transition-all ${
                    isActive
                      ? "bg-[#0B6E4F] text-white shadow-md font-bold"
                      : "text-gray-700 hover:bg-[#0B6E4F]10 hover:text-[#0B6E4F]"
                  }`}
                >
                  <span className="truncate max-w-[200px]">{svc.title}</span>
                  <ChevronRight
                    size={16}
                    className={`transition-transform ${
                      isActive ? "text-white" : "opacity-40"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Direct CTA Box */}
        <div
          className="p-6 rounded-2xl text-center text-white"
          style={{
            background: "linear-gradient(135deg, #0B6E4F 0%, #145A32 100%)",
            boxShadow: "0 10px 25px rgba(11,110,79,0.25)",
          }}
        >
          <Sparkles size={24} className="mx-auto mb-2 text-[#C9A227]" />
          <h4 className="font-extrabold text-[16px] mb-2">Need Custom Scope?</h4>
          <p className="text-[13px] sm:text-[14px] text-white/90 leading-[1.6] mb-5">
            Our engineering team designs bespoke solutions tailored to your enterprise stack.
          </p>
          <a
            href="#book-consultation"
            className="block w-full py-3 rounded-xl font-bold text-[14px] bg-[#C9A227] text-gray-950 hover:bg-yellow-400 transition-colors shadow"
          >
            Get Expert Estimate
          </a>
        </div>
      </div>
    </aside>
  );
}
