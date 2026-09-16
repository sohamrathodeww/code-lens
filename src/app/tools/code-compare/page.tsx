import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { CodeCompareFeature } from "@/features/code-compare/CodeCompareFeature";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://devstudio-tools.vercel.app";

export const metadata: Metadata = {
  title: "Free Online Code Compare & Diff Tool — Side-by-Side Monaco Editor",
  description:
    "Free online code diff tool powered by Monaco Engine. Compare source code side-by-side or inline with syntax highlighting across 13+ languages and dual 5MB file upload.",
  keywords: [
    "code compare online",
    "online code diff tool",
    "monaco diff editor",
    "side by side code diff",
    "inline text diff",
    "compare javascript online",
    "compare python code",
    "diff checker 5mb",
    "compare text online",
    "free code comparison",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/code-compare`,
  },
  openGraph: {
    title: "Free Online Code Compare & Diff Tool | CodeLens",
    description:
      "Compare source code side-by-side or inline with Monaco diff engine, syntax highlighting, and dual 5MB file upload.",
    url: `${APP_URL}/tools/code-compare`,
    siteName: "CodeLens",
    images: ["/logo-large.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Code Compare Tool — CodeLens",
    description:
      "Compare code side-by-side or inline with Monaco diff engine and syntax highlighting.",
    images: ["/logo-large.jpg"],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${APP_URL}/tools/code-compare/#webapp`,
      name: "CodeLens Online Code Compare Studio",
      url: `${APP_URL}/tools/code-compare`,
      description:
        "Free online code diff tool powered by Monaco Engine for comparing source code side-by-side or inline.",
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
      "@id": `${APP_URL}/tools/code-compare/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I compare two code files online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste your original code into the Original pane and your updated code into the Modified pane, or upload two files up to 5MB to see instant line-by-line diff highlighting.",
          },
        },
        {
          "@type": "Question",
          name: "What programming languages are supported?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CodeLens supports syntax highlighting for 13+ languages including JavaScript, TypeScript, Python, HTML, CSS, JSON, SQL, Java, C++, Go, Rust, Ruby, and PHP.",
          },
        },
        {
          "@type": "Question",
          name: "Can I switch between side-by-side and inline diff views?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, use the Split / Inline view toggle button to switch between two-column split diff view and single-column unified diff view.",
          },
        },
        {
          "@type": "Question",
          name: "Are my compared code files kept private?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Monaco diff engine processes all code comparisons locally inside your web browser. Nothing is uploaded or stored on external servers.",
          },
        },
      ],
    },
  ],
};

export default function CodeComparePage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <Navbar />

      <main className="relative z-10 max-w-[1750px] w-full mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 space-y-12">
        <CodeCompareFeature />

        {/* High-Ranking SEO Information Section */}
        <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              High-Performance Monaco Code Compare & Diff Studio
            </h2>
            <p className="text-slate-600">
              CodeLens Code Compare Studio provides a professional side-by-side and inline diff tool built on VS Code's Monaco Editor engine for instant code auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">⚡ Monaco Diff Engine</h3>
              <p className="text-xs text-slate-600">
                Identifies additions, deletions, and line-level changes with exact line numbers and synchronized scrolling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">🌐 13+ Syntax Highlighters</h3>
              <p className="text-xs text-slate-600">
                Switch syntax modes dynamically for JavaScript, TypeScript, Python, JSON, SQL, HTML, CSS, C++, Java, and Go.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">🔒 Client-Side Privacy</h3>
              <p className="text-xs text-slate-600">
                Zero server tracking. Diff calculations and file parsing remain strictly inside browser memory.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
