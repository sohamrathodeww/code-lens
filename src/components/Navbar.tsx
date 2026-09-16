"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, FileJson, LayoutGrid, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Tools Hub", href: "/", icon: LayoutGrid, iconOnly: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-3xl bg-white/60 border-b border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1.5px_2px_#ffffff] transition-colors duration-300">
      <div className="max-w-[1750px] mx-auto flex items-center justify-between gap-4">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl overflow-hidden border border-white/90 shadow-[inset_0_1.5px_2px_#ffffff,0_4px_12px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-transform duration-200 bg-white">
            <img src="/logo-dark-small.jpg" alt="CodeLens Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-950 font-sans">
              CodeLens
            </span>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Code Inspection & Developer Suite
            </p>
          </div>
        </Link>

        {/* Liquid Glass Navigation Pills */}
        <nav className="flex items-center gap-1.5 p-1.5 rounded-full bg-white/70 border border-white backdrop-blur-2xl shadow-[inset_0_1.5px_2px_#ffffff,0_8px_20px_rgba(15,23,42,0.06)]">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                aria-label={item.label}
                className={`relative ${
                  item.iconOnly ? "px-3 py-1.5" : "px-4.5 py-1.5"
                } text-xs sm:text-sm font-extrabold rounded-full transition-colors duration-200 flex items-center gap-2 font-sans ${
                  isActive ? "text-slate-950" : "text-slate-600 hover:text-slate-950"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 rounded-full bg-white border border-white shadow-[inset_0_2px_3px_#ffffff,0_8px_20px_rgba(15,23,42,0.08)]"
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isActive ? "text-indigo-600" : "text-slate-500"}`} />
                  {!item.iconOnly && <span>{item.label}</span>}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

