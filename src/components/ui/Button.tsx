"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive" | "icon" | "toolAction" | "floatingAction";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  icon,
  isLoading = false,
  active = false,
  className,
  disabled,
  onClick,
  ...props
}) => {
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);

    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    "relative overflow-hidden inline-flex items-center justify-center font-semibold tracking-tight font-sans text-slate-950 transition-all duration-300 rounded-full cursor-pointer select-none backdrop-blur-2xl border focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const sizeStyles = {
    sm: "px-4.5 py-2.5 text-xs sm:text-sm gap-2 shadow-sm",
    md: "px-6 py-3 text-sm sm:text-base gap-2.5 shadow-md",
    lg: "px-8 py-4 text-base sm:text-lg gap-3 shadow-lg",
  };

  const variantStyles = {
    primary:
      "bg-white/90 hover:bg-white text-slate-950 font-extrabold border-white shadow-[inset_0_1.5px_2px_#ffffff,0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[inset_0_2px_3px_#ffffff,0_12px_28px_rgba(99,102,241,0.18)]",
    secondary:
      "bg-white/90 hover:bg-white text-slate-950 font-extrabold border-white shadow-[inset_0_1.5px_2px_#ffffff,0_8px_20px_rgba(15,23,42,0.08)] hover:shadow-[inset_0_2px_3px_#ffffff,0_12px_28px_rgba(99,102,241,0.18)]",
    ghost:
      "bg-white/50 hover:bg-white/90 text-slate-800 hover:text-slate-950 border-white/70 hover:border-white shadow-none",
    destructive:
      "bg-rose-50/95 hover:bg-rose-100 text-rose-700 font-extrabold border-rose-200 hover:border-rose-300 shadow-[inset_0_1.5px_2px_#ffffff,0_8px_20px_rgba(225,29,72,0.12)]",
    icon:
      "p-2.5 bg-white/85 hover:bg-white text-slate-950 border-white rounded-full shadow-[inset_0_1.5px_2px_#ffffff,0_6px_16px_rgba(15,23,42,0.06)]",
    toolAction:
      "bg-white/90 hover:bg-white text-slate-900 border-white font-mono text-xs rounded-xl shadow-[inset_0_1px_1.5px_#ffffff]",
    floatingAction:
      "bg-white/95 backdrop-blur-3xl text-slate-950 font-extrabold border-white shadow-[inset_0_2px_3px_#ffffff,0_16px_36px_rgba(15,23,42,0.1)]",
  };






  return (
    <motion.button
      whileHover={disabled || isLoading ? undefined : { scale: 1.03, y: -1 }}
      whileTap={disabled || isLoading ? undefined : { scale: 0.96, y: 1 }}
      disabled={disabled || isLoading}
      onClick={handleClick}
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...(props as any)}
    >
      {/* Specular Diagonal Lens Flare Curve */}
      <span className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none rounded-t-full" />

      {/* Water Ripple Physics */}
      {isRippling && coords && (
        <span
          className="absolute bg-white/60 rounded-full animate-ping pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: coords.x,
            top: coords.y,
            width: 140,
            height: 140,
            animationDuration: "600ms",
          }}
        />
      )}

      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current shrink-0 relative z-10" />
      ) : icon ? (
        <span className="text-current shrink-0 relative z-10">{icon}</span>
      ) : null}

      {children && <span className="relative z-10 tracking-tight font-extrabold">{children}</span>}
    </motion.button>
  );
};

