"use client";

import React, { useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import {
  Code2,
  ArrowLeftRight,
  Sparkles,
  RotateCcw,
  Upload,
  PlusCircle,
  MinusCircle,
  FileCode,
  Copy,
  Check,
  Sun,
  Moon,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FileUploadZone } from "@/components/ui/FileUploadZone";
import { ShimmerLoader } from "@/components/ui/ShimmerLoader";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

const SAMPLE_ORIGINAL = `// CodeLens PRO - Code Diff Original
function calculateUserMetrics(users) {
  let totalScore = 0;
  for (let i = 0; i < users.length; i++) {
    totalScore += users[i].score;
  }
  return {
    count: users.length,
    average: totalScore / users.length,
    status: "active"
  };
}

module.exports = { calculateUserMetrics };`;

const SAMPLE_MODIFIED = `// CodeLens PRO - Code Diff Refactored
/**
 * Optimized metric calculation with validation and high performance
 */
export const calculateUserMetrics = (users: Array<{ id: string; score: number }>) => {
  if (!users || users.length === 0) {
    return { count: 0, average: 0, status: "empty" };
  }

  const totalScore = users.reduce((sum, user) => sum + user.score, 0);

  return {
    count: users.length,
    average: Number((totalScore / users.length).toFixed(2)),
    status: "active",
    processedAt: new Date().toISOString()
  };
};`;

const SUPPORTED_LANGUAGES = [
  { id: "typescript", name: "TypeScript / JS" },
  { id: "json", name: "JSON Data" },
  { id: "python", name: "Python" },
  { id: "html", name: "HTML" },
  { id: "css", name: "CSS" },
  { id: "sql", name: "SQL" },
  { id: "cpp", name: "C / C++" },
  { id: "java", name: "Java" },
  { id: "rust", name: "Rust" },
  { id: "go", name: "Go" },
  { id: "yaml", name: "YAML" },
  { id: "xml", name: "XML" },
  { id: "markdown", name: "Markdown" },
];

export const CodeCompareFeature: React.FC = () => {
  const [originalCode, setOriginalCode] = useState<string>(SAMPLE_ORIGINAL);
  const [modifiedCode, setModifiedCode] = useState<string>(SAMPLE_MODIFIED);
  const [originalFilename, setOriginalFilename] = useState<string>("Original Source");
  const [modifiedFilename, setModifiedFilename] = useState<string>("Modified Source");
  const [language, setLanguage] = useState<string>("typescript");
  const [editorTheme, setEditorTheme] = useState<"vs" | "vs-dark">("vs");
  const [showInlineUpload, setShowInlineUpload] = useState<boolean>(false);

  const [copiedOriginal, setCopiedOriginal] = useState<boolean>(false);
  const [copiedModified, setCopiedModified] = useState<boolean>(false);

  const getDiffStats = () => {
    const origLines = originalCode.trim() ? originalCode.split("\n") : [];
    const modLines = modifiedCode.trim() ? modifiedCode.split("\n") : [];

    const added = Math.max(0, modLines.length - origLines.length);
    const deleted = Math.max(0, origLines.length - modLines.length);
    const totalLines = modLines.length;

    return { added, deleted, totalLines, origLinesCount: origLines.length, modLinesCount: modLines.length };
  };

  const stats = getDiffStats();

  const handleOriginalUpload = (content: string, filename: string) => {
    setOriginalCode(content);
    setOriginalFilename(filename);
  };

  const handleModifiedUpload = (content: string, filename: string) => {
    setModifiedCode(content);
    setModifiedFilename(filename);
  };

  // Reset functionality: cleans both code compare boxes
  const handleReset = () => {
    setOriginalCode("");
    setModifiedCode("");
    setOriginalFilename("Original Source");
    setModifiedFilename("Modified Source");
  };

  // Sample functionality: loads the sample dataset
  const handleLoadSample = () => {
    setOriginalCode(SAMPLE_ORIGINAL);
    setModifiedCode(SAMPLE_MODIFIED);
    setOriginalFilename("Original Sample");
    setModifiedFilename("Modified Sample");
    setLanguage("typescript");
  };

  // Swap code functionality: swaps left and right boxes
  const handleSwapSides = () => {
    setOriginalCode(modifiedCode);
    setModifiedCode(originalCode);

    const tempFilename = originalFilename;
    setOriginalFilename(modifiedFilename);
    setModifiedFilename(tempFilename);
  };

  const handleCopyOriginal = () => {
    if (!originalCode) return;
    navigator.clipboard.writeText(originalCode);
    setCopiedOriginal(true);
    setTimeout(() => setCopiedOriginal(false), 2000);
  };

  const handleCopyModified = () => {
    if (!modifiedCode) return;
    navigator.clipboard.writeText(modifiedCode);
    setCopiedModified(true);
    setTimeout(() => setCopiedModified(false), 2000);
  };

  return (
    <SlideUp className="space-y-6 font-sans">
      {/* Top Header & Toolbar */}
      <div className="liquid-glass-surface p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <span className="lens-sheen" />
        
        {/* Title & Diff Statistics */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-200/80 text-indigo-600 shadow-[inset_0_1.5px_2px_#ffffff]">
            <Code2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              Code Compare Studio
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 font-bold mt-1.5">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                <PlusCircle className="w-3.5 h-3.5" /> +{stats.added} Added
              </span>
              <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                <MinusCircle className="w-3.5 h-3.5" /> -{stats.deleted} Deleted
              </span>
              <span className="bg-slate-100/90 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                Total: {stats.totalLines} lines
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label="Select syntax language"
            className="px-3.5 py-2 text-xs font-bold rounded-full bg-white/90 border border-slate-200/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-[inset_0_1.5px_2px_#ffffff,0_4px_12px_rgba(15,23,42,0.04)] cursor-pointer font-sans"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id} className="bg-white text-slate-900">
                {lang.name}
              </option>
            ))}
          </select>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditorTheme(editorTheme === "vs" ? "vs-dark" : "vs")}
            icon={editorTheme === "vs" ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-500" />}
            title="Toggle Editor Dark/Light Theme"
          >
            {editorTheme === "vs" ? "Dark" : "Light"}
          </Button>

          {/* Sample Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLoadSample}
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            title="Load Sample Code"
          >
            Sample
          </Button>

          {/* Swap Sides Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSwapSides}
            icon={<ArrowLeftRight className="w-4 h-4 text-indigo-600" />}
            title="Swap Left and Right Sides"
          >
            Swap Sides
          </Button>

          {/* Reset Button (Cleans both boxes) */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4 text-rose-600" />}
            title="Clean/Reset both code boxes"
          >
            Reset
          </Button>

          {/* Upload Toggle */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowInlineUpload(!showInlineUpload)}
            icon={<Upload className="w-4 h-4 text-indigo-600" />}
          >
            {showInlineUpload ? "Hide Upload" : "Upload Files"}
          </Button>
        </div>
      </div>

      {/* Dual File Upload Drop Zone */}
      {showInlineUpload && (
        <FadeIn className="liquid-glass-surface p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-indigo-700 mb-2 flex items-center gap-1.5 font-sans">
                <FileCode className="w-4 h-4" /> Upload Original File (Left Side, Max 5MB)
              </h4>
              <FileUploadZone
                onFileSelect={handleOriginalUpload}
                maxSizeMB={5}
                title="Upload Original Code"
                subtitle="Select or drop original file (Max 5MB)"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cyan-700 mb-2 flex items-center gap-1.5 font-sans">
                <FileCode className="w-4 h-4" /> Upload Modified File (Right Side, Max 5MB)
              </h4>
              <FileUploadZone
                onFileSelect={handleModifiedUpload}
                maxSizeMB={5}
                title="Upload Modified Code"
                subtitle="Select or drop modified file (Max 5MB)"
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* Side-by-Side Monaco Diff Editor Container */}
      <div className="liquid-glass-surface p-4 sm:p-6 flex flex-col h-[780px] relative bg-white/80 border border-slate-200/90 shadow-lg">
        <span className="lens-sheen" />

        {/* Crisp Light Side-by-Side Pane Headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-slate-200/90 relative z-10 items-center">
          {/* Left Pane Header */}
          <div className="flex items-center justify-between bg-slate-100/90 border border-slate-200/90 px-3.5 py-2.5 rounded-xl shadow-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <FileCode className="w-4 h-4 text-indigo-600 shrink-0" />
              <span className="text-xs font-mono font-bold text-slate-900 truncate">
                {originalFilename}
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-semibold shrink-0">
                ({stats.origLinesCount} lines)
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyOriginal}
                disabled={!originalCode}
                title="Copy original code"
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 disabled:opacity-40"
              >
                {copiedOriginal ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setOriginalCode("")}
                disabled={!originalCode}
                title="Clear original side"
                className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Pane Header */}
          <div className="flex items-center justify-between bg-slate-100/90 border border-slate-200/90 px-3.5 py-2.5 rounded-xl shadow-xs">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <FileCode className="w-4 h-4 text-cyan-600 shrink-0" />
              <span className="text-xs font-mono font-bold text-slate-900 truncate">
                {modifiedFilename}
              </span>
              <span className="text-[11px] font-mono text-slate-500 font-semibold shrink-0">
                ({stats.modLinesCount} lines)
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleCopyModified}
                disabled={!modifiedCode}
                title="Copy modified code"
                className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 disabled:opacity-40"
              >
                {copiedModified ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setModifiedCode("")}
                disabled={!modifiedCode}
                title="Clear modified side"
                className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-slate-200 disabled:opacity-40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Clean Monaco Diff Editor Box */}
        <div className="flex-1 mt-3 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10">
          <DiffEditor
            height="100%"
            language={language}
            original={originalCode}
            modified={modifiedCode}
            theme={editorTheme}
            loading={<ShimmerLoader variant="diff" />}
            options={{
              renderSideBySide: true,
              readOnly: false,
              originalEditable: true,
              fontSize: 13,
              fontFamily: "var(--font-jetbrains-mono)",
              minimap: { enabled: false },
              overviewRulerLanes: 0,
              overviewRulerBorder: false,
              renderOverviewRuler: false,
              scrollBeyondLastLine: false,
              hideUnchangedRegions: { enabled: false },
              scrollbar: {
                vertical: "visible",
                horizontal: "auto",
                verticalScrollbarSize: 8,
                horizontalScrollbarSize: 8,
                useShadows: false,
              },
              glyphMargin: false,
              folding: true,
              lineNumbersMinChars: 3,
              padding: { top: 12, bottom: 12 },
            }}
          />
        </div>
      </div>
    </SlideUp>
  );
};
