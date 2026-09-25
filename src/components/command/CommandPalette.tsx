"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, X, FileJson, Code2, Database, KeyRound, Regex, Sparkles } from "lucide-react";
import { TOOLS_REGISTRY, ToolDefinition } from "@/lib/tools-registry";

const ICON_MAP: Record<string, React.ElementType> = {
  FileJson,
  Code2,
  Database,
  KeyRound,
  Regex,
  Sparkles,
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredTools = TOOLS_REGISTRY.filter((tool) => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredTools.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % filteredTools.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          handleSelect(filteredTools[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredTools]);

  const handleSelect = (tool: ToolDefinition) => {
    if (tool.status === "active") {
      router.push(tool.route);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-10 font-sans"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-700 py-3">
              <Search className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search developer tools or type command..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full text-sm font-medium bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              />
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-100 dark:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool, index) => {
                  const Icon = ICON_MAP[tool.iconName] || Command;
                  const isSelected = index === selectedIndex;

                  return (
                    <div
                      key={tool.id}
                      onClick={() => handleSelect(tool)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors duration-150 ${
                        isSelected
                          ? "bg-indigo-50 border border-indigo-200/80 text-indigo-900"
                          : "hover:bg-slate-50 dark:bg-slate-800/50 border border-transparent text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm">{tool.name}</span>
                            <span
                              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                                tool.status === "active"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              {tool.status === "active" ? "Active" : "Planned"}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{tool.shortDescription}</p>
                        </div>
                      </div>

                      {tool.status === "active" && (
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-indigo-600 translate-x-0.5" : "text-slate-300"
                          }`}
                        />
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-slate-400 font-mono">
                  No matching developer tools found
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-slate-200 font-semibold">↑↓</span> to navigate
                <span className="px-1.5 py-0.5 rounded bg-slate-200 font-semibold">↵</span> to select
              </div>
              <div>
                <span className="px-1.5 py-0.5 rounded bg-slate-200 font-semibold">ESC</span> to close
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

