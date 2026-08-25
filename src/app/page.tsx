import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoundTableSection from "@/components/RoundTableSection";
import About from "@/components/About";
import Values from "@/components/Values";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Industries from "@/components/Industries";
import TechStack from "@/components/TechStack";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import TeamSection from "@/components/TeamSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Loading screen */}
      <LoadingScreen />

      {/* Global utilities */}
      <ScrollProgress />
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <RoundTableSection />
        <About />
        <Values />
        <Services />
        <WhyUs />
        <Industries />
        <TechStack />
        <Process />
        <TeamSection />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating buttons */}
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
