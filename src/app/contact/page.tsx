"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { APP_URL } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Le3VcwtAAAAAIDfpPJ6yhCUKEva2N_33KfFMJbC";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const recaptchaToken = recaptchaRef.current?.getValue();
    
    if (!recaptchaToken) {
      setErrorMessage("Please complete the reCAPTCHA verification.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      recaptchaToken,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        recaptchaRef.current?.reset();
      } else {
        throw new Error(result.message || "Failed to submit form");
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Something went wrong. Please try again.");
      setStatus("error");
      recaptchaRef.current?.reset();
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] text-slate-900">
      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-8 pt-12 pb-24 flex-1">
        <section className="liquid-glass-surface p-8 sm:p-12 space-y-8 text-slate-700 text-base leading-relaxed border border-white/80 rounded-[2.5rem]">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
              Contact Us
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-4">
            {/* Information Panel (Left Side) */}
            <article className="prose prose-slate prose-sm order-2 md:order-1 flex flex-col justify-center pr-0 md:pr-8">
              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Whether you have a question about one of our developer tools, want to request a new feature, or found a bug, our team is here to help. Drop us a message using the form, and we'll aim to respond within 24 hours.
              </p>

              <h3 className="text-slate-900 font-extrabold mb-2">Direct Email</h3>
              <p className="mb-6">
                For general inquiries and support, you can also reach us directly at:<br />
                <a href="mailto:support@codelens.dev" className="text-indigo-600 font-bold hover:underline transition-all">support@codelens.dev</a>
              </p>

              <h3 className="text-slate-900 font-extrabold mb-2">Open Source & Community</h3>
              <p>
                CodeLens is actively growing! If you're a developer and want to contribute or track our public roadmap, feel free to visit our <a href="https://github.com/codelens" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline transition-all">GitHub organization</a>.
              </p>
            </article>

            {/* Contact Form (Right Side) */}
            <div className="space-y-6 order-1 md:order-2 bg-white/40 p-6 sm:p-8 rounded-3xl border border-white/60 shadow-sm relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent rounded-3xl -z-10 pointer-events-none" />
              {status === "success" ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex flex-col items-center text-center space-y-4 h-full justify-center min-h-[350px]">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-extrabold text-emerald-900">Message Sent Successfully!</h3>
                  <p className="text-sm text-emerald-700 max-w-xs mx-auto">Thank you for reaching out to the CodeLens team. We've received your request and will get back to you shortly.</p>
                  <Button variant="secondary" size="sm" onClick={() => setStatus("idle")} className="mt-6 border-emerald-200 hover:bg-emerald-100">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-extrabold text-slate-800 uppercase tracking-wide block ml-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium shadow-sm"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-extrabold text-slate-800 uppercase tracking-wide block ml-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium shadow-sm"
                      placeholder="e.g. john@company.com"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-extrabold text-slate-800 uppercase tracking-wide block ml-1">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      rows={5}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-white/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all text-sm font-medium resize-none shadow-sm"
                      placeholder="How can we help you today?"
                    ></textarea>
                  </div>

                  {/* Google reCAPTCHA Widget */}
                  <div className="pt-2 flex justify-center sm:justify-start">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-rose-700 text-sm font-bold bg-rose-50 p-3.5 rounded-xl border border-rose-200/80">
                      <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-full h-12 shadow-[0_4px_14px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_20px_rgba(79,70,229,0.4)] transition-all font-bold tracking-wide"
                      disabled={status === "loading"}
                      icon={<Send className="w-4 h-4" />}
                    >
                      {status === "loading" ? "Sending Request..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
