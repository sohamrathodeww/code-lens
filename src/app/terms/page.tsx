import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | CodeLens",
  description: "CodeLens Terms of Service and usage agreements.",
  alternates: {
    canonical: `${APP_URL}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 py-16 lg:py-24 flex-1">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-6 max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-slate-950 dark:text-white leading-[1.1]">
              Terms of Service
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-balance">
              Read the user agreements and terms for accessing CodeLens, the web's most powerful browser-based online developer tools suite.
            </p>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">
              Last updated: September 2026
            </p>
          </div>

          <section className="bg-white dark:bg-slate-900 p-8 sm:p-16 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <article className="prose prose-slate prose-lg md:prose-xl max-w-4xl mx-auto">
              <p>
                Welcome to CodeLens. By accessing or using our website and secure developer utilities, you agree to comply with and be bound by these Terms of Service. Please read them carefully before using our JSON editors, diff checkers, or online formatters.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">1. Acceptance of Services</h3>
              <p>
                CodeLens provides a comprehensive suite of free, high-performance online utilities (the "Services"). By using any of these utilities, you agree to these Terms. Our Services currently include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300 my-6">
                <li><strong>Online JSON Viewer & Formatter</strong></li>
                <li><strong>Online JSON Compare</strong></li>
                <li><strong>Online Text Compare</strong></li>
                <li><strong>JWT Decoder</strong></li>
                <li><strong>Online Code Editor & Compiler</strong></li>
                <li><strong>Online Multi-Language Translator</strong></li>
                <li><strong>Online Currency Converter</strong></li>
              </ul>
              <p>
                These Services are provided "as is" and "as available". You agree to use the online developer tools only for lawful purposes, such as parsing JSON, decoding JWTs, or translating text, and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the Services.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">2. Intellectual Property Rights</h3>
              <p>
                All original design, layout, web application code, and branding on this platform (excluding open-source libraries like Monaco Editor) are owned exclusively by CodeLens. They are protected by international copyright, trademark, and intellectual property laws. Users are forbidden from scraping or cloning our UI/UX without explicit written permission.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">3. Disclaimer of Warranties & Output Accuracy</h3>
              <p>
                While our primary goal is to deliver flawless, instantaneous browser-based developer tools (such as our JSON diff checker, regex tester, and base64 encoders), CodeLens makes no absolute guarantees regarding the correctness or reliability of the output. Developers should verify any code snippets, minified JSON, or decoded tokens before deploying them to production environments. We are not liable for production bugs caused by the use of our web utilities.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">4. Limitation of Liability</h3>
              <p>
                In no event shall CodeLens, nor its directors, engineers, or hosting partners, be liable for any indirect, incidental, special, consequential, or punitive damages. This includes, without limitation, loss of proprietary code, data loss, or server downtime arising out of your access to or use of the CodeLens developer toolset.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">5. Revisions to the Terms</h3>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms of Service at any time as we introduce new tools to our platform (e.g., Markdown previews, REST API testers). By continuing to access or use our online developer tools after those revisions become effective, you agree to be bound by the updated terms.
              </p>

              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-12 mb-6">6. Contact Information</h3>
              <p>
                If you have inquiries regarding these Terms of Service or our usage policies, please reach out to us via our <a href="/contact" className="text-indigo-600 dark:text-indigo-300 font-bold hover:underline">Contact Us</a> page.
              </p>
            </article>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}



