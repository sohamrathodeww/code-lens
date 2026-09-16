"use client";

import React from "react";
import { clsx } from "clsx";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, errorMessage, successMessage, icon, className, disabled, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 font-sans">
        {label && (
          <label className="block text-xs font-semibold text-slate-700 tracking-tight">
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 pointer-events-none text-slate-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled}
            className={clsx(
              "w-full text-xs font-medium rounded-xl border bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-4 font-sans",
              icon ? "pl-10 pr-4 py-2.5" : "px-3.5 py-2.5",
              errorMessage
                ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/15"
                : successMessage
                ? "border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500/15"
                : "border-slate-200 hover:border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/15 shadow-sm",
              disabled && "bg-slate-50 text-slate-400 cursor-not-allowed",
              className
            )}
            {...props}
          />
        </div>

        {errorMessage ? (
          <p className="text-[11px] font-semibold text-rose-600 font-sans">{errorMessage}</p>
        ) : successMessage ? (
          <p className="text-[11px] font-semibold text-emerald-600 font-sans">{successMessage}</p>
        ) : helperText ? (
          <p className="text-[11px] text-slate-500 font-sans">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
