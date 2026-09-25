import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Base64ConverterFeature } from "@/features/base64-converter/Base64ConverterFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Base64 Encoder & Decoder | Online Base64 Converter | CodeLens",
  description: "Free online Base64 encoder and decoder. Convert text to Base64 format or decode Base64 strings to plain text instantly in your browser with full UTF-8 support.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode to base64",
    "decode base64",
    "online base64 tool",
    "utf8 base64",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/base64-converter`,
  },
  openGraph: {
    title: "Base64 Encoder & Decoder | CodeLens",
    description: "Convert text to Base64 format or decode Base64 strings to plain text instantly.",
    url: `${APP_URL}/base64-converter`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base64 Encoder & Decoder | CodeLens",
    description: "Convert text to Base64 format or decode Base64 strings to plain text instantly.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function Base64ConverterPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] text-slate-900 selection:bg-indigo-500/30">
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <SlideUp delay={0.1}>
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950">
                Base64 Encoder & Decoder
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Encode plain text into Base64 format or decode Base64 strings back to text instantly. Features full UTF-8 support and client-side processing.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <Base64ConverterFeature />
          </FadeIn>
          
          {/* High-Ranking SEO Information Section */}
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80 mt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
                Secure & Fast Base64 Conversion
              </h2>
              <p className="text-slate-600">
                CodeLens provides an instant, secure, and privacy-focused Base64 encoding and decoding utility. Base64 is widely used on the web to safely transmit data across channels that only reliably support text content.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🌐 Full UTF-8 Support</h3>
                <p className="text-xs text-slate-600">
                  Unlike basic converters, our tool natively handles complex UTF-8 strings, special characters, and emojis without crashing or producing malformed output.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">⚡ Instant Real-Time Conversion</h3>
                <p className="text-xs text-slate-600">
                  No submit buttons required. As you type or paste your data, the converter operates synchronously in real-time, instantly rendering the output.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🔒 100% Client-Side Privacy</h3>
                <p className="text-xs text-slate-600">
                  We value your security. The encoding and decoding happens entirely within your web browser using native APIs. No data is ever transmitted to or stored on our servers.
                </p>
              </div>
            </div>
          </section>
          </FadeIn>
        </div>
      </main>

      <Footer />
    </div>
  );
}
