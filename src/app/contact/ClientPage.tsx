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
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Navbar />

      <main className="relative z-10 w-full mx-auto px-4 sm:px-8 py-16 lg:py-24 flex-1">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center space-y-6 max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-slate-950 dark:text-white leading-[1.1]">
              Contact Us.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-balance">
              We'd love to hear from you. Drop us a message below and our team will get back to you within 24 hours.
            </p>
          </div>

          <section className="bg-white dark:bg-slate-900 p-8 sm:p-12 border border-slate-200 dark:border-slate-700 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 items-center relative z-10">
              
              {/* Information Panel (Left Side) */}
              <div className="space-y-12">
                <article className="prose prose-slate prose-lg max-w-none">
                  <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                    Whether you have a question about one of our developer tools, want to request a new feature, or found a bug, our team is here to help.
                  </p>
                </article>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <h3 className="text-slate-900 dark:text-slate-100 font-extrabold text-xl">Open Source & Community</h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      CodeLens is actively growing! If you're a developer and want to contribute or track our public roadmap, feel free to visit our <a href="https://github.com/codelens" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-300 font-bold hover:text-indigo-700 dark:text-indigo-200 hover:underline transition-all">GitHub organization</a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form (Right Side) */}
              <div className="space-y-6 bg-slate-50 dark:bg-slate-800/50 p-8 sm:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm relative">
                {status === "success" ? (
                  <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex flex-col items-center text-center space-y-4 h-full justify-center min-h-[400px]">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-emerald-900">Message Sent Successfully!</h3>
                    <p className="text-base text-emerald-700 max-w-sm mx-auto">Thank you for reaching out to the CodeLens team. We've received your request and will get back to you shortly.</p>
                    <Button variant="secondary" size="lg" onClick={() => setStatus("idle")} className="mt-8 border-emerald-200 hover:bg-emerald-100 text-emerald-800 px-8">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest block ml-1">Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-base font-medium shadow-sm"
                        placeholder="e.g. John Doe"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest block ml-1">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-base font-medium shadow-sm"
                        placeholder="e.g. john@company.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest block ml-1">Message</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        required 
                        rows={5}
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 focus:bg-white dark:bg-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all text-base font-medium resize-none shadow-sm"
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
                      <div className="flex items-center gap-2 text-rose-700 text-sm font-bold bg-rose-50 p-4 rounded-xl border border-rose-200/80">
                        <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        variant="solid" 
                        size="lg" 
                        className="w-full h-14 transition-all font-bold tracking-wide text-lg"
                        disabled={status === "loading"}
                        icon={<Send className="w-5 h-5" />}
                      >
                        {status === "loading" ? "Sending Request..." : "Send Message"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}



