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
      <nav aria-label="Breadcrumb" className="py-4 pt-24">
        <ol className="flex items-center flex-wrap gap-2 text-[13px] sm:text-[14px] font-semibold text-gray-700">
          <li className="flex items-center gap-1.5 hover:text-[#0B6E4F] transition-colors">
            <Home size={15} />
            <Link href="/">Home</Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              <ChevronRight size={14} className="opacity-40" />
              {item.href ? (
                <Link href={item.href} className="hover:text-[#0B6E4F] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-bold text-[#0B6E4F]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
