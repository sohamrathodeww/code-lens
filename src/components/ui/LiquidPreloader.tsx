"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code2, Cpu, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

interface LiquidPreloaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

const INITIALIZATION_STEPS = [
  { id: 1, text: "Initializing Liquid Glass Canvas Engine...", icon: Zap },
  { id: 2, text: "Loading Monaco Code & Diff Engine...", icon: Code2 },
  { id: 3, text: "Configuring 5MB Payload File Validator...", icon: ShieldCheck },
  { id: 4, text: "Preparing CodeLens Developer Suite...", icon: Cpu },
];

export const LiquidPreloader: React.FC<LiquidPreloaderProps> = ({
  onComplete,
  minDurationMs = 1800,
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      setProgress(calculatedProgress);

      const stepIndex = Math.min(
        INITIALIZATION_STEPS.length - 1,
        Math.floor((calculatedProgress / 100) * INITIALIZATION_STEPS.length)
      );
      setCurrentStepIndex(stepIndex);

      if (calculatedProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 300);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [minDurationMs, onComplete]);

  if (isFinished) return null;

  const currentStep = INITIALIZATION_STEPS[currentStepIndex];
  const StepIcon = currentStep?.icon || Sparkles;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-[#f8fafc] text-slate-900 dark:text-slate-100 font-sans overflow-hidden"
      >
        {/* Ambient Gradient Backdrop Fluid Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-400/20 blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full bg-pink-400/15 blur-[120px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-400/15 blur-[140px]" />
        </div>

        {/* Top Header Spec Badge */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-sm tracking-tight text-slate-950 dark:text-white font-sans">
              CodeLens
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/80 px-2.5 py-0.5 rounded-full shadow-sm">
              Preloader v3.2
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>System Initialization</span>
          </div>
        </div>

        {/* Center Anatomy Preloader Core */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-md w-full my-auto space-y-8">
          {/* Animated 3D Liquid Glass Orb & Rotating Ring */}
          <div className="relative flex items-center justify-center">
            {/* Outer Rotating Contour Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="absolute w-36 h-36 rounded-full border-2 border-dashed border-indigo-400/40 pointer-events-none"
            />

            {/* Inner Pulsing Glass Orb with Official CodeLens Logo */}
            <div className="liquid-glass-surface p-5 rounded-3xl bg-white/90 dark:bg-slate-900/90 border border-white dark:border-slate-700 shadow-[0_20px_50px_rgba(79,70,229,0.22),inset_0_2px_3px_#ffffff] relative z-10 flex items-center justify-center group">
              <span className="lens-sheen" />
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-700/80 shadow-md bg-white dark:bg-slate-900 p-0.5 relative z-10 transition-transform duration-300 group-hover:scale-105">
                <img src="/logo-dark-medium.jpg" alt="CodeLens Logo" className="w-full h-full object-cover rounded-xl" />
              </div>
            </div>
          </div>

          {/* Brand Titles */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white font-sans">
              CodeLens
            </h2>
            <p className="text-xs font-mono font-bold text-slate-500">
              Code Inspection & Developer Suite
            </p>
          </div>

          {/* Liquid Glass Progress Bar & Anatomy Step Tracker */}
          <div className="w-full space-y-4">
            {/* Track */}
            <div className="w-full h-3 rounded-full bg-white/80 dark:bg-slate-800/80 border border-white dark:border-slate-700 p-0.5 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06)] relative overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.6),0_4px_12px_rgba(79,70,229,0.4)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Step & Percentage Footer */}
            <div className="flex items-center justify-between text-xs font-mono font-bold px-1">
              <div className="flex items-center gap-2 text-indigo-700 font-bold truncate max-w-[280px]">
                <StepIcon className="w-3.5 h-3.5 shrink-0 text-indigo-600 animate-spin" />
                <span className="truncate">{currentStep?.text}</span>
              </div>
              <span className="text-slate-950 dark:text-white font-extrabold text-sm">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bottom Anatomy Architecture Badges */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-3 pb-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white dark:border-slate-700 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Monaco Engine v0.52</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white dark:border-slate-700 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>5MB Inline Validator</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white dark:border-slate-700 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-400 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Liquid Glass UI System</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

