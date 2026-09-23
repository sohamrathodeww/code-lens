import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { CodeCompareFeature } from "@/features/code-compare/CodeCompareFeature";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Text Compare Tool – Free Text Diff Checker | CodeLens",
  description:
    "Online Text Compare is a free, high-performance browser text diff tool. Compare text, source code, JSON, and documents side-by-side with clear line & character difference highlighting.",
  keywords: [
    "Online Text Compare",
    "online text compare",
    "text compare",
    "text diff",
    "text difference",
    "code diff",
    "compare text online",
    "online text diff tool",
    "text difference checker",
    "online text compare tool",
    "free text compare",
    "side by side text compare",
    "code difference",
    "diff checker online",
    "compare two text files",
    "text comparison tool free",
    "git diff checker online",
    "CodeLens Online Text Compare",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/code-compare`,
  },
  openGraph: {
    title: "Online Text Compare — Free Side-by-Side Text Diff Tool | CodeLens",
    description:
      "Compare text and code side-by-side online with line-by-line & character diff highlighting, sample datasets, side swapping, and instant line count metrics.",
    url: `${APP_URL}/tools/code-compare`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Text Compare — Free Text Diff Tool | CodeLens",
    description:
      "Compare text side-by-side online with real-time text diffing, sample data, swap sides, and character-level highlighting.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/tools/code-compare/#webapp`,
      name: "CodeLens Online Text Compare",
      url: `${APP_URL}/tools/code-compare`,
      description:
        "Free online text compare and diff tool for comparing text and code side-by-side with line and character diff highlighting.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "HowTo",
      "@id": `${APP_URL}/tools/code-compare/#howto`,
      name: "How to Compare Text Online using CodeLens Online Text Compare",
      description:
        "Step-by-step instructions for comparing two text snippets or documents side-by-side online.",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter Original Text",
          text: "Paste your original text or baseline content into the left pane.",
        },
        {
          "@type": "HowToStep",
          name: "Enter Modified Text",
          text: "Paste your modified text or updated content into the right pane.",
        },
        {
          "@type": "HowToStep",
          name: "Inspect Text Differences",
          text: "Review additions highlighted in green, deletions in red, and inline character modifications.",
        },
        {
          "@type": "HowToStep",
          name: "Swap Sides or Copy",
          text: "Use the Swap button to interchange left and right panes instantly, or copy formatted text.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/tools/code-compare/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Online Text Compare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online Text Compare is a free web-based utility that allows writers, developers, and QA testers to compare two text passages, code snippets, or documents side-by-side with exact line-by-line and character-level diff highlighting.",
          },
        },
        {
          "@type": "Question",
          name: "How do I compare text online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste your original text into the Left pane and your updated text into the Right pane, or click 'Sample' to load demonstration text.",
          },
        },
        {
          "@type": "Question",
          name: "How do I swap the original and modified text sides?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the 'Swap Sides' button in the toolbar to instantly interchange text content and line counts between left and right boxes.",
          },
        },
        {
          "@type": "Question",
          name: "Is my text secure when using Online Text Compare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 100% of the text comparison runs locally in your browser memory. No text or private data is transmitted to or stored on external servers.",
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

        {/* High-Ranking SEO Information & Keywords Section */}
        <section className="liquid-glass-surface p-8 sm:p-10 space-y-8 text-slate-700 text-sm leading-relaxed border border-white/80 rounded-3xl shadow-xl">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Online Text Compare — Free Side-by-Side Text Diff & Code Difference Tool
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              CodeLens <strong>Online Text Compare</strong> is engineered for writers, developers, devops engineers, and content reviewers who need to <strong>compare text online</strong> and inspect <strong>code differences</strong> fast. Our <strong>online text diff tool</strong> delivers real-time, line-by-line and character-level diff comparison, side swapping, clean code formatting, and zero server storage.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2.5">
              <h3 className="font-extrabold text-slate-950 text-base">⚡ Real-Time Text & Code Diffing</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Highlight additions in soft green, deletions in soft red, and exact character modifications inline without messy full-line background blocks.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2.5">
              <h3 className="font-extrabold text-slate-950 text-base">🔄 Instant Side Swapping & Reset</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Flip left and right text panes instantly with a single click of <strong>Swap Sides</strong>, load pre-configured sample text, or click <strong>Clear</strong> to start fresh.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2.5">
              <h3 className="font-extrabold text-slate-950 text-base">🔒 100% Client-Side Privacy</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Your content stays 100% private. All text comparison, diff calculation, and word matching occur locally inside browser memory.
              </p>
            </div>
          </div>

          {/* Step-by-Step How-To Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
              How to Compare Text Online in 3 Simple Steps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 1</span>
                <h4 className="font-bold text-slate-900 text-sm">Paste Original Text</h4>
                <p className="text-xs text-slate-600">Insert baseline text or original snippet into the Left pane.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 2</span>
                <h4 className="font-bold text-slate-900 text-sm">Paste Modified Text</h4>
                <p className="text-xs text-slate-600">Insert modified text or updated snippet into the Right pane.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 3</span>
                <h4 className="font-bold text-slate-900 text-sm">Inspect Differences</h4>
                <p className="text-xs text-slate-600">Inspect diff counters (+Added, -Deleted, ~Modified), swap sides if needed, or copy content.</p>
              </div>
            </div>
          </div>

          {/* Detailed FAQ Section for Search Engine Snippets */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
              Frequently Asked Questions (FAQ) — Online Text Compare
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Why use CodeLens Online Text Compare?</h4>
                <p className="text-xs text-slate-600">
                  CodeLens Online Text Compare provides clean, readable side-by-side diff highlighting for text and code without distracting background fills.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Can I compare code snippets and JSON text?</h4>
                <p className="text-xs text-slate-600">
                  Yes, Online Text Compare easily compares source code, JSON objects, raw text documents, and configuration files.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Is my text stored or uploaded anywhere?</h4>
                <p className="text-xs text-slate-600">
                  No. 100% of text parsing and diffing occurs locally in your browser memory. No text payload is transmitted to any server.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Can I format code before diffing?</h4>
                <p className="text-xs text-slate-600">
                  Yes, use the 'Format Code' button to automatically format JSON or JS code in both editors for cleaner diff comparison.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}


