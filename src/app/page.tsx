"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileJson, Code2, Database, KeyRound, Regex, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { SlideUp } from "@/components/motion/MotionPrimitives";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";

const ICON_MAP: Record<string, React.ElementType> = {
  FileJson,
  Code2,
  Database,
  KeyRound,
  Regex,
  Sparkles,
};

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://devstudio-tools.vercel.app";

const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      name: "CodeLens — Developer Tools Suite",
      url: APP_URL,
      potentialAction: {
        "@type": "SearchAction",
        target: `${APP_URL}/tools/json-viewer?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What developer tools are available on CodeLens?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CodeLens offers a free suite of developer utilities including Online JSON Viewer, Beautifier, Tree Inspector, Tabular Data Grid, Flow Chart Diagram Visualizer, and Monaco Code Compare Studio.",
          },
        },
        {
          "@type": "Question",
          name: "Are all developer tools free and client-side safe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, all tools run 100% in your local browser memory without uploading sensitive code payloads to third-party server backends.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      {/* Background Animated Fluid Canvas */}
      <FluidCanvas />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />

      <main className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-8 pt-12 pb-24 flex-1 space-y-16">
        {/* Product Hero Section */}
        <SlideUp className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white backdrop-blur-2xl text-indigo-700 text-xs font-mono font-bold shadow-[inset_0_1.5px_2px_#ffffff,0_8px_20px_rgba(99,102,241,0.12)] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Developer Productivity Suite</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.1]">
            Developer tools, <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-600 bg-clip-text text-transparent">
              without the friction.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl mx-auto">
            High-performance developer utilities powered by Monaco Engine. Format, inspect, compare code, and process payloads with instant file validation.
          </p>

          {/* Launch Buttons CTA */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link href="/tools/json-viewer">
              <Button variant="primary" size="lg" icon={<ArrowRight className="w-4.5 h-4.5" />}>
                Launch JSON Viewer
              </Button>
            </Link>

            <Link href="/tools/code-compare">
              <Button variant="secondary" size="lg" icon={<Code2 className="w-4.5 h-4.5" />}>
                Launch Code Compare
              </Button>
            </Link>
          </div>
        </SlideUp>

        {/* Tools Suite Grid */}
        <div className="space-y-6 pt-8">
          <div className="flex items-center justify-between border-b border-slate-900/10 pb-4">
            <h2 className="font-extrabold text-xl sm:text-2xl text-slate-950 tracking-tight">
              Developer Utilities
            </h2>
            <span className="text-xs font-mono font-bold text-slate-500">
              {TOOLS_REGISTRY.filter((t) => t.status === "active").length} Active Tools • Extensible Platform
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS_REGISTRY.map((tool) => {
              const Icon = ICON_MAP[tool.iconName] || Code2;
              const isActive = tool.status === "active";

              return (
                <div
                  key={tool.id}
                  className={`liquid-glass-surface p-7 flex flex-col justify-between h-full transition-all duration-300 ${
                    isActive ? "hover:border-white hover:-translate-y-1 shadow-[0_20px_45px_-15px_rgba(15,23,42,0.1)]" : "opacity-75"
                  }`}
                >
                  <span className="lens-sheen" />
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div
                        className={`p-3 rounded-2xl border ${
                          isActive
                            ? "bg-indigo-600/10 border-indigo-200/80 text-indigo-600 shadow-[inset_0_1.5px_2px_#ffffff]"
                            : "bg-slate-100 border-slate-200 text-slate-400"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <span
                        className={`px-3 py-1 text-xs font-mono font-bold rounded-full border ${
                          isActive
                            ? "bg-emerald-500/15 text-emerald-800 border-emerald-300 shadow-[inset_0_1px_1.5px_#ffffff]"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {isActive ? "Active" : "Planned"}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-slate-950 tracking-tight">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2 font-normal leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-8 relative z-10">
                    {isActive ? (
                      <Link href={tool.route} className="w-full block">
                        <Button
                          variant="secondary"
                          size="md"
                          className="w-full justify-between"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Launch Tool
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="ghost" size="md" disabled className="w-full justify-center">
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* High-Ranking Landing SEO Section */}
        <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80 mt-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              CodeLens — High-Performance Online Developer Tools & Code Inspector Suite
            </h2>
            <p className="text-slate-600">
              CodeLens is built for software engineers, data analysts, and web developers needing fast, privacy-first online utilities. From instant JSON formatting and flow chart rendering to side-by-side Monaco code comparison, CodeLens delivers desktop-grade performance directly inside your web browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">⚡ Online JSON Viewer & Diagram Inspector</h3>
              <p className="text-xs text-slate-600">
                Format, beautify, and minify API payloads with up to 5MB file support. Toggle seamlessly between expandable tree node view, structured tabular grid, hierarchy path maps, and visual node flow charts.
              </p>
              <Link href="/tools/json-viewer" className="inline-block pt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Open Free JSON Viewer →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">🔍 Side-by-Side Code Compare Studio</h3>
              <p className="text-xs text-slate-600">
                Compare text, source code files, and SQL/JSON payloads with VS Code's Monaco Engine. Features dual-panel split view, inline diffs, language syntax highlighting, and instantaneous change auditing.
              </p>
              <Link href="/tools/code-compare" className="inline-block pt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800">
                Open Code Compare Studio →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


