"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-16 py-6 px-4 sm:px-8 border-t border-slate-200/80 bg-white/70 backdrop-blur-2xl text-xs text-slate-600 font-sans relative z-10 shadow-[0_-4px_20px_rgba(15,23,42,0.02)]">
      <div className="max-w-[1750px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2.5">
          <img src="/logo-dark-small.jpg" alt="CodeLens Logo" className="w-5 h-5 rounded-full object-cover border border-slate-200" />
          <span className="font-extrabold text-slate-950 text-sm tracking-tight font-sans">CodeLens</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-600 font-medium font-sans">Online Code Inspection & Developer Suite</span>
        </div>

        <div className="text-[11px] text-slate-500 font-mono">
          © {new Date().getFullYear()} CodeLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
