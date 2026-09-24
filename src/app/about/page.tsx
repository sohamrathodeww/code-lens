import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { APP_URL } from "@/lib/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | CodeLens Developer Tools",
  description: "Learn more about CodeLens, our mission, and why we are building the fastest, privacy-first online developer tools suite.",
  alternates: {
    canonical: `${APP_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-8 pt-12 pb-24 flex-1">
        <section className="liquid-glass-surface p-8 sm:p-12 space-y-8 text-slate-700 text-base leading-relaxed border border-white/80 rounded-[2.5rem]">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              About CodeLens
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              The privacy-first developer utility suite.
            </p>
          </div>

          <article className="prose prose-slate max-w-none">
            <p>
              CodeLens was created out of a frustration shared by many modern developers. While there are thousands of online JSON formatters, text diff checkers, and JWT decoders, almost all of them send your proprietary payloads and sensitive data to a backend server for processing. This is a massive security risk for engineers working with production data.
            </p>
            
            <h3>Our Mission</h3>
            <p>
              We believe developer tools should be fast, beautiful, and absolutely secure. That's why CodeLens processes everything <strong>100% locally in your browser</strong>. By leveraging WebAssembly and the Monaco Editor (the core engine behind VS Code), we bring native-level performance to the web without compromising your privacy.
            </p>

            <h3>Why We Are Different</h3>
            <ul>
              <li><strong>Zero Backend Processing:</strong> We do not upload your code, JSON payloads, or JWTs to any server. Everything happens client-side.</li>
              <li><strong>Lightning Fast:</strong> No network latency means instant formatting and diffing, even on massive files.</li>
              <li><strong>Premium Experience:</strong> We focus heavily on UI/UX, providing dark mode, beautiful syntax highlighting, and smooth interactions.</li>
            </ul>

            <p>
              Explore our core tools like the <Link href="/json-viewer">JSON Viewer</Link>, <Link href="/code-compare">Code Compare</Link>, and <Link href="/jwt-decoder">JWT Decoder</Link>.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
