import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import BackToTop from '@/components/BackToTop';
import ScrollProgress from '@/components/ScrollProgress';
import RoundTableExperience from '@/components/roundtable/RoundTableExperience';
import { roundTableServices } from '@/data/roundTableServices';
import {
  ArrowRight,
  Brain,
  Code2,
  Cloud,
  ShieldCheck,
  Zap,
  Cog,
  Lightbulb,
  BarChart2,
  MoveHorizontal,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'The Green Knights Round Table | Green Knights of Tech & AI',
  description:
    'Step into the Green Knights Round Table - an immersive interactive chamber where eight elite technology pillars unite to deliver world-class enterprise transformation.',
  openGraph: {
    title: 'The Green Knights Round Table | Green Knights of Tech & AI',
    description:
      'Where technology, intelligence, and transformation meet. Explore the eight pillars of the Green Knights.',
    siteName: 'Green Knights of Tech & AI',
  },
};

const ICON_MAP: Record<string, React.ReactNode> = {
  Brain:       <Brain       size={22} strokeWidth={1.6} />,
  Code2:       <Code2       size={22} strokeWidth={1.6} />,
  Cloud:       <Cloud       size={22} strokeWidth={1.6} />,
  ShieldCheck: <ShieldCheck size={22} strokeWidth={1.6} />,
  Zap:         <Zap         size={22} strokeWidth={1.6} />,
  Cog:         <Cog         size={22} strokeWidth={1.6} />,
  Lightbulb:   <Lightbulb   size={22} strokeWidth={1.6} />,
  BarChart2:   <BarChart2   size={22} strokeWidth={1.6} />,
};

const PILLAR_DESC: Record<string, string> = {
  'ai-solutions':           'Intelligent systems for automation',
  'software-development':   'Building scalable future-ready solutions',
  'cloud-solutions':        'Secure. Scalable. Always available.',
  'cybersecurity':          'Protecting what matters most',
  'digital-transformation': 'Reimagining businesses for the digital age',
  'erp-solutions':          'Integrating processes. Driving efficiency.',
  'it-consulting':          'Strategic guidance for digital success',
  'data-analytics':         'Turning data into intelligent insights',
};

export default function RoundTablePage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />

      <main
        className="relative overflow-x-hidden"
        style={{ background: '#060F09', color: '#F5EED0' }}
      >
        {/* SECTION 1 - HERO INTRO */}
        <section className="relative pt-28 sm:pt-32 pb-8 sm:pb-10 text-center px-4 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(11,110,79,0.22) 0%, rgba(201,162,39,0.06) 55%, transparent 75%)',
            }}
          />
          <div className="relative z-10 max-w-3xl mx-auto">
            <span
              className="inline-block text-[10px] sm:text-[11px] font-extrabold uppercase mb-5"
              style={{ color: '#C9A227', letterSpacing: '0.32em' }}
            >
              The Green Knights
            </span>

            <h1
              className="text-[42px] sm:text-[60px] lg:text-[72px] font-extrabold tracking-tight leading-[1.05] mb-5"
              style={{ fontFamily: "'Playfair Display', serif", color: '#F5EED0' }}
            >
              The Green Knights
              <br />
              <span style={{ color: '#C9A227' }}>Round Table</span>
            </h1>

            <p
              className="text-[15px] sm:text-[17px] lg:text-[19px] font-medium mb-7 leading-relaxed"
              style={{ color: 'rgba(245,238,208,0.78)' }}
            >
              Where technology, intelligence, and transformation meet.
            </p>

            <div className="flex items-center justify-center gap-4 mb-7">
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{ background: 'linear-gradient(90deg, transparent, #C9A227)' }}
              />
              <div className="relative w-7 h-7 opacity-85 flex-shrink-0">
                <Image
                  src="/images/brand/gk-shield-transparent.png"
                  alt="Green Knights Shield"
                  fill
                  sizes="28px"
                  className="object-contain"
                />
              </div>
              <div
                className="h-px flex-1 max-w-[120px]"
                style={{ background: 'linear-gradient(90deg, #C9A227, transparent)' }}
              />
            </div>

            <p
              className="text-[13px] sm:text-[14.5px] max-w-[500px] mx-auto leading-[1.75]"
              style={{ color: 'rgba(245,238,208,0.55)' }}
            >
              The Green Knights unite their expertise across eight core technology
              pillars to deliver world-class enterprise solutions.
            </p>
          </div>
        </section>

        {/* SECTION 2 - LARGE ROUND TABLE EXPERIENCE */}
        <section className="relative w-full py-2 sm:py-4">
          <div
            className="absolute top-0 left-0 right-0 h-20 pointer-events-none z-10"
            style={{ background: 'linear-gradient(180deg, #060F09 0%, transparent 100%)' }}
          />
          <div className="w-full max-w-[1000px] mx-auto px-2 sm:px-4 lg:px-6">
            <div
              className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden"
              style={{
                border: '1.5px solid rgba(201,162,39,0.28)',
                boxShadow:
                  '0 0 100px rgba(11,110,79,0.3), 0 0 40px rgba(0,0,0,0.8), inset 0 0 60px rgba(0,0,0,0.45)',
              }}
            >
              <RoundTableExperience embedded={true} large={true} />
            </div>
          </div>
          <div
            className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none z-10"
            style={{ background: 'linear-gradient(0deg, #060F09 0%, transparent 100%)' }}
          />
        </section>

        {/* SECTION 3 - INTERACTION HINT */}
        <div className="text-center pt-4 pb-10 px-4">
          <div className="flex items-center justify-center gap-2.5 mb-3">
            <MoveHorizontal size={13} style={{ color: '#C9A227', opacity: 0.75 }} />
            <span
              className="text-[11px] sm:text-[12px] font-bold uppercase"
              style={{ color: 'rgba(201,162,39,0.75)', letterSpacing: '0.22em' }}
            >
              Drag to rotate the Round Table
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-10 sm:w-16" style={{ background: 'rgba(201,162,39,0.22)' }} />
            <span
              className="text-[10px] sm:text-[11px] uppercase"
              style={{ color: 'rgba(245,238,208,0.35)', letterSpacing: '0.18em' }}
            >
              Explore our eight technology pillars
            </span>
            <div className="h-px w-10 sm:w-16" style={{ background: 'rgba(201,162,39,0.22)' }} />
          </div>
        </div>

        {/* SECTION 4 - EIGHT PILLARS */}
        <section
          className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
          style={{ borderTop: '1px solid rgba(201,162,39,0.12)' }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(11,110,79,0.1) 0%, transparent 70%)',
            }}
          />
          <div className="relative z-10 max-w-[1440px] mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2
                className="text-[32px] sm:text-[46px] lg:text-[56px] font-extrabold tracking-tight mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5EED0' }}
              >
                Eight Pillars.{' '}
                <span style={{ color: '#C9A227' }}>One Mission.</span>
              </h2>
              <p
                className="text-[13px] sm:text-[15px] max-w-lg mx-auto leading-[1.75]"
                style={{ color: 'rgba(245,238,208,0.5)' }}
              >
                Each pillar represents a core strength. Together, they create
                complete enterprise transformation.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
              {roundTableServices.map((svc) => (
                <Link
                  key={svc.id}
                  href={svc.slug}
                  className="rt-pillar-card group flex flex-col items-center text-center p-4 sm:p-5 rounded-xl"
                >
                  <div
                    className="mb-3 transition-all duration-300 group-hover:drop-shadow-[0_0_6px_rgba(201,162,39,0.7)]"
                    style={{ color: '#C9A227' }}
                  >
                    {ICON_MAP[svc.iconName]}
                  </div>
                  <h3
                    className="text-[10.5px] sm:text-[11.5px] font-extrabold uppercase tracking-wide leading-snug mb-2"
                    style={{ color: '#F5EED0' }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    className="text-[9.5px] sm:text-[10.5px] leading-relaxed"
                    style={{ color: 'rgba(245,238,208,0.45)' }}
                  >
                    {PILLAR_DESC[svc.id] ?? ''}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 - CTA BANNER */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 max-w-[1440px] mx-auto">
          <div
            className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-7 sm:p-9 lg:p-11 rounded-2xl sm:rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #0A200E 0%, #06120A 100%)',
              border: '1.5px solid rgba(201,162,39,0.38)',
              boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
            }}
          >
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <Image
                src="/images/brand/gk-shield-premium.png"
                alt="Green Knights Shield"
                fill
                sizes="64px"
                className="object-contain drop-shadow-[0_0_12px_rgba(201,162,39,0.4)]"
              />
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h2
                className="text-[22px] sm:text-[26px] lg:text-[30px] font-extrabold mb-1.5"
                style={{ fontFamily: "'Playfair Display', serif", color: '#F5EED0' }}
              >
                Ready to Join the Round Table?
              </h2>
              <p
                className="text-[13px] sm:text-[14px]"
                style={{ color: 'rgba(245,238,208,0.6)' }}
              >
                Let&apos;s build the future of your enterprise together.
              </p>
            </div>

            <Link
              href="/#contact"
              className="rt-cta-btn flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #C9A227 0%, #E5BE3B 100%)',
                color: '#060F09',
                fontSize: '14px',
                letterSpacing: '0.03em',
                boxShadow: '0 8px 28px rgba(201,162,39,0.4)',
              }}
            >
              Book a Consultation
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
