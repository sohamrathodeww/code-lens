import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ArrowRight, FileJson, Code2, Database, KeyRound, 
  Regex, Sparkles, Languages, Terminal, 
  Cpu, Wrench, Banknote, Search, Globe, Binary, CloudSun, FileText
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { SlideUp, FadeIn, Stagger } from "@/components/motion/MotionPrimitives";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "All Developer Tools | CodeLens",
  description: "Browse the complete directory of free online developer tools provided by CodeLens. High-performance JSON viewers, Code Diff Checkers, Encoders, Currency Converters, and more.",
  keywords: ["all developer tools", "free developer tools", "programming utilities", "online code editors", "developer tools directory", "codelens tools"],
  alternates: {
    canonical: `${APP_URL}/tools`,
  },
  openGraph: {
    title: "All Developer Tools | CodeLens",
    description: "Browse the complete directory of free online developer tools provided by CodeLens.",
    url: `${APP_URL}/tools`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Developer Tools | CodeLens",
    description: "Browse the complete directory of free online developer tools.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const ICON_MAP: Record<string, React.ElementType> = {
  FileJson, Code2, Database, KeyRound, Regex, Sparkles, Languages, Terminal, Banknote, Globe, Binary, CloudSun, FileText
};

export default function AllToolsPage() {
  const activeTools = TOOLS_REGISTRY.filter((t) => t.status === "active");

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500/30">
      <FluidCanvas />
      
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 flex-1 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <SlideUp>
            <div className="flex flex-col items-center text-center space-y-6 mb-20">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 shadow-sm cursor-default">
                <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 font-mono">
                  Directory
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950 dark:text-white">
                All Developer Tools
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl text-balance">
                Explore our full suite of high-performance utilities, executing entirely in your browser with zero latency and 100% privacy.
              </p>
            </div>
          </SlideUp>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activeTools.map((tool, idx) => {
              const Icon = ICON_MAP[tool.iconName] || Code2;
              const delay = 0.1 + (idx * 0.05);

              return (
                <SlideUp key={tool.id} delay={delay} className="h-full">
                  <div className="group relative p-6 flex flex-col justify-between h-full rounded-3xl bg-white dark:bg-[#13182b] border border-slate-200 dark:border-slate-700/60 dark:border-slate-800 transition-all duration-400 overflow-hidden hover:border-indigo-300 dark:hover:border-slate-700 hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] dark:hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-1.5">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 dark:group-hover:opacity-0 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="p-3.5 rounded-2xl border transition-all duration-300 bg-indigo-50/50 dark:bg-slate-800/50 border-indigo-100 dark:border-slate-700 text-indigo-600 dark:text-slate-300 group-hover:bg-indigo-600 dark:group-hover:bg-slate-700 group-hover:text-white dark:group-hover:text-white group-hover:scale-110 shadow-sm">
                          <Icon className="w-6 h-6" />
                        </div>

                        <span className="px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full border bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 group-hover:bg-indigo-50 dark:group-hover:bg-slate-800 group-hover:text-indigo-700 dark:text-indigo-200 dark:group-hover:text-slate-300 group-hover:border-indigo-200 dark:group-hover:border-slate-600 transition-colors duration-300">
                          {tool.category}
                        </span>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:text-indigo-300 dark:group-hover:text-white transition-colors duration-300 tracking-tight">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 relative z-10 mt-auto">
                      <Link href={tool.route} className="w-full block cursor-pointer">
                        <button className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-700 dark:text-indigo-200 dark:hover:text-white border border-slate-200 dark:border-slate-700/80 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-slate-600 transition-all duration-300 cursor-pointer">
                          Launch Tool
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:text-indigo-300 dark:group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}



