import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QrGeneratorFeature } from "@/features/qr-generator/QrGeneratorFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Online QR Code Generator | CodeLens",
  description: "Free professional online QR code generator. Create highly customizable QR codes with custom colors, logos, and high-quality SVG/PNG exports.",
  keywords: [
    "qr code",
    "qr generator",
    "online qr code maker",
    "qr code with logo",
    "generate qr code",
    "free qr code",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/qr-generator`,
  },
  openGraph: {
    title: "Online QR Code Generator | CodeLens",
    description: "Create highly customizable QR codes with custom colors, logos, and high-quality SVG/PNG exports.",
    url: `${APP_URL}/qr-generator`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online QR Code Generator | CodeLens",
    description: "Create highly customizable QR codes with custom colors, logos, and high-quality SVG/PNG exports.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function QrGeneratorPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300 selection:bg-indigo-500/30">
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <SlideUp delay={0.1}>
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-slate-950 dark:text-white">
                QR Code Generator
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Create highly customizable QR codes for URLs, text, and more. Customize colors, embed your brand logo, and download high-quality assets.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <QrGeneratorFeature />
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border border-white dark:border-slate-700/80 dark:border-slate-700/80 mt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                Advanced QR Code Generation
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Generate static QR codes that never expire. Our generator runs completely in your browser, ensuring no data is sent to our servers. Perfect for business cards, marketing materials, and digital sharing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">🎨 Full Customization</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Easily brand your QR codes by changing the foreground and background colors to match your identity.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">🖼️ Logo Integration</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Upload your brand logo and place it perfectly in the center with automatically adjusted error correction levels.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">💾 High-Res Downloads</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Export your generated QR code in multiple formats including vector SVG and high-resolution PNG for printing.
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
