
import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";
import { ShieldCheck, Zap, Heart, Globe, ArrowRight } from "lucide-react";
import { SlideUp, FadeIn, Stagger } from "@/components/motion/MotionPrimitives";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us | CodeLens Developer Tools",
  description: "Learn more about CodeLens, our mission, and why we are building the fastest, privacy-first online developer tools suite.",
  keywords: [
    "about codelens",
    "codelens mission",
    "privacy first developer tools",
    "fastest developer tools",
    "online developer utilities",
  ],
  alternates: {
    canonical: `${APP_URL}/about`,
  },
  openGraph: {
    title: "About Us | CodeLens Developer Tools",
    description: "Learn more about CodeLens, our mission, and why we are building the fastest, privacy-first online developer tools suite.",
    url: `${APP_URL}/about`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | CodeLens",
    description: "Learn more about CodeLens and our privacy-first tools.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] text-slate-900 selection:bg-indigo-500/30">
      <FluidCanvas />
      
      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 py-16 lg:py-24 flex-1">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
          
          {/* Header Section */}
          <SlideUp className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm cursor-default">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-slate-600 font-mono">
                Built For Developers
              </span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.1]">
              Engineering a better developer web.
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed text-balance">
              CodeLens was created out of a shared frustration: online tools shouldn't compromise your privacy or slow you down. We're building a native-level utility suite, right inside your browser.
            </p>
          </SlideUp>

          {/* Massive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <SlideUp delay={0.2} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 lg:p-12 space-y-8 flex flex-col justify-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10 group-hover:bg-indigo-500/20 transition-colors duration-500" />
              
              <div className="p-4 rounded-2xl bg-indigo-50 w-fit text-indigo-600 border border-indigo-100">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div className="space-y-4 relative z-10">
                <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Zero Backend Processing.</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-medium">
                  We believe your proprietary code, production payloads, and sensitive tokens should never leave your machine. That's why every tool on CodeLens runs <strong className="text-slate-900">100% locally in your browser memory</strong> using WebAssembly.
                </p>
              </div>
            </SlideUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              
              <SlideUp delay={0.3} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 space-y-6 relative group h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl -z-10 group-hover:bg-amber-500/20 transition-colors duration-500" />
                <div className="p-3 rounded-xl bg-amber-50 w-fit text-amber-600 border border-amber-100">
                  <Zap className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Lightning Fast</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Powered by the Monaco Editor engine, CodeLens achieves instant formatting and diffing without any network latency.
                  </p>
                </div>
              </SlideUp>

              <SlideUp delay={0.4} className="bg-white border border-slate-200 shadow-sm rounded-3xl p-8 space-y-6 relative group h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl -z-10 group-hover:bg-emerald-500/20 transition-colors duration-500" />
                <div className="p-3 rounded-xl bg-emerald-50 w-fit text-emerald-600 border border-emerald-100">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold tracking-tight text-slate-900">Premium UX First</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Developer tools don't have to be ugly. We invest heavily in beautiful typography, smooth animations, and intuitive layouts.
                  </p>
                </div>
              </SlideUp>
              
            </div>
          </div>

          <SlideUp delay={0.5} className="mt-16 text-center relative max-w-sm mx-auto">
            <div className="absolute inset-0 bg-slate-900/10 rounded-[2rem] blur-xl scale-75 group-hover:scale-105 group-hover:bg-slate-900/15 transition-all duration-500 pointer-events-none" />
            <Link href="/tools">
              <Button variant="solid" size="lg" className="w-full sm:w-auto px-10 py-6 text-lg font-bold transition-all duration-300 group hover:scale-[1.02]">
                All Tools
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
            </Link>
          </SlideUp>

        </div>
      </main>

      <Footer />
    </div>
  );
}
