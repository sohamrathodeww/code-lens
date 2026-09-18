"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Editor, DiffEditor } from "@monaco-editor/react";
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
  Split,
  GitCompare,
  Edit3,
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

/**
 * Line-by-line LCS diff logic for highlighted editor lines and margin icons
 */
function computeLineDiffs(originalText: string, modifiedText: string) {
  const origLines = originalText ? originalText.split("\n") : [];
  const modLines = modifiedText ? modifiedText.split("\n") : [];

  const N = origLines.length;
  const M = modLines.length;

  if (N === 0 && M === 0) {
    return {
      origDecorations: [],
      modDecorations: [],
      addedCount: 0,
      deletedCount: 0,
      modifiedCount: 0,
      totalLines: 0,
      origLinesCount: 0,
      modLinesCount: 0,
    };
  }

  if (originalText === modifiedText) {
    return {
      origDecorations: [],
      modDecorations: [],
      addedCount: 0,
      deletedCount: 0,
      modifiedCount: 0,
      totalLines: N,
      origLinesCount: N,
      modLinesCount: M,
    };
  }

  const dp: number[][] = Array.from({ length: N + 1 }, () => new Array(M + 1).fill(0));

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= M; j++) {
      if (origLines[i - 1] === modLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  let i = N;
  let j = M;

  const diffOps: { type: "same" | "delete" | "add"; origIdx?: number; modIdx?: number }[] = [];

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
      diffOps.push({ type: "same", origIdx: i - 1, modIdx: j - 1 });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      diffOps.push({ type: "add", modIdx: j - 1 });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] < dp[i - 1][j])) {
      diffOps.push({ type: "delete", origIdx: i - 1 });
      i--;
    }
  }

  diffOps.reverse();

  const origDecorations: { line: number; type: "deleted" | "modified" }[] = [];
  const modDecorations: { line: number; type: "added" | "modified" }[] = [];

  let addedCount = 0;
  let deletedCount = 0;
  let modifiedCount = 0;

  let opIdx = 0;
  while (opIdx < diffOps.length) {
    const op = diffOps[opIdx];
    if (op.type === "delete") {
      if (opIdx + 1 < diffOps.length && diffOps[opIdx + 1].type === "add") {
        origDecorations.push({ line: op.origIdx! + 1, type: "modified" });
        modDecorations.push({ line: diffOps[opIdx + 1].modIdx! + 1, type: "modified" });
        modifiedCount++;
        opIdx += 2;
        continue;
      } else {
        origDecorations.push({ line: op.origIdx! + 1, type: "deleted" });
        deletedCount++;
      }
    } else if (op.type === "add") {
      modDecorations.push({ line: op.modIdx! + 1, type: "added" });
      addedCount++;
    }
    opIdx++;
  }

  return {
    origDecorations,
    modDecorations,
    addedCount,
    deletedCount,
    modifiedCount,
    totalLines: Math.max(N, M),
    origLinesCount: N,
    modLinesCount: M,
  };
}

export const CodeCompareFeature: React.FC = () => {
  const [originalCode, setOriginalCode] = useState<string>(SAMPLE_ORIGINAL);
  const [modifiedCode, setModifiedCode] = useState<string>(SAMPLE_MODIFIED);
  const [originalFilename, setOriginalFilename] = useState<string>("Original Source");
  const [modifiedFilename, setModifiedFilename] = useState<string>("Modified Source");
  const [language, setLanguage] = useState<string>("typescript");
  const [editorTheme, setEditorTheme] = useState<"vs" | "vs-dark">("vs");
  const [showInlineUpload, setShowInlineUpload] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"cards" | "diff">("cards");

  const [copiedOriginal, setCopiedOriginal] = useState<boolean>(false);
  const [copiedModified, setCopiedModified] = useState<boolean>(false);

  // Monaco Editor references for applying dynamic diff line decorations
  const origEditorRef = useRef<any>(null);
  const modEditorRef = useRef<any>(null);
  const monacoRef = useRef<any>(null);
  const origDecorationsRef = useRef<string[]>([]);
  const modDecorationsRef = useRef<string[]>([]);

  const stats = useMemo(() => computeLineDiffs(originalCode, modifiedCode), [originalCode, modifiedCode]);

  const applyDecorations = useCallback(() => {
    if (!monacoRef.current) return;

    if (origEditorRef.current) {
      const newOrigDecs = stats.origDecorations.map((d) => ({
        range: new monacoRef.current.Range(d.line, 1, d.line, 1),
        options: {
          isWholeLine: true,
          className: d.type === "deleted" ? "diff-line-deleted" : "diff-line-modified",
          linesDecorationsClassName: d.type === "deleted" ? "diff-margin-deleted" : "diff-margin-modified",
        },
      }));
      origDecorationsRef.current = origEditorRef.current.deltaDecorations(
        origDecorationsRef.current,
        newOrigDecs
      );
    }

    if (modEditorRef.current) {
      const newModDecs = stats.modDecorations.map((d) => ({
        range: new monacoRef.current.Range(d.line, 1, d.line, 1),
        options: {
          isWholeLine: true,
          className: d.type === "added" ? "diff-line-added" : "diff-line-modified",
          linesDecorationsClassName: d.type === "added" ? "diff-margin-added" : "diff-margin-modified",
        },
      }));
      modDecorationsRef.current = modEditorRef.current.deltaDecorations(
        modDecorationsRef.current,
        newModDecs
      );
    }
  }, [stats]);

  useEffect(() => {
    applyDecorations();
  }, [applyDecorations, viewMode]);

  const handleOrigMount = (editor: any, monaco: any) => {
    origEditorRef.current = editor;
    monacoRef.current = monaco;
    applyDecorations();
  };

  const handleModMount = (editor: any, monaco: any) => {
    modEditorRef.current = editor;
    monacoRef.current = monaco;
    applyDecorations();
  };

  const handleOriginalUpload = (content: string, filename: string) => {
    setOriginalCode(content);
    setOriginalFilename(filename);
  };

  const handleModifiedUpload = (content: string, filename: string) => {
    setModifiedCode(content);
    setModifiedFilename(filename);
  };

  const handleReset = () => {
    setOriginalCode("");
    setModifiedCode("");
    setOriginalFilename("Original Source");
    setModifiedFilename("Modified Source");
  };

  const handleLoadSample = () => {
    setOriginalCode(SAMPLE_ORIGINAL);
    setModifiedCode(SAMPLE_MODIFIED);
    setOriginalFilename("Original Sample");
    setModifiedFilename("Modified Sample");
    setLanguage("typescript");
  };

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
              Online Code Compare
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 font-bold mt-1.5">
              <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                <PlusCircle className="w-3.5 h-3.5" /> +{stats.addedCount} Added
              </span>
              <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                <MinusCircle className="w-3.5 h-3.5" /> -{stats.deletedCount} Deleted
              </span>
              {stats.modifiedCount > 0 && (
                <span className="flex items-center gap-1 text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/60">
                  <Edit3 className="w-3.5 h-3.5" /> ~{stats.modifiedCount} Modified
                </span>
              )}
              <span className="bg-slate-100/90 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200/80">
                Total: {stats.totalLines} lines
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/90 border border-slate-200/80 shadow-[inset_0_1.5px_2px_#ffffff]">
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "cards"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
              title="Side-by-side Cards View (JSON Viewer Box style)"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Cards View</span>
            </button>
            <button
              onClick={() => setViewMode("diff")}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                viewMode === "diff"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
              title="Monaco Diff Engine View"
            >
              <GitCompare className="w-3.5 h-3.5" />
              <span>Monaco Diff</span>
            </button>
          </div>

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

          {/* Reset Button */}
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

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Box 1: Source Code (Original Input) */}
          <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative">
            <span className="lens-sheen" />
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-900/10 relative z-10">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <FileCode className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
                <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 truncate">
                  Original Source ({originalFilename})
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-slate-500 font-bold">
                  {stats.origLinesCount} Lines
                </span>
                {stats.deletedCount > 0 && (
                  <span className="text-xs font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200/70">
                    -{stats.deletedCount} Removed
                  </span>
                )}
                {stats.modifiedCount > 0 && (
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70">
                    ~{stats.modifiedCount} Modified
                  </span>
                )}
                <button
                  onClick={handleCopyOriginal}
                  disabled={!originalCode}
                  title="Copy original code"
                  className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-xl transition-colors border border-slate-200/80 bg-white/80 shadow-2xs disabled:opacity-40"
                >
                  {copiedOriginal ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setOriginalCode("")}
                  disabled={!originalCode}
                  title="Clear original code"
                  className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-xl transition-colors border border-slate-200/80 bg-white/80 shadow-2xs disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10">
              <Editor
                height="100%"
                language={language}
                value={originalCode}
                onChange={(v) => setOriginalCode(v || "")}
                theme={editorTheme}
                onMount={handleOrigMount}
                loading={<ShimmerLoader variant="editor" />}
                options={{
                  fontSize: 13.5,
                  fontFamily: "var(--font-jetbrains-mono)",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  padding: { top: 16 },
                  lineDecorationsWidth: 16,
                  lineNumbersMinChars: 3,
                  glyphMargin: false,
                }}
              />
            </div>
          </div>

          {/* Box 2: Modified Code (Refactored Output) */}
          <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative">
            <span className="lens-sheen" />
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-900/10 relative z-10">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <FileCode className="w-4.5 h-4.5 text-cyan-600 shrink-0" />
                <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 truncate">
                  Modified Source ({modifiedFilename})
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-mono text-slate-500 font-bold">
                  {stats.modLinesCount} Lines
                </span>
                {stats.addedCount > 0 && (
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/70">
                    +{stats.addedCount} Added
                  </span>
                )}
                {stats.modifiedCount > 0 && (
                  <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/70">
                    ~{stats.modifiedCount} Modified
                  </span>
                )}
                <button
                  onClick={handleCopyModified}
                  disabled={!modifiedCode}
                  title="Copy modified code"
                  className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-xl transition-colors border border-slate-200/80 bg-white/80 shadow-2xs disabled:opacity-40"
                >
                  {copiedModified ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setModifiedCode("")}
                  disabled={!modifiedCode}
                  title="Clear modified code"
                  className="p-1.5 text-slate-600 hover:text-rose-600 hover:bg-white rounded-xl transition-colors border border-slate-200/80 bg-white/80 shadow-2xs disabled:opacity-40"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10">
              <Editor
                height="100%"
                language={language}
                value={modifiedCode}
                onChange={(v) => setModifiedCode(v || "")}
                theme={editorTheme}
                onMount={handleModMount}
                loading={<ShimmerLoader variant="editor" />}
                options={{
                  fontSize: 13.5,
                  fontFamily: "var(--font-jetbrains-mono)",
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  padding: { top: 16 },
                  lineDecorationsWidth: 16,
                  lineNumbersMinChars: 3,
                  glyphMargin: false,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative bg-white/80 border border-slate-200/90 shadow-lg">
          <span className="lens-sheen" />

          {/* Diff Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-3.5 border-b border-slate-900/10 relative z-10 items-center">
            <div className="flex items-center justify-between bg-slate-100/90 border border-slate-200/90 px-4 py-2.5 rounded-2xl shadow-2xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                <span className="text-xs font-mono font-bold text-slate-900 truncate">
                  Original ({originalFilename}) — {stats.origLinesCount} Lines
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-slate-100/90 border border-slate-200/90 px-4 py-2.5 rounded-2xl shadow-2xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-mono font-bold text-slate-900 truncate">
                  Modified ({modifiedFilename}) — {stats.modLinesCount} Lines
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10">
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
                automaticLayout: true,
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
      )}
    </SlideUp>
  );
};

