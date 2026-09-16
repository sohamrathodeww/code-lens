"use client";

import React from "react";
import { clsx } from "clsx";

interface ToolShellProps {
  children: React.ReactNode;
  className?: string;
}

export const ToolShell: React.FC<ToolShellProps> = ({ children, className }) => {
  return <div className={clsx("w-full space-y-6 font-sans", className)}>{children}</div>;
};

export const ToolHeader: React.FC<{
  title: string;
  badge?: string;
  actions?: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, badge, actions, icon }) => {
  return (
    <div className="product-card p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {icon && <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 shadow-sm">{icon}</div>}
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">{title}</h2>
            {badge && (
              <span className="px-2.5 py-0.5 text-xs font-mono font-semibold rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                {badge}
              </span>
            )}
          </div>
        </div>
      </div>

      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
};

export const ToolWorkspace: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={clsx("w-full", className)}>{children}</div>;
};

export const ToolStatus: React.FC<{ children: React.ReactNode; variant?: "info" | "error" | "success" }> = ({
  children,
  variant = "info",
}) => {
  const variantStyles = {
    info: "bg-indigo-50 border-indigo-200 text-indigo-800",
    error: "bg-rose-50 border-rose-200 text-rose-800",
    success: "bg-emerald-50 border-emerald-200 text-emerald-800",
  };

  return (
    <div className={clsx("p-3 rounded-xl border text-xs font-mono font-medium flex items-center gap-2 shadow-sm", variantStyles[variant])}>
      {children}
    </div>
  );
};
