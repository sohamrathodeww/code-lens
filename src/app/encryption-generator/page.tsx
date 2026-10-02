import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HashGeneratorFeature } from "@/features/hash-generator/HashGeneratorFeature";
import { APP_URL } from "@/lib/constants";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

export const metadata: Metadata = {
  title: "Online Encryption & Hash Generator | CodeLens",
  description: "Free online cryptographic tool. Generate secure hashes (MD5, SHA-256) and perform symmetric encryption (AES, DES) completely client-side in your browser.",
  keywords: [
    "md5 generator",
    "sha256 hash",
    "aes encryption",
    "online decrypter",
    "hash generator",
    "crypto tools",
    "des",
    "CodeLens"
  ],
  alternates: {
    canonical: `${APP_URL}/encryption-generator`,
  },
  openGraph: {
    title: "Online Encryption & Hash Generator | CodeLens",
    description: "Generate secure hashes (MD5, SHA-256) and perform symmetric encryption (AES, DES) completely client-side in your browser.",
    url: `${APP_URL}/encryption-generator`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Encryption & Hash Generator | CodeLens",
    description: "Generate secure hashes (MD5, SHA-256) and perform symmetric encryption (AES, DES) completely client-side in your browser.",
    images: [`${APP_URL}/logo-large.jpg`],
  }
};

export default function EncryptionGeneratorPage() {
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
                Encryption & Hash Generator
              </h1>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                Generate secure cryptographic hashes or securely encrypt and decrypt sensitive strings using industry-standard symmetric algorithms.
              </p>
            </div>
          </SlideUp>

          <FadeIn delay={0.2}>
            <HashGeneratorFeature />
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed border border-white dark:border-slate-700/80 mt-16">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-950 dark:text-white tracking-tight">
                Secure Client-Side Cryptography
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Our cryptographic toolset runs entirely within your web browser using highly optimized Web Crypto APIs and CryptoJS. We never transmit or log your secrets, passwords, or plain-text data.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">🛡️ Advanced Hashing</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Generate non-reversible digital fingerprints for your data using MD5, SHA-1, SHA-256, SHA-512, and RIPEMD160. Perfect for verifying file integrity and passwords.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">🔐 Symmetric Encryption</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Secure messages using a secret passphrase with AES (Advanced Encryption Standard), DES, TripleDES, Rabbit, or RC4 cipher algorithms.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h3 className="font-bold text-slate-950 dark:text-white text-base">⚡ Real-Time Processing</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Calculations are performed instantly as you type without requiring network requests, resulting in zero-latency feedback and complete offline support.
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
