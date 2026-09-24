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
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-8 pt-12 pb-24 flex-1">
        <section className="liquid-glass-surface p-8 sm:p-12 space-y-8 text-slate-700 text-base leading-relaxed border border-white/80 rounded-[2.5rem]">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              Last updated: September 2026
            </p>
          </div>

          <article className="prose prose-slate max-w-none">
            <p>
              Welcome to CodeLens. By accessing or using our website and developer tools, you agree to comply with and be bound by these Terms of Service.
            </p>

            <h3>1. Use of Services</h3>
            <p>
              CodeLens provides a suite of free online developer utilities (the "Services"). These Services are provided "as is" and "as available". You agree to use the Services only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use of the Services.
            </p>

            <h3>2. Intellectual Property</h3>
            <p>
              All original content, features, and functionality on this website (excluding open-source libraries like Monaco Editor) are owned by CodeLens and are protected by international copyright, trademark, and intellectual property laws.
            </p>

            <h3>3. Disclaimer of Warranties</h3>
            <p>
              While we strive for accuracy in our tools (such as the JSON diff checker and Code compiler), CodeLens makes no guarantees regarding the absolute correctness or reliability of the output. We are not liable for any code deployed to production based on our tools.
            </p>

            <h3>4. Limitation of Liability</h3>
            <p>
              In no event shall CodeLens, nor its directors, employees, or partners, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or goodwill, arising out of your access to or use of the Services.
            </p>

            <h3>5. Changes to Terms</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}
