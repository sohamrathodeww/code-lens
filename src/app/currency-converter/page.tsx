import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CurrencyConverterFeature } from "@/features/currency-converter/CurrencyConverterFeature";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Currency Converter | Real-time Exchange Rates",
  description: "Free online currency converter. Get real-time live exchange rates, convert between 150+ global fiat currencies instantly with our professional and beautiful UI.",
  keywords: [
    "currency converter",
    "exchange rates",
    "online currency converter",
    "live exchange rates",
    "fiat converter",
    "free currency converter"
  ],
  alternates: {
    canonical: `${APP_URL}/currency-converter`,
  }
};

export default function CurrencyConverterPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#fbfcfd] text-slate-900 selection:bg-indigo-500/30">
      <div className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-3xl opacity-60" />
      </div>

      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 flex-1 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <CurrencyConverterFeature />
          
          {/* High-Ranking SEO Information Section */}
          <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-950 tracking-tight">
                Free Online Currency Converter & Live Exchange Rates
              </h1>
              <p className="text-slate-600">
                CodeLens provides the fastest, most accurate online currency converter on the web. Designed for international travelers, global e-commerce, and developers managing cross-border financial applications, our calculator provides immediate access to reliable fiat exchange rates without tracking or popups.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🌐 150+ Global Currencies</h3>
                <p className="text-xs text-slate-600">
                  Instantly search and convert between over 150 standard fiat currencies including USD, EUR, GBP, JPY, and INR. Every currency is matched with its real-time conversion value.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🔒 100% Privacy Focused</h3>
                <p className="text-xs text-slate-600">
                  Unlike traditional finance tools, all input amounts are processed locally in your browser. Absolutely no financial data or conversion inputs leave your device.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">⚡ Multi-API Fallback Engine</h3>
                <p className="text-xs text-slate-600">
                  Built with redundant multi-API failovers, ensuring the calculator remains highly available and accurate even if a primary financial data source goes offline.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
