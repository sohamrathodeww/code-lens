"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-16 py-6 px-4 sm:px-8 border-t border-white/15 bg-white/5 backdrop-blur-2xl text-xs text-slate-400 font-sans relative z-10">
      <div className="max-w-[1750px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">

        <div className="flex items-center gap-2.5">
          <img src="/logo-dark-small.jpg" alt="CodeLens Logo" className="w-4 h-4 rounded-full object-cover" />
          <span className="font-extrabold text-white tracking-tight">CodeLens</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-300 font-medium">Online Code Inspection & Developer Suite</span>
        </div>

        <div className="text-[11px] text-slate-400 font-mono">
          © {new Date().getFullYear()} CodeLens. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

