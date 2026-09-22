import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { OnlineTranslatorFeature } from "@/features/online-translator/OnlineTranslatorFeature";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Translator – Free Accurate Text & Language Converter | CodeLens",
  description:
    "CodeLens Free Online Translator supports accurate text translation across 100+ languages with auto language detection, multi-engine failover, and client privacy.",
  keywords: [
    "CodeLens online translator",
    "free online translator",
    "text translator online",
    "accurate language converter",
    "auto detect language translator",
    "translate developer docs",
    "multi language translation tool",
    "free translate api online",
    "browser text translator",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/online-translator`,
  },
  openGraph: {
    title: "Free Online Translator & Multi-Language Converter — CodeLens",
    description:
      "Accurate online text translation for 100+ languages with auto language detection and multi-provider failover.",
    url: `${APP_URL}/tools/online-translator`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Translator — CodeLens",
    description: "Translate text online across 100+ languages with client privacy and failover backup.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/tools/online-translator/#webapp`,
      name: "CodeLens Free Online Translator",
      url: `${APP_URL}/tools/online-translator`,
      description:
        "Free accurate online translation utility supporting 100+ languages, auto-language detection, side-by-side view, character counter, and multi-engine failover.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/tools/online-translator/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How does CodeLens Online Translator handle translation rate limits?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CodeLens features a multi-provider failover engine. When a primary translation engine reaches free usage limits, CodeLens prompts you to confirm and automatically switches to a backup engine to complete your translation.",
          },
        },
        {
          "@type": "Question",
          name: "Which languages are supported by CodeLens Online Translator?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CodeLens supports over 100 global languages including English, Spanish, French, German, Chinese, Japanese, Korean, Hindi, Arabic, Russian, Portuguese, Italian, Dutch, and auto-detect mode.",
          },
        },
        {
          "@type": "Question",
          name: "Is my text saved or logged on CodeLens servers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, CodeLens does not store or persist your input or translated text. All operations are processed live in-memory for maximum developer privacy.",
          },
        },
      ],
    },
  ],
};

export default function OnlineTranslatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-indigo-900 relative">
        <FluidCanvas />
        <Navbar />

        <main className="flex-1 max-w-[1750px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-12 relative z-10">
          <OnlineTranslatorFeature />

          {/* Educational SEO & Developer Guide Section */}
          <section className="liquid-glass-surface p-6 sm:p-10 space-y-8">
            <span className="lens-sheen" />
            <div className="max-w-3xl space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-sans">
                Why Use CodeLens Free Online Translator?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Engineering teams and developers often need to translate technical documentation, API error messages, commit messages, and internationalized (i18n) content into different languages without hitting strict paywalls or manual service disruptions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase">
                  1. Automatic Failover
                </span>
                <h3 className="text-sm font-bold text-slate-950 font-sans">
                  Multi-Provider Backup
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  If one free engine experiences rate limits or high load, CodeLens prompts you to confirm and seamlessly continues translation using backup engines.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase">
                  2. 100+ Languages
                </span>
                <h3 className="text-sm font-bold text-slate-950 font-sans">
                  Global Coverage
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Supports English, Spanish, French, German, Chinese, Japanese, Hindi, Arabic, Russian, Portuguese, and dozens of regional languages.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-mono font-extrabold text-rose-600 uppercase">
                  3. Privacy First
                </span>
                <h3 className="text-sm font-bold text-slate-950 font-sans">
                  No Database Persistence
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Your code snippets, strings, and developer text remain ephemeral and are never stored in databases or user profiling tools.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
