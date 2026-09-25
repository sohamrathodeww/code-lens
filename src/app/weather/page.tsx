import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WeatherFeature } from "@/features/weather/WeatherFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Online Weather & Forecast | Check Live Local Weather | CodeLens",
  description: "Check live weather conditions and 4-day forecasts for any city, state, or country worldwide. Instant geolocation-based local weather.",
  keywords: [
    "weather",
    "forecast",
    "local weather",
    "live weather",
    "weather check",
    "city weather",
    "weather tool",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/weather`,
  },
  openGraph: {
    title: "Online Weather & Forecast | CodeLens",
    description: "Check live local weather conditions and multi-day forecasts for any area worldwide.",
    url: `${APP_URL}/weather`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Weather & Forecast | CodeLens",
    description: "Check live local weather conditions and multi-day forecasts for any area worldwide.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function WeatherPage() {
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
                Live Weather & Forecast
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Search for any city, state, or country to get instant access to live weather conditions, wind speeds, and multi-day forecasts.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <WeatherFeature />
          </FadeIn>
          
          {/* High-Ranking SEO Information Section */}
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80 mt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
                Global Weather Tracking at Your Fingertips
              </h2>
              <p className="text-slate-600">
                CodeLens provides an instant, highly accurate global weather checking tool. Powered by leading meteorological APIs, you can check the current temperature, humidity, wind speed, and upcoming forecasts for virtually any location on Earth without dealing with cluttered ads or popups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">📍 Auto-Detect Location</h3>
                <p className="text-xs text-slate-600">
                  By default, the tool requests permission to instantly fetch your local geographic coordinates, giving you an immediate view of your local weather conditions the moment you load the page.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🔍 Universal Geocoding</h3>
                <p className="text-xs text-slate-600">
                  Search for a specific area, city, state, or country. The intelligent geocoding engine will match your query to the correct global coordinates and retrieve localized forecasts.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">📅 Multi-Day Forecasting</h3>
                <p className="text-xs text-slate-600">
                  Don't just look at the current radar. We provide a clean, visual 4-day outlook highlighting daily high and low temperatures along with general weather conditions.
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
