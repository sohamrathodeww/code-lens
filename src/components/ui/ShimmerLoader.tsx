"use client";

import React from "react";
import { clsx } from "clsx";

interface ShimmerLoaderProps {
  className?: string;
  variant?: "editor" | "card" | "text" | "circle" | "diff";
}

export const ShimmerLoader: React.FC<ShimmerLoaderProps> = ({
  className,
  variant = "card",
}) => {
  if (variant === "editor") {
    return (
      <div className={clsx("w-full h-full rounded-2xl p-6 product-card flex flex-col gap-4 overflow-hidden", className)}>
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-24 rounded-lg animate-shimmer" />
            <div className="h-8 w-24 rounded-lg animate-shimmer" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-16 rounded-lg animate-shimmer" />
            <div className="h-8 w-20 rounded-lg animate-shimmer" />
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="h-4 w-3/4 rounded animate-shimmer" />
          <div className="h-4 w-1/2 rounded animate-shimmer" />
          <div className="h-4 w-5/6 rounded animate-shimmer" />
          <div className="h-4 w-2/3 rounded animate-shimmer" />
          <div className="h-4 w-4/5 rounded animate-shimmer" />
          <div className="h-4 w-1/3 rounded animate-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === "diff") {
    return (
      <div className={clsx("w-full h-[500px] rounded-2xl product-card p-4 flex gap-4 overflow-hidden", className)}>
        <div className="flex-1 space-y-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/70">
          <div className="h-6 w-32 rounded animate-shimmer mb-4" />
          <div className="h-4 w-full rounded animate-shimmer" />
          <div className="h-4 w-3/4 rounded animate-shimmer" />
          <div className="h-4 w-5/6 rounded animate-shimmer" />
        </div>
        <div className="flex-1 space-y-3 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/70">
          <div className="h-6 w-32 rounded animate-shimmer mb-4" />
          <div className="h-4 w-full rounded animate-shimmer" />
          <div className="h-4 w-2/3 rounded animate-shimmer" />
          <div className="h-4 w-4/5 rounded animate-shimmer" />
        </div>
      </div>
    );
  }

  if (variant === "circle") {
    return <div className={clsx("rounded-full animate-shimmer", className)} />;
  }

  if (variant === "text") {
    return <div className={clsx("h-4 rounded animate-shimmer", className)} />;
  }

  return <div className={clsx("rounded-2xl animate-shimmer min-h-[120px]", className)} />;
};

