"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, FileJson, LayoutGrid, ChevronDown, Sparkles, ExternalLink, KeyRound, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TOOLS_REGISTRY, ToolDefinition } from "@/lib/tools-registry";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeTools = TOOLS_REGISTRY.filter((t: ToolDefinition) => t.status === "active");
  const featuredTools = activeTools;

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 backdrop-blur-3xl bg-white/70 border-b border-slate-200/80 shadow-[0_8px_32px_rgba(15,23,42,0.05),inset_0_1.5px_2px_#ffffff] transition-colors duration-300">
      <div className="max-w-[1750px] mx-auto flex items-center justify-between gap-4">

        <Link href="/" onClick={handleBrandClick} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-2xl overflow-hidden border border-white/90 shadow-[inset_0_1.5px_2px_#ffffff,0_4px_12px_rgba(15,23,42,0.1)] group-hover:scale-105 transition-transform duration-200 bg-white">
            <img src="/logo-dark-small.jpg" alt="CodeLens Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-950 font-sans flex items-center gap-1.5">
              CodeLens
            </span>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Code Inspection & Developer Suite
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
            className="px-3.5 py-2 rounded-full bg-white/90 border border-slate-200/90 text-slate-900 hover:bg-white hover:border-slate-300 shadow-[inset_0_1.5px_2px_#ffffff,0_4px_16px_rgba(15,23,42,0.06)] flex items-center gap-2 transition-all cursor-pointer font-sans font-bold text-xs"
            aria-expanded={isToolsDropdownOpen}
            aria-label="Active Tools Menu"
          >
            <LayoutGrid className="w-4 h-4 text-indigo-600" />
            <span className="font-extrabold text-xs text-slate-900">Tools</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                isToolsDropdownOpen ? "rotate-180 text-indigo-600" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isToolsDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 p-3 rounded-2xl bg-white/95 backdrop-blur-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.15),inset_0_1.5px_2px_#ffffff] z-50 space-y-1.5"
              >
                <div className="px-3 py-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 font-mono">
                    Direct Tool Switcher
                  </span>
                  <span className="text-[10px] font-bold font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    {featuredTools.length} Ready
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  {featuredTools.map((tool: ToolDefinition) => {
                    const isToolActive = pathname === tool.route;
                    const IconComponent =
                      tool.id === "code-compare"
                        ? Code2
                        : tool.id === "jwt-decoder"
                        ? KeyRound
                        : tool.id === "online-translator"
                        ? Languages
                        : FileJson;

                    return (
                      <Link
                        key={tool.id}
                        href={tool.route}
                        onClick={() => setIsToolsDropdownOpen(false)}
                        className={`p-3 rounded-xl flex items-start gap-3 transition-colors duration-150 group ${
                          isToolActive
                            ? "bg-indigo-50/80 border border-indigo-200/80 text-indigo-950"
                            : "hover:bg-slate-100/80 text-slate-800"
                        }`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${
                          isToolActive ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-700 group-hover:bg-white group-hover:text-indigo-600"
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {tool.name}
                            </span>
                            {isToolActive ? (
                              <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded-full">
                                Active
                              </span>
                            ) : (
                              <ExternalLink className="w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-sans">
                            {tool.shortDescription}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    href="/"
                    onClick={() => setIsToolsDropdownOpen(false)}
                    className="w-full py-2 px-3 text-xs font-bold text-slate-700 hover:text-slate-950 hover:bg-slate-100/70 rounded-xl flex items-center justify-center gap-2 transition-colors font-sans"
                  >
                    <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Browse All Tools</span>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
