import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Green Knights of Tech & AI | Digital Knights of the Round Table",
  description:
    "Green Knights of Tech & AI — Digital Knights of the Round Table, serving your technology needs. Enterprise AI solutions, software development, cybersecurity, and digital transformation.",
  keywords: [
    "AI solutions",
    "technology company",
    "software development",
    "cybersecurity",
    "cloud solutions",
    "digital transformation",
    "Green Knights",
    "tech company",
    "enterprise technology",
    "artificial intelligence",
  ],
  authors: [{ name: "Green Knights of Tech & AI" }],
  creator: "Green Knights of Tech & AI",
  publisher: "Green Knights of Tech & AI",
  metadataBase: new URL("https://greenknights.tech"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://greenknights.tech",
    siteName: "Green Knights of Tech & AI",
    title: "Green Knights of Tech & AI | Digital Knights of the Round Table",
    description:
      "Digital Knights of the Round Table, serving your technology needs. Enterprise AI, software development, and digital transformation.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Green Knights of Tech & AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Green Knights of Tech & AI",
    description:
      "Digital Knights of the Round Table, serving your technology needs.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'light';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased overflow-x-hidden">{children}</body>
    </html>
  );
}
