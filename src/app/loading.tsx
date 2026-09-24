import React from "react";

export default function Loading() {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc]">
      {/* Shimmer Navbar */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-3xl bg-white/70 border-b border-slate-200/80">
        <div className="max-w-[1750px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-slate-200 animate-pulse" />
            <div className="space-y-2">
              <div className="w-24 h-4 rounded bg-slate-200 animate-pulse" />
              <div className="w-32 h-2 rounded bg-slate-200 animate-pulse hidden sm:block" />
            </div>
          </div>
          <div className="w-24 h-9 rounded-full bg-slate-200 animate-pulse" />
        </div>
      </header>

      {/* Shimmer Main Content */}
      <main className="relative z-10 max-w-[1750px] w-full mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 space-y-12">
        <div className="space-y-6">
          {/* Top Controls Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="w-48 h-8 rounded-lg bg-slate-200 animate-pulse" />
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="w-full sm:w-24 h-10 rounded-xl bg-slate-200 animate-pulse" />
              <div className="w-full sm:w-24 h-10 rounded-xl bg-slate-200 animate-pulse" />
            </div>
          </div>

          {/* Main Workspace Skeleton */}
          <div className="w-full h-[65vh] min-h-[500px] bg-slate-50/50 rounded-2xl border border-slate-200/80 overflow-hidden flex flex-col relative">
            <div className="absolute inset-0 animate-shimmer opacity-20 pointer-events-none" />
            
            <div className="h-12 border-b border-slate-200/80 flex items-center px-4 gap-4 bg-slate-100/50 relative z-10">
              <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
              <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
            </div>
            
            <div className="flex-1 p-6 space-y-4 relative z-10">
              <div className="w-3/4 h-4 bg-slate-200/60 rounded animate-pulse" />
              <div className="w-1/2 h-4 bg-slate-200/60 rounded animate-pulse" />
              <div className="w-5/6 h-4 bg-slate-200/60 rounded animate-pulse" />
              <div className="w-2/3 h-4 bg-slate-200/60 rounded animate-pulse" />
              <div className="w-1/4 h-4 bg-slate-200/60 rounded animate-pulse" />
              <div className="w-full h-4 bg-slate-200/60 rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Information Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl border border-slate-200/80 space-y-4 bg-white/50">
            <div className="w-32 h-5 bg-slate-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 rounded animate-pulse" />
              <div className="w-4/5 h-3 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/80 space-y-4 bg-white/50">
            <div className="w-32 h-5 bg-slate-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 rounded animate-pulse" />
              <div className="w-4/5 h-3 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200/80 space-y-4 bg-white/50">
            <div className="w-32 h-5 bg-slate-200 rounded animate-pulse" />
            <div className="space-y-2">
              <div className="w-full h-3 bg-slate-200 rounded animate-pulse" />
              <div className="w-4/5 h-3 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      {/* Shimmer Footer */}
      <footer className="border-t border-slate-200/80 py-8 bg-white/50">
        <div className="max-w-[1750px] mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-48 h-4 bg-slate-200 rounded animate-pulse" />
          <div className="flex gap-4">
            <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
            <div className="w-16 h-4 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </footer>
    </div>
  );
}
