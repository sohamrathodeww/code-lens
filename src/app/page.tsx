import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { 
  ArrowRight, FileJson, Code2, Database, KeyRound, 
  Regex, Sparkles, Languages, Terminal, 
  CheckCircle2, ShieldCheck, Zap, Lock, Cpu, Globe, Banknote
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
    "Free online developer tools: JSON formatter, code compare, API payload inspector, and more. Run high-performance utilities directly in your browser.",
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
  FileJson, Code2, Database, KeyRound, Regex, Sparkles, Languages, Terminal, Banknote
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
              <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-slate-950 leading-[1.05]">
                Free Online JSON Viewer, <br className="hidden sm:inline" />
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10 bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-500 bg-clip-text text-transparent">
                    Code Compare & Developer Tools.
                  </span>
                </span>
              </h1>
            </SlideUp>

            <SlideUp delay={0.3}>
              <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto text-balance">
                Format JSON, diff code, inspect payloads, and decode tokens in milliseconds. Built with Monaco and WebAssembly for native-level performance inside your browser.
              </p>
            </SlideUp>
          </div>
          
          <FadeIn delay={0.6} className="pt-16 w-full max-w-4xl mx-auto">
            <div className="relative">
              {/* Subtle ambient glow behind the container */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-cyan-500/10 blur-xl opacity-50 rounded-3xl" />
              
              <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 rounded-3xl bg-white/50 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)] ring-1 ring-slate-900/5">
                {FEATURES.map((feature, idx) => (
                  <div key={idx} className="group relative flex flex-col items-center text-center gap-3 p-5 rounded-2xl hover:bg-white/80 transition-all duration-300">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 shadow-sm text-slate-700 group-hover:text-indigo-600 group-hover:shadow-md group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1.5 z-10">
                      <h4 className="font-bold text-slate-900 tracking-tight">{feature.title}</h4>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[200px] mx-auto">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
            {TOOLS_REGISTRY.slice(0, 6).map((tool, idx) => {
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
                        <Link href={tool.route} className="w-full block cursor-pointer">
                          <button className="w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-between bg-slate-50 text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200/80 hover:border-indigo-200 transition-all duration-300 cursor-pointer">
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
          
          <SlideUp delay={0.4}>
            <div className="mt-14 flex justify-center">
              <Link href="/tools" className="group inline-flex relative cursor-pointer">
                {/* Glowing Aura Background */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-70 transition duration-500 group-hover:duration-200"></div>
                
                {/* Main Button Body */}
                <button className="relative flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-xl border border-indigo-100 rounded-2xl text-indigo-700 font-extrabold text-lg shadow-sm group-hover:shadow-[0_12px_24px_rgba(79,70,229,0.25)] group-hover:-translate-y-1 transition-all duration-300">
                  <span className="bg-gradient-to-br from-indigo-700 to-purple-600 bg-clip-text text-transparent">
                    Explore All Platform Tools
                  </span>
                  
                  {/* Arrow Icon Wrapper */}
                  <div className="p-1.5 rounded-full bg-indigo-50 group-hover:bg-indigo-600 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </button>
              </Link>
            </div>
          </SlideUp>
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

        {/* SEO Comprehensive Content & Internal Links */}
        <section className="max-w-7xl mx-auto px-8 sm:px-12 py-16 mb-12 bg-white rounded-3xl border border-slate-200/60 shadow-sm">
          <article className="prose prose-slate max-w-none text-sm text-slate-600">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why CodeLens is the Best Free Online Developer Toolkit</h2>
            <p className="mb-4">
              Modern web development requires fast, reliable, and secure tools. Whether you are debugging a complex REST API, evaluating a Git pull request, or simply trying to read a massive configuration file, <strong>CodeLens</strong> offers a premium suite of <Link href="/" className="text-indigo-600 hover:underline">Free Online Developer Tools</Link> designed to run entirely within your browser. By utilizing WebAssembly and the Monaco Editor (the same engine behind VS Code), CodeLens guarantees lightning-fast execution with zero server latency.
            </p>
            <p className="mb-4">
              One of our most popular utilities is the <Link href="/json-viewer" className="text-indigo-600 hover:underline">Online JSON Viewer and Formatter</Link>. Unlike basic text validators, this tool allows you to instantly beautify, minify, and inspect JSON payloads. You can switch to a tree view to collapse nested objects, or copy specific JSON paths (e.g., <code>$.users[0].email</code>) directly to your clipboard. QA testers and frontend engineers use it daily to validate API responses without ever sending their proprietary data to a backend server. 
            </p>
            <p className="mb-4">
              If you need to review code changes, our <Link href="/code-compare" className="text-indigo-600 hover:underline">Online Code Compare</Link> and <Link href="/text-diff" className="text-indigo-600 hover:underline">Text Diff Checker</Link> provide an unparalleled side-by-side comparison experience. It highlights word-level and line-level differences with semantic syntax highlighting for JavaScript, Python, C++, and dozens of other languages.
            </p>
            <p className="mb-6">
              Additionally, security engineers and backend developers rely on our <Link href="/jwt-decoder" className="text-indigo-600 hover:underline">JWT Decoder</Link> to safely inspect JSON Web Tokens. You can verify token headers, payloads, and expiration timestamps securely without the risk of exposing authorization tokens over the network. 
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-slate-100">
              <div className="text-xs text-slate-500 mb-4 sm:mb-0">
                <strong>Internal Directory:</strong> <Link href="/json-viewer" className="hover:text-indigo-600">JSON Viewer</Link> | <Link href="/json-formatter" className="hover:text-indigo-600">JSON Formatter</Link> | <Link href="/code-compare" className="hover:text-indigo-600">Code Diff</Link> | <Link href="/jwt-decoder" className="hover:text-indigo-600">JWT Decoder</Link> | <Link href="/online-code-editor" className="hover:text-indigo-600">Online IDE</Link>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-900">Share CodeLens:</span>
                
                {/* Twitter / X */}
                <a href={`https://twitter.com/intent/tweet?text=Check out CodeLens - Free Online Developer Tools&url=${APP_URL}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 rounded-lg text-xs font-bold transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                  Twitter
                </a>

                {/* LinkedIn */}
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${APP_URL}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0077b5]/10 text-[#0077b5] hover:bg-[#0077b5]/20 rounded-lg text-xs font-bold transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>

                {/* WhatsApp */}
                <a href={`https://api.whatsapp.com/send?text=Check out CodeLens - Free Online Developer Tools: ${APP_URL}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 rounded-lg text-xs font-bold transition-colors">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.405 0 0 5.397 0 12.016c0 2.226.586 4.341 1.656 6.195L.106 24l5.962-1.564A11.967 11.967 0 0012.031 24c6.623 0 12.016-5.397 12.016-12.016C24.047 5.397 18.654 0 12.031 0zm0 22.023c-1.921 0-3.791-.514-5.438-1.488l-.391-.231-4.04 1.059 1.077-3.926-.254-.403A9.972 9.972 0 011.977 12.016c0-5.523 4.498-10.021 10.054-10.021 5.553 0 10.05 4.498 10.05 10.021 0 5.525-4.497 10.023-10.05 10.023zm5.516-7.531c-.302-.151-1.791-.884-2.068-.985-.276-.1-.478-.151-.679.151-.201.302-.779.985-.956 1.186-.176.202-.353.227-.654.076-1.526-.767-2.738-1.748-3.791-3.153-.272-.363-.032-.562.119-.713.136-.136.302-.353.453-.529.151-.176.201-.302.302-.503.1-.202.05-.378-.026-.529-.075-.151-.679-1.637-.931-2.242-.244-.59-.492-.511-.679-.52-.176-.009-.378-.009-.579-.009-.201 0-.529.076-.806.378-.276.302-1.056 1.033-1.056 2.519 0 1.486 1.082 2.923 1.233 3.124.151.202 2.13 3.25 5.158 4.557 1.831.791 2.529.851 3.486.721.727-.099 2.277-.929 2.598-1.826.32-.897.32-1.666.22-1.826-.101-.16-.378-.261-.679-.412z"/></svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
