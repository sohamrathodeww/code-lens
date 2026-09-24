import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { JsonCompareFeature } from "@/features/json-compare/JsonCompareFeature";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Online JSON Compare & Diff Checker – Free Tool | CodeLens",
  description:
    "Free online JSON compare tool. Swap, format, and diff two JSON objects side-by-side with accurate line and character-level change tracking.",
  keywords: [
    "json compare online",
    "online json diff",
    "json diff checker",
    "compare json files",
    "side by side json compare",
    "json comparison tool",
    "format and compare json",
  ],
  alternates: {
    canonical: `${APP_URL}/json-compare`,
  },
  openGraph: {
    title: "Free Online JSON Compare & Diff Checker",
    description:
      "Easily compare two JSON payloads side-by-side. Automatically format, swap, and find deep differences instantly.",
    url: `${APP_URL}/json-compare`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/json-compare/#webapp`,
      name: "CodeLens Online JSON Compare",
      url: `${APP_URL}/json-compare`,
      description: "Free online side-by-side JSON compare and diff checker.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    }
  ],
};

export default function JsonComparePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <Navbar />

      <main className="relative z-10 max-w-[1750px] w-full mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 space-y-12">
        <JsonCompareFeature />

        {/* High-Ranking SEO Information Section */}
        <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              Free Online JSON Compare & Diff Tool
            </h2>
            <p className="text-slate-600">
              CodeLens JSON Compare is a specialized utility designed to identify differences between two JSON payloads. By automatically formatting and structuring raw JSON strings, it provides highly accurate line-by-line and character-level comparisons for debugging APIs, configs, and application states.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">✨ Auto JSON Formatting</h3>
              <p className="text-xs text-slate-600">
                Instantly parse and beautify raw JSON data on both sides simultaneously. This guarantees that your diff reflects structural changes rather than arbitrary whitespace or minification differences.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">↔️ Swap & Sync</h3>
              <p className="text-xs text-slate-600">
                Easily swap your original and modified JSON objects with a single click to reverse the comparison direction. Edit directly in the Monaco editor panels and watch the diff compute in real time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">🔒 100% Client-Side Privacy</h3>
              <p className="text-xs text-slate-600">
                Your JSON payloads are completely secure. The JSON parsing, stringification, and differential computation all execute directly inside your browser memory without backend servers.
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-100 flex gap-4 text-xs font-semibold">
            <Link href="/json-viewer" className="text-indigo-600 hover:underline">JSON Viewer</Link>
            <Link href="/code-compare" className="text-indigo-600 hover:underline">Code Compare</Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
