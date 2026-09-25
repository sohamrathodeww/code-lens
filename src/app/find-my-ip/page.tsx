import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FindMyIpFeature } from "@/features/find-my-ip/FindMyIpFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "What Is My IP Address? | Check Public IP Address | CodeLens",
  description: "Find out your public IP address instantly. Our free tool provides detailed network information, ISP details, and geographic location without logging your data.",
  keywords: [
    "what is my ip",
    "find my ip address",
    "check public ip",
    "my ip location",
    "ip address checker",
    "ipv4 address",
    "ipv6 address",
    "isp detector",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/find-my-ip`,
  },
  openGraph: {
    title: "What Is My IP Address? | CodeLens",
    description: "Detect your public IPv4/IPv6 address, geolocation, and ISP instantly.",
    url: `${APP_URL}/find-my-ip`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "What Is My IP Address? | CodeLens",
    description: "Detect your public IPv4/IPv6 address, geolocation, and ISP instantly.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function FindMyIpPage() {
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
                What Is My IP Address?
              </h1>
              <p className="text-lg text-slate-500 font-medium">
                Instantly detect your public IPv4 or IPv6 address, along with detailed geolocation and ISP network details.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <FindMyIpFeature />
          </FadeIn>
          
          {/* High-Ranking SEO Information Section */}
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80 mt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
                Secure & Private IP Address Checker
              </h2>
              <p className="text-slate-600">
                CodeLens provides a fast and highly accurate tool to check your public IP address. Your IP address is your unique identifier on the internet, assigned to you by your Internet Service Provider (ISP). Knowing your IP address is essential for configuring firewalls, setting up gaming servers, or troubleshooting networking issues.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🌍 Instant Geolocation</h3>
                <p className="text-xs text-slate-600">
                  We pinpoint the geographic location tied to your IP, showing your detected city, region, and country coordinates to help you verify VPN connections or proxy servers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">📡 ISP Detection</h3>
                <p className="text-xs text-slate-600">
                  Quickly identify which Internet Service Provider or organization owns the IP address space you are currently utilizing, along with the ASN (Autonomous System Number).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
                <h3 className="font-bold text-slate-950 text-base">🔒 Zero Data Logging</h3>
                <p className="text-xs text-slate-600">
                  Your privacy is our priority. We do not store, log, or track your IP address when you use this tool. The check is performed in real-time and discarded immediately.
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
