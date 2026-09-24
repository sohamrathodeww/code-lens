import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | CodeLens",
  description: "Read our Privacy Policy. Learn how CodeLens protects your data and ensures 100% client-side execution.",
  alternates: {
    canonical: `${APP_URL}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-8 pt-12 pb-24 flex-1">
        <section className="liquid-glass-surface p-8 sm:p-12 space-y-8 text-slate-700 text-base leading-relaxed border border-white/80 rounded-[2.5rem]">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Last updated: September 2026
            </p>
          </div>

          <article className="prose prose-slate max-w-none">
            <p>
              At CodeLens, we take your privacy incredibly seriously. Our primary architectural decision was to build a toolset that <strong>does not</strong> rely on backend servers to process your data.
            </p>

            <h3>1. Data Processing & Storage</h3>
            <p>
              All core tools (including the JSON Viewer, JSON Compare, Text Compare, and JWT Decoder) execute entirely within your browser using Client-Side JavaScript and WebAssembly. 
              <strong> We do not upload, transmit, or store your code, payloads, or tokens on our servers.</strong>
            </p>

            <h3>2. Information We Collect</h3>
            <p>
              Because our tools are client-side, we collect minimal data. We may use privacy-friendly, anonymized analytics (like Vercel Web Analytics) to understand page views and performance metrics. This data does not contain any personally identifiable information (PII) or user input data.
            </p>

            <h3>3. Cookies</h3>
            <p>
              CodeLens may use local storage (like <code>localStorage</code>) strictly to save your UI preferences (like Dark/Light mode or editor settings). We do not use third-party tracking cookies.
            </p>

            <h3>4. Third-Party Services</h3>
            <p>
              Our application is hosted on Vercel. Standard server access logs (like IP addresses and user agents) may be temporarily stored by our hosting provider for security and DDoS mitigation purposes.
            </p>

            <h3>5. Contact Us</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:privacy@codelens.dev">privacy@codelens.dev</a>.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
