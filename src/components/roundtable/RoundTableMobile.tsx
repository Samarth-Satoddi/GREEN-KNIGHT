import Image from "next/image";
import Link from "next/link";
import { roundTableServices } from "@/data/roundTableServices";

export default function RoundTableMobile() {
  return (
    <div className="w-full space-y-6">
      {/* ── Center Shield Header ── */}
      <div className="flex flex-col items-center justify-center text-center py-1 mb-2">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 mb-3">
          <div
            className="absolute -inset-3 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(11,110,79,0.3) 0%, rgba(201,162,39,0.2) 60%, transparent 80%)",
              filter: "blur(8px)",
            }}
          />
          <Image
            src="/images/brand/gk-shield-premium.png"
            alt="Green Knights Shield Logo"
            fill
            sizes="(max-width: 768px) 112px, 120px"
            className="object-contain"
          />
        </div>
        <p className="text-[20px] sm:text-[24px] font-extrabold tracking-wide uppercase text-[#0B6E4F] mb-1.5">
          KNIGHTS OF THE ROUND TABLE
        </p>
        <p className="text-[16px] sm:text-[17px] font-medium text-gray-600">Tap a capability to explore</p>
      </div>

      {/* ── Direct Link Capability Grid ── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-3.5 px-1 sm:px-2">
        {roundTableServices.map((service) => (
          <Link
            key={service.id}
            href={service.slug}
            className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl transition-all duration-300 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227]"
            style={{
              background: "rgba(255, 252, 242, 0.95)",
              border: "1px solid rgba(201, 162, 39, 0.35)",
              color: "#0A251B",
              boxShadow: "0 2px 8px rgba(11, 110, 79, 0.08)",
            }}
          >
            <span
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center font-extrabold text-[14px] sm:text-[16px] flex-shrink-0"
              style={{
                background: "rgba(11, 110, 79, 0.12)",
                color: "#C9A227",
              }}
            >
              {service.number}
            </span>
            <div className="text-left min-w-0 flex-1">
              <span className="text-[16px] sm:text-[18px] font-bold block leading-snug text-[#0A251B] break-words">
                {service.name}
              </span>
              <span className="text-[14px] sm:text-[16px] text-[#0B6E4F] font-semibold flex items-center gap-0.5 mt-1">
                Explore &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
