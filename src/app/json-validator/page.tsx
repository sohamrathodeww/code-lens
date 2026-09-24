import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { JsonViewerFeature } from "@/features/json-viewer/JsonViewerFeature";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online JSON Viewer & Formatter – Free, No Upload | CodeLens",
  description:
    "CodeLens JSON Viewer is a free online JSON formatter, beautifier, minifier, validator, and tree inspector for developers working with API payloads, configuration files, and structured data.",
  keywords: [
    "CodeLens JSON viewer",
    "online json viewer",
    "json viewer online",
    "json beautifier",
    "json formatter online",
    "json minifier",
    "json tree inspector",
    "json validator",
    "json to table",
    "json diagram viewer",
    "json flowchart",
    "json hierarchy map",
    "json path copy",
    "free json validator",
    "api payload formatter",
    "developer JSON tools",
  ],
  alternates: {
    canonical: `${APP_URL}/json-validator`,
  },
  openGraph: {
    title: "Free Online JSON Viewer, Beautifier & Flow Chart Diagram | CodeLens",
    description:
      "Format, beautify, minify, inspect tree nodes, view tabular data, and generate interactive flow chart diagrams online for free.",
    url: `${APP_URL}/json-validator`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online JSON Viewer, Beautifier & Diagram Inspector — CodeLens",
    description:
      "Format, beautify, minify, inspect tree nodes, view tables, and generate flow chart diagrams online.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/json-validator/#webapp`,
      name: "CodeLens Online JSON Viewer",
      url: `${APP_URL}/json-validator`,
      description:
        "Free online JSON viewer, beautifier, minifier, tree node inspector, tabular data grid, and flow chart diagram viewer.",
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
      "@id": `${APP_URL}/json-validator/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I format and beautify JSON online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste your raw JSON code or upload a file up to 5MB into the input editor and click the Format button to beautify it with syntax highlighting.",
          },
        },
        {
          "@type": "Question",
          name: "Can I convert JSON into a table grid view?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, CodeLens automatically parses arrays of objects or key-value entries into a searchable, sortable tabular data grid table.",
          },
        },
        {
          "@type": "Question",
          name: "How does the JSON flow chart diagram work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Click the Diagram Chart tab to generate an interactive parent-to-child node flow chart visualizing root objects, nested entities, and array relationships.",
          },
        },
        {
          "@type": "Question",
          name: "Is my JSON payload kept private and secure?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. All JSON formatting, tree node inspection, and analytics processing run entirely client-side in your browser memory.",
          },
        },
      ],
    },
  ],
};

export default function JsonViewerPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <Navbar />

      <main className="relative z-10 max-w-[1750px] w-full mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 space-y-12">
        <JsonViewerFeature />

        {/* High-Ranking SEO Information Section */}
        <section className="liquid-glass-surface p-8 space-y-6 text-slate-700 text-sm leading-relaxed border border-white/80">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-950 tracking-tight">
              Free Online JSON Viewer for API Payloads, Schema Review, and Data Inspection
            </h2>
            <p className="text-slate-600">
              CodeLens JSON Viewer helps developers validate request and response payloads, inspect nested structures, and transform raw JSON into readable, developer-friendly output. It is designed for API teams, frontend engineers, and QA reviewers who need clean output and fast troubleshooting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">🌳 Tree & Table Inspection</h3>
              <p className="text-xs text-slate-600">
                Inspect nested JSON objects with expandable tree nodes, copy precise JSON paths such as <span className="font-mono text-slate-700">$.users[0].name</span>, and switch to a structured tabular grid for readable data analysis.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">🔀 Flow Chart Diagrams</h3>
              <p className="text-xs text-slate-600">
                Visualize JSON hierarchy as an interactive parent-to-child diagram tree connecting root objects, sub-branches, and array entities for content mapping and backend debugging.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/80 space-y-2">
              <h3 className="font-bold text-slate-950 text-base">⚡ Instant Minifier & Validator</h3>
              <p className="text-xs text-slate-600">
                Compress API responses into single-line minified JSON, validate syntax issues in real time, and keep data workflows moving without leaving the browser.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
