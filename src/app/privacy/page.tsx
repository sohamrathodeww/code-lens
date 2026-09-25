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
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 py-16 lg:py-24 flex-1">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-slate-950 dark:text-white leading-[1.1]">
              Privacy Policy
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-balance">
              At CodeLens, we build the fastest, privacy-first online developer tools suite. Learn exactly how we protect your proprietary code, payloads, and sensitive tokens.
            </p>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
              Last updated: September 2026
            </p>
          </div>

          <section className="bg-white dark:bg-slate-900 p-8 sm:p-16 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <article className="prose prose-slate prose-lg md:prose-xl max-w-4xl mx-auto">
              <p>
                CodeLens is dedicated to providing secure, client-side online developer tools, including our premium JSON Viewer, JSON Formatter, Text Diff Checker, Code Compare utility, and JWT Decoder. Because developers often work with highly sensitive production data, our primary architectural decision was to build a toolset that <strong>does not</strong> rely on backend servers to process your data.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">1. 100% Client-Side Data Processing</h3>
              <p>
                The majority of the developer tools provided by CodeLens execute entirely within your browser using Client-Side JavaScript and WebAssembly (via the Monaco Editor engine). 
                <strong> We do not upload, transmit, log, or store your code snippets, JSON payloads, or JWT tokens on any remote servers.</strong> 
                This guarantees maximum security for your proprietary algorithms and API responses.
              </p>
              
              <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-8 mb-4">Our Suite of Secure Tools Includes:</h4>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
                <li><strong>Online JSON Viewer & Formatter:</strong> Parses and minifies JSON locally. No data leaves your machine.</li>
                <li><strong>Online JSON Compare & Diff:</strong> Compares payloads strictly inside your browser's memory.</li>
                <li><strong>Online Text Compare:</strong> Diff checking executed via local web workers.</li>
                <li><strong>JWT Decoder:</strong> Decodes tokens instantly without transmitting sensitive claims or signatures.</li>
                <li><strong>Online Code Editor:</strong> Writes and formats code locally. (Execution may involve secure, isolated cloud containers depending on the language).</li>
                <li><strong>Online Translator:</strong> Relies on secure third-party APIs to process text without storing it locally on our servers.</li>
                <li><strong>Online Currency Converter:</strong> Fetches live exchange rates via API, but performs all conversions locally on your device.</li>
              </ul>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">2. Information We Collect</h3>
              <p>
                Because our secure developer utilities are processed client-side, we collect absolute minimal data. We use privacy-friendly, anonymized analytics to monitor general page views and performance metrics across our platform. This data does not contain any personally identifiable information (PII) or user input data from the tools.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">3. Cookies & Local Storage</h3>
              <p>
                CodeLens utilizes browser local storage (<code>localStorage</code>) strictly to save your UI preferences (such as Dark/Light mode, font sizes, and editor configurations) so that your preferred developer environment is ready the next time you visit. We do not use third-party tracking cookies or advertising trackers.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">4. Hosting & Infrastructure Services</h3>
              <p>
                Our global online developer suite is hosted on premium edge networks. Standard server access logs (which may include IP addresses and user agents) are temporarily stored by our hosting provider strictly for security monitoring, DDoS mitigation, and maintaining the highest availability for our web tools.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">5. Updates to this Policy</h3>
              <p>
                We may update this Privacy Policy periodically as we add new secure developer tools to our platform. We encourage you to review this page occasionally to stay informed about how we are protecting your data.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">6. Contact Us</h3>
              <p>
                If you have any questions, concerns, or feedback about this Privacy Policy or our developer toolset, please contact our team via the <a href="/contact" className="text-indigo-600 dark:text-indigo-300 font-bold hover:underline">Contact Us</a> page.
              </p>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}



