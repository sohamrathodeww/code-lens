import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ArrowRight, FileJson, Code2, Database, KeyRound, 
  Regex, Sparkles, Languages, Terminal, 
  CheckCircle2, ShieldCheck, Zap, Lock, Cpu, Globe
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { SlideUp, FadeIn, ScaleIn, Stagger } from "@/components/motion/MotionPrimitives";
import { TOOLS_REGISTRY } from "@/lib/tools-registry";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "CodeLens — Next-Gen Developer Utilities",
  description:
    "CodeLens is a modern, high-performance suite of developer tools. Format JSON, compare code, inspect API payloads, and execute code directly in your browser with absolute privacy.",
  keywords: [
    "CodeLens",
    "online developer tools",
    "json viewer online",
    "code compare online",
    "free json formatter",
    "online code diff tool",
    "developer utilities",
    "browser based code review",
    "api payload validator",
  ],
};

const ICON_MAP: Record<string, React.ElementType> = {
  FileJson, Code2, Database, KeyRound, Regex, Sparkles, Languages, Terminal,
};

const FEATURES = [
  { icon: Lock, title: "100% Privacy", description: "All code executes safely in your browser. No server uploads." },
  { icon: Zap, title: "Instant Execution", description: "Zero loading states. Powered by Monaco & WebAssembly." },
  { icon: Globe, title: "Works Offline", description: "Install as a PWA and use the core tools without internet." },
];

export default function Home() {
  const activeTools = TOOLS_REGISTRY.filter((t) => t.status === "active");

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] text-slate-900 selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <FluidCanvas />
      
      <div className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-[10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-cyan-500/10 via-blue-500/10 to-transparent blur-3xl opacity-60" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 flex-1">
        
        {/* Powerful Hero Section */}
        <section className="max-w-6xl mx-auto pt-24 pb-32 flex flex-col items-center text-center space-y-10 relative">
          
          <ScaleIn delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/60 shadow-sm mb-4 transition-transform hover:scale-105 cursor-default">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 font-mono">
                CodeLens v2.0 is Live
              </span>
            </div>
          </ScaleIn>

          <div className="space-y-6 max-w-4xl relative">
            <SlideUp delay={0.2} className="relative">
              <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.05]">
                The standard library for <br className="hidden sm:inline" />
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                    modern developers.
                  </span>
                  {/* Decorative underline */}
                  <span className="absolute -bottom-2 left-0 right-0 h-3 bg-indigo-500/10 -rotate-1 skew-x-12 -z-0" />
                </span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.3}>
              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto text-balance">
                Format JSON, diff code, inspect payloads, and decode tokens in milliseconds. Built with Monaco and WebAssembly for native-level performance inside your browser.
              </p>
            </SlideUp>
          </div>

          <SlideUp delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
              <Link href="/json-viewer" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full h-14 px-8 text-base shadow-[0_8px_24px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_32px_rgba(79,70,229,0.35)] transition-all">
                  Open JSON Viewer
                </Button>
              </Link>
              <Link href="/code-compare" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full h-14 px-8 text-base bg-white shadow-sm border-slate-200/80 hover:bg-slate-50 transition-all">
                  Compare Code
                </Button>
              </Link>
            </div>
          </SlideUp>
          
          <FadeIn delay={0.6} className="pt-12 w-full max-w-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-200/60 py-6">
              {FEATURES.map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2 p-4">
                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900">{feature.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Unified Tools Section */}
        <section id="tools" className="max-w-7xl mx-auto py-24 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <SlideUp>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-2">
                Powerful Utilities
              </h2>
              <p className="text-slate-500 font-medium text-lg">
                Everything you need, right in your browser.
              </p>
            </SlideUp>
            <SlideUp delay={0.1}>
              <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-full border border-indigo-100">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-bold text-indigo-700">{activeTools.length} Platform Tools</span>
              </div>
            </SlideUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOOLS_REGISTRY.map((tool, idx) => {
              const Icon = ICON_MAP[tool.iconName] || Code2;
              const isActive = tool.status === "active";
              // Calculate a staggered delay based on index for the grid items
              const delay = 0.2 + (idx * 0.05);

              return (
                <SlideUp key={tool.id} delay={delay} className="h-full">
                  <div
                    className={`group relative p-6 flex flex-col justify-between h-full rounded-3xl bg-white border border-slate-200/60 transition-all duration-400 overflow-hidden ${
                      isActive 
                        ? "hover:border-indigo-300 hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-1.5" 
                        : "opacity-75 grayscale-[0.5]"
                    }`}
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    )}
                    
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-start justify-between">
                        <div
                          className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                            isActive
                              ? "bg-indigo-50/50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110 shadow-sm"
                              : "bg-slate-50 border-slate-200 text-slate-400"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>

                        <span
                          className={`px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold rounded-full border ${
                            isActive
                              ? "bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200 transition-colors duration-300"
                              : "bg-slate-100 text-slate-500 border-slate-200"
                          }`}
                        >
                          {isActive ? tool.category : "Planned"}
                        </span>
                      </div>

                      <div className="pt-2">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-300 tracking-tight">
                          {tool.name}
                        </h3>
                        <p className="text-sm text-slate-500 mt-2 font-medium leading-relaxed">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-8 relative z-10 mt-auto">
                      {isActive ? (
                        <Link href={tool.route} className="w-full block">
                          <button className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-between bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/80 hover:border-indigo-200 transition-all duration-300">
                            Launch Tool
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1.5 transition-all duration-300" />
                          </button>
                        </Link>
                      ) : (
                        <button disabled className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-slate-100 text-slate-400 cursor-not-allowed">
                          Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </SlideUp>
              );
            })}
          </div>
        </section>

        {/* Elegant SEO / Deep Dive Section */}
        <SlideUp delay={0.4}>
          <section className="max-w-7xl mx-auto p-8 sm:p-12 bg-slate-900 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-24">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-500/20 to-transparent blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-100 font-mono">
                    Security First
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  No tracking. No backend. No worries.
                </h2>
                <p className="text-slate-300 text-lg leading-relaxed">
                  CodeLens is engineered to respect your code. All processing for the JSON Viewer, JWT Decoder, and Code Compare happens completely client-side in your browser's memory using WebAssembly.
                </p>
                <div className="pt-4">
                  <Link href="/json-viewer">
                    <Button variant="primary" size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-transparent shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      Start Formatting
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "JSON Workflow", desc: "Format, minify, tree inspect, validate." },
                  { title: "Code Compare", desc: "Diff side-by-side with Monaco engine." },
                  { title: "Payload Decoders", desc: "JWT verification & base64 transforms." },
                  { title: "Compiler", desc: "Multi-language online playground." },
                ].map((item, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                    <h4 className="font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideUp>

      </main>

      <Footer />
    </div>
  );
}
