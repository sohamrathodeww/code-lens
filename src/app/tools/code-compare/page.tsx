import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { CodeCompareFeature } from "@/features/code-compare/CodeCompareFeature";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Code Diff & Compare Tool – Free | CodeLens",
  description:
    "Online Code Compare is a free, high-performance browser code diff tool powered by Monaco Engine. Compare source code, text files, JSON, and scripts side-by-side with syntax highlighting across 13+ languages.",
  keywords: [
    "Online Code Compare",
    "online code compare",
    "compare code online",
    "code compare tool online",
    "free online code compare",
    "side by side code compare",
    "monaco diff editor online",
    "online code diff checker",
    "compare two code files",
    "javascript online code compare",
    "python code compare online",
    "sql code compare tool",
    "json diff tool online",
    "browser code diff viewer",
    "code comparison tool free",
    "git diff checker online",
    "CodeLens Online Code Compare",
  ],
  alternates: {
    canonical: `${APP_URL}/tools/code-compare`,
  },
  openGraph: {
    title: "Online Code Compare — Free Side-by-Side Code Diff Tool | CodeLens",
    description:
      "Compare source code side-by-side online with Monaco diff engine, syntax highlighting, sample datasets, side swapping, and dual 5MB file upload.",
    url: `${APP_URL}/tools/code-compare`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Code Compare — Free Code Diff Tool | CodeLens",
    description:
      "Compare code side-by-side online with Monaco diff engine, sample data, swap sides, and syntax highlighting.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/tools/code-compare/#webapp`,
      name: "CodeLens Online Code Compare",
      url: `${APP_URL}/tools/code-compare`,
      description:
        "Free online code compare and diff tool powered by Monaco Engine for comparing source code side-by-side with syntax highlighting.",
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
      name: "How to Compare Code Online using CodeLens Online Code Compare",
      description:
        "Step-by-step instructions for comparing two code snippets or files side-by-side online with Monaco diff engine.",
      step: [
        {
          "@type": "HowToStep",
          name: "Enter Original Code",
          text: "Paste your original source code or upload the original file (up to 5MB) into the left pane.",
        },
        {
          "@type": "HowToStep",
          name: "Enter Modified Code",
          text: "Paste your modified source code or upload the updated file (up to 5MB) into the right pane.",
        },
        {
          "@type": "HowToStep",
          name: "Select Syntax Language",
          text: "Choose your target language (TypeScript, JavaScript, Python, SQL, JSON, Rust, Go, etc.) for syntax highlighting.",
        },
        {
          "@type": "HowToStep",
          name: "Inspect Differences & Swap Sides",
          text: "Review additions highlighted in green and deletions highlighted in red. Use the Swap button to swap left and right panes instantly.",
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/tools/code-compare/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Online Code Compare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online Code Compare is a free web-based utility powered by Monaco Editor that allows software engineers, web developers, and QA testers to compare two code snippets or text files side-by-side with line-by-line diff highlighting.",
          },
        },
        {
          "@type": "Question",
          name: "How do I compare two code files online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste your original code into the Left pane and your updated code into the Right pane, click 'Sample' to load demonstration code, or click 'Upload Files' to select two code files up to 5MB each.",
          },
        },
        {
          "@type": "Question",
          name: "How do I swap the original and modified code sides?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the 'Swap Sides' button in the toolbar to instantly interchange the code content, line counts, and filenames between left and right boxes.",
          },
        },
        {
          "@type": "Question",
          name: "What programming languages are supported by Online Code Compare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online Code Compare supports syntax-highlighted diffing for 13+ languages including TypeScript, JavaScript, Python, HTML, CSS, SQL, C/C++, Java, Rust, Go, YAML, XML, and Markdown.",
          },
        },
        {
          "@type": "Question",
          name: "Is my code secure when using Online Code Compare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, 100% of the code comparison runs locally in your browser memory via Monaco Engine. No code or files are transmitted to or stored on external servers.",
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
              Online Code Compare — Free Side-by-Side Code Diff Tool for Developers
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              CodeLens <strong>Online Code Compare</strong> is engineered for software developers, devops engineers, code reviewers, and data analysts who need to <strong>compare code online</strong> fast. Built on the industry-standard Monaco Editor engine (the engine behind Visual Studio Code), our <strong>online code diff tool</strong> delivers real-time, line-by-line syntax comparison, file uploads up to 5MB, side swapping, and zero server storage.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2.5">
              <h3 className="font-extrabold text-slate-950 text-base">⚡ Monaco Side-by-Side Diff Engine</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Highlight additions in green and deletions in red with syntax-aware comparison for TypeScript, JavaScript, Python, SQL, JSON, Rust, Go, and 6+ more languages.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2.5">
              <h3 className="font-extrabold text-slate-950 text-base">🔄 Instant Side Swapping & Reset</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Flip left and right panes instantly with a single click of <strong>Swap Sides</strong>, load pre-configured sample datasets, or click <strong>Reset</strong> to start a fresh code diff review.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs space-y-2.5">
              <h3 className="font-extrabold text-slate-950 text-base">🔒 100% Browser Client-Side Privacy</h3>
              <p className="text-xs text-slate-600 leading-normal">
                Your proprietary source code stays private. All diff calculations, syntax rendering, and file parsing occur locally inside browser memory.
              </p>
            </div>
          </div>

          {/* Step-by-Step How-To Section */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
              How to Compare Code Online in 4 Simple Steps
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 1</span>
                <h4 className="font-bold text-slate-900 text-sm">Paste Original Code</h4>
                <p className="text-xs text-slate-600">Insert your original source code or upload the baseline file in the Left pane.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 2</span>
                <h4 className="font-bold text-slate-900 text-sm">Paste Modified Code</h4>
                <p className="text-xs text-slate-600">Insert your updated refactored code or upload the modified file in the Right pane.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 3</span>
                <h4 className="font-bold text-slate-900 text-sm">Select Language</h4>
                <p className="text-xs text-slate-600">Select language from dropdown for high-precision syntax color highlighting.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-100/80 border border-slate-200/60 space-y-1">
                <span className="text-xs font-mono font-bold text-indigo-600">STEP 4</span>
                <h4 className="font-bold text-slate-900 text-sm">Review & Export</h4>
                <p className="text-xs text-slate-600">Inspect diff statistics (+Added, -Deleted), swap sides if needed, or copy code.</p>
              </div>
            </div>
          </div>

          {/* Detailed FAQ Section for Search Engine Snippets */}
          <div className="space-y-4 pt-4 border-t border-slate-200/80">
            <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
              Frequently Asked Questions (FAQ) — Online Code Compare
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Why use CodeLens Online Code Compare instead of basic diff tools?</h4>
                <p className="text-xs text-slate-600">
                  Unlike simple text diff viewers, CodeLens Online Code Compare uses Monaco Editor, offering IDE-grade code highlighting, side-by-side view, file uploads up to 5MB, side swapping, dark/light theme switching, and instant line count metrics.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Can I compare large files with Online Code Compare?</h4>
                <p className="text-xs text-slate-600">
                  Yes, Online Code Compare supports file uploads up to 5MB per file for both original and modified panes, handling thousands of lines of code smoothly in the browser.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Which code languages are supported for diff checking?</h4>
                <p className="text-xs text-slate-600">
                  Supported syntax definitions include TypeScript, JavaScript, Python, SQL, JSON, HTML, CSS, C/C++, Java, Rust, Go, YAML, XML, and Markdown.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-slate-900 text-sm">Is my source code uploaded or saved on external servers?</h4>
                <p className="text-xs text-slate-600">
                  No. 100% of code parsing, diffing, and rendering occurs inside your client web browser memory. No code payload is transmitted across the network.
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

