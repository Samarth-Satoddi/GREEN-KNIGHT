import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD BreadcrumbList schema
  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://greenknights.tech",
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: item.href ? `https://greenknights.tech${item.href}` : undefined,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListSchema) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 pt-24 sm:pt-28">
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[12.5px] sm:text-[14px] font-semibold text-gray-700 dark:text-slate-300">
          <li className="flex items-center gap-1.5 hover:text-[#0B6E4F] dark:hover:text-emerald-400 transition-colors">
            <Home size={15} />
            <Link href="/">Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight size={13} className="opacity-40" />
              {item.href ? (
                <Link href={item.href} className="hover:text-[#0B6E4F] dark:hover:text-emerald-400 transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-bold text-[#0B6E4F] dark:text-emerald-400 truncate max-w-[200px] sm:max-w-none">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
