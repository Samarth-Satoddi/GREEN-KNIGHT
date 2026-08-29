import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Values from "@/components/Values";
import TeamSection from "@/components/TeamSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata: Metadata = {
  title: "About Us | Green Knights of Tech & AI",
  description:
    "Learn about Green Knights of Tech & AI - our mission, vision, values, and the team driving intelligent enterprise transformation.",
  openGraph: {
    title: "About Us | Green Knights of Tech & AI",
    description:
      "Learn about Green Knights of Tech & AI - our mission, vision, values, and the team driving intelligent enterprise transformation.",
    siteName: "Green Knights of Tech & AI",
  },
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main className="pt-20">
        <About />
        <Values />
        <TeamSection />
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
