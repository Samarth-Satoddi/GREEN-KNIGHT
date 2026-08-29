"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { SectionHeader } from "./SectionWrapper";
import { GetTechIcon } from "@/lib/technologyIcons";
import { ArrowRight } from "lucide-react";

interface TechCategory {
  title: string;
  items: { name: string; slug?: string }[];
  description: string;
}

const techCategories: TechCategory[] = [
  {
    title: "AI & Machine Learning",
    description: "Cutting-edge artificial intelligence, neural networks, and generative AI frameworks.",
    items: [
      { name: "Python", slug: "python" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "OpenAI API", slug: "openai" },
      { name: "LangChain", slug: "langchain" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Scikit-Learn", slug: "scikit-learn" },
      { name: "FastAPI", slug: "fastapi" },
    ],
  },
  {
    title: "Frontend Engineering",
    description: "Modern, responsive, and ultra-fast user interface technologies.",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Vue.js", slug: "vuejs" },
      { name: "Framer Motion", slug: "framer-motion" },
      { name: "HTML5/CSS3", slug: "html5-css3" },
      { name: "WebGL/Three.js", slug: "threejs" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "Robust, scalable, and secure server-side architectures.",
    items: [
      { name: "Node.js", slug: "nodejs" },
      { name: "Python", slug: "python" },
      { name: "Go (Golang)", slug: "golang" },
      { name: "Java / Spring", slug: "java-spring" },
      { name: ".NET Core", slug: "dotnet" },
      { name: "GraphQL", slug: "graphql" },
      { name: "REST APIs", slug: "rest-apis" },
      { name: "Microservices", slug: "microservices" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    description: "Enterprise-grade cloud platforms, DevOps, and containerisation.",
    items: [
      { name: "AWS", slug: "aws" },
      { name: "Microsoft Azure", slug: "azure" },
      { name: "Google Cloud", slug: "gcp" },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
      { name: "CI/CD Pipelines", slug: "cicd" },
      { name: "Serverless", slug: "serverless" },
    ],
  },
  {
    title: "Data & Security",
    description: "High-performance databases, data pipelines, and cybersecurity protocols.",
    items: [
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "Apache Kafka", slug: "kafka" },
      { name: "Snowflake", slug: "snowflake" },
      { name: "Zero Trust", slug: "zero-trust" },
      { name: "OAuth 2.0 / OIDC", slug: "oauth" },
      { name: "SOC 2 / ISO27001", slug: "compliance" },
    ],
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="tech-stack"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 50%, rgba(11,110,79,0.06) 0%, transparent 60%)",
        }}
      />

      <div ref={ref} className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 relative z-10">
        <SectionHeader
          badge="Technology Stack"
          title="Powered by Modern"
          highlight="Innovations"
          subtitle="We leverage battle-tested tools, cutting-edge frameworks, and enterprise-grade infrastructure to build solutions that scale indefinitely."
        />

        {/* Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-2.5 mb-8 sm:mb-12">
          {techCategories.map((cat, i) => (
            <button
              key={cat.title}
              onClick={() => setActiveTab(i)}
              className={`px-3.5 py-2 sm:px-5 sm:py-3 rounded-xl font-bold text-[13px] sm:text-[16px] transition-all cursor-pointer ${
                activeTab === i
                  ? "bg-[#0B6E4F] text-white shadow-md"
                  : "bg-white/80 dark:bg-emerald-950/50 text-gray-800 dark:text-slate-200 hover:bg-[#0B6E4F]10 hover:text-[#0B6E4F] border border-black/5 dark:border-emerald-800/30"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Active Category Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 shadow-md"
          style={{
            background: "var(--glass-bg)",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <div className="max-w-2xl mb-6 sm:mb-8">
            <h3
              className="text-xl sm:text-3xl font-extrabold mb-2.5 sm:mb-3"
              style={{
                color: "var(--text)",
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {techCategories[activeTab].title}
            </h3>
            <p className="text-[15px] sm:text-[17px] leading-[1.7]" style={{ color: "var(--text-muted)" }}>
              {techCategories[activeTab].description}
            </p>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {techCategories[activeTab].items.map((tech) => {
              const cardContent = (
                <div
                  className="flex items-center gap-3 px-3.5 py-3 sm:px-4.5 sm:py-3.5 rounded-xl text-[14px] sm:text-[16px] font-semibold cursor-pointer transition-all border border-black/5 dark:border-emerald-800/40 bg-white/90 dark:bg-emerald-950/60 shadow-xs hover:border-[#0B6E4F] dark:hover:border-emerald-400 hover:shadow-md text-gray-800 dark:text-slate-100 hover:text-[#0B6E4F] dark:hover:text-emerald-400"
                >
                  <GetTechIcon name={tech.name} size={22} />
                  <span className="truncate">{tech.name}</span>
                </div>
              );

              return tech.slug ? (
                <Link key={tech.name} href={`/technologies/${tech.slug}`}>
                  {cardContent}
                </Link>
              ) : (
                <div key={tech.name}>{cardContent}</div>
              );
            })}
          </div>
        </motion.div>

        {/* All Technologies Link */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/#tech-stack"
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:px-8 sm:py-4.5 rounded-xl font-bold text-[15px] sm:text-[17px] text-[#0B6E4F] dark:text-emerald-400 border-2 border-[#0B6E4F] dark:border-emerald-500 bg-white/80 dark:bg-emerald-950/60 hover:bg-[#0B6E4F] dark:hover:bg-emerald-600 hover:text-white dark:hover:text-white transition-all shadow-md w-full sm:w-auto"
          >
            Explore Full Technology Radar
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}
