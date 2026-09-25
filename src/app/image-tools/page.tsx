import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ImageToolsFeature } from "@/features/image-tools/ImageToolsFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Online Image Tools | Convert, Compress & Resize | CodeLens",
  description: "Free online image tools. Convert PNG to JPG, JPG to PNG, compress image size, and resize images instantly with high quality.",
  keywords: [
    "image converter",
    "png to jpg",
    "jpg to png",
    "image resizer",
    "image compressor",
    "free image tools",
    "webp converter",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/image-tools`,
  },
  openGraph: {
    title: "Online Image Tools | CodeLens",
    description: "Convert PNG to JPG, compress image size, and resize images instantly.",
    url: `${APP_URL}/image-tools`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Image Tools | CodeLens",
    description: "Convert, Compress & Resize images online for free.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function ImageToolsPage() {
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
                Free Online Image Tools Hub
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Convert, compress, and resize your images securely in seconds.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <ImageToolsFeature />
          </FadeIn>
          
          {/* High-Ranking SEO Information Section */}
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 rounded-3xl space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border border-white dark:border-slate-700/80 dark:border-slate-700/80">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                How to Use the Free Image Tools Hub
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                CodeLens provides an instant, privacy-focused image processing suite. Follow these simple steps to process your images securely:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-16 h-16 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <h3 className="font-bold text-slate-950 dark:text-white text-base">1. Image Converter</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Select the <strong>Image Converter</strong> tool. Drop any PNG, JPG, WebP, or GIF into the Original Image pane. Choose your desired target format from the dropdown, adjust the output quality, and click process. Your image will instantly convert format without losing core details.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                <h3 className="font-bold text-slate-950 dark:text-white text-base">2. Image Compressor</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Select the <strong>Image Compressor</strong> tool. Upload your heavy file (e.g. 5MB). Lower the Compression Quality slider (e.g. to 60%) and click Process Image. We will drastically reduce the file size while maintaining excellent visual quality.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 space-y-2 relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-16 h-16 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                <h3 className="font-bold text-slate-950 dark:text-white text-base">3. Image Resizer</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Select the <strong>Image Resizer</strong> tool. Upload an image, then enter either a new Width or Height in pixels. If you leave one blank, we will automatically calculate it to perfectly maintain the original aspect ratio without distortion.
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



