import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ApiTesterFeature } from "@/features/api-tester/ApiTesterFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Online API Tester | CodeLens",
  description: "Free online REST API testing tool. Configure methods, headers, and request bodies to test REST endpoints and inspect JSON responses directly in the browser.",
  keywords: [
    "api tester",
    "postman clone",
    "test api online",
    "http client",
    "rest api tester",
    "api request",
    "json response viewer",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/api-tester`,
  },
  openGraph: {
    title: "Online API Tester | CodeLens",
    description: "Free online REST API testing tool. Test endpoints, configure headers, and inspect responses instantly.",
    url: `${APP_URL}/api-tester`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online API Tester | CodeLens",
    description: "Free online REST API testing tool. Test endpoints, configure headers, and inspect responses instantly.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function ApiTesterPage() {
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
                API Tester
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Test REST APIs right from your browser. Configure methods, headers, and request bodies to inspect payloads, response times, and status codes.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <ApiTesterFeature />
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border border-white dark:border-slate-700/80 mt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                Powerful HTTP Client in your Browser
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Forget installing bulky desktop apps. Our API Testing tool provides the core functionality of professional HTTP clients like Postman directly in your browser.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">🌐 Full REST Support</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Easily toggle between GET, POST, PUT, PATCH, and DELETE methods. Support for raw JSON bodies allows you to test complex webhook integrations and data mutations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">🛠️ Headers & Parameters</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Build advanced requests by injecting custom HTTP headers (like Authorization tokens) and dynamically generating query parameters for your URLs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">📊 Inspect Responses</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Instantly view formatted JSON responses, track request latency (in milliseconds), payload size, and specific HTTP status codes with visual color-coded badges.
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
