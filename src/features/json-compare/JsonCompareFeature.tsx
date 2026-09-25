"use client";


import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";
import { Editor } from "@monaco-editor/react";
import {
  FileJson,
  ArrowLeftRight,
  Sparkles,
  RotateCcw,
  PlusCircle,
  MinusCircle,
  FileCode,
  Copy,
  Check,
  Sun,
  Moon,
  Trash2,
  Edit3,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ShimmerLoader } from "@/components/ui/ShimmerLoader";
import { SlideUp } from "@/components/motion/MotionPrimitives";

const SAMPLE_ORIGINAL = `{
  "projectId": "PRJ-98213",
  "name": "Apollo Launch",
  "status": "active",
  "metrics": {
    "users": 1050,
    "revenue": 45000.50,
    "uptime": 99.9
  },
  "tags": ["space", "launch", "critical"]
}`;

const SAMPLE_MODIFIED = `{
  "projectId": "PRJ-98213",
  "name": "Apollo Launch V2",
  "status": "completed",
  "metrics": {
    "users": 1250,
    "revenue": 52000.00,
    "uptime": 99.99,
    "errors": 0
  },
  "tags": ["space", "launch", "success", "archived"]
}`;

function formatJsonString(code: string): string {
  if (!code || !code.trim()) return code;
  try {
    const parsed = JSON.parse(code);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return code; // If invalid JSON, return raw code
  }
}

function getCharDiffRange(lineA: string = "", lineB: string = "") {
  const lenA = lineA.length;
  const lenB = lineB.length;

  if (lenA === 0) return { startA: 1, endA: 1, startB: 1, endB: lenB + 1 };
  if (lenB === 0) return { startA: 1, endA: lenA + 1, startB: 1, endB: 1 };

  let start = 0;
  while (start < lenA && start < lenB && lineA[start] === lineB[start]) {
    start++;
  }

  let endA = lenA - 1;
  let endB = lenB - 1;
  while (endA >= start && endB >= start && lineA[endA] === lineB[endB]) {
    endA--;
    endB--;
  }

  return {
    startA: start + 1,
    endA: Math.max(start + 1, endA + 2),
    startB: start + 1,
    endB: Math.max(start + 1, endB + 2),
  };
}

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

  const origDecorations: { line: number; startCol: number; endCol: number; type: "deleted" | "modified" }[] = [];
  const modDecorations: { line: number; startCol: number; endCol: number; type: "added" | "modified" }[] = [];

  let addedCount = 0;
  let deletedCount = 0;
  let modifiedCount = 0;

  let opIdx = 0;
  while (opIdx < diffOps.length) {
    const op = diffOps[opIdx];
    if (op.type === "delete") {
      if (opIdx + 1 < diffOps.length && diffOps[opIdx + 1].type === "add") {
        const origLineStr = origLines[op.origIdx!] || "";
        const modLineStr = modLines[diffOps[opIdx + 1].modIdx!] || "";
        const { startA, endA, startB, endB } = getCharDiffRange(origLineStr, modLineStr);

        origDecorations.push({ line: op.origIdx! + 1, startCol: startA, endCol: endA, type: "modified" });
        modDecorations.push({ line: diffOps[opIdx + 1].modIdx! + 1, startCol: startB, endCol: endB, type: "modified" });
        modifiedCount++;
        opIdx += 2;
        continue;
      } else {
        const origLineStr = origLines[op.origIdx!] || "";
        origDecorations.push({ line: op.origIdx! + 1, startCol: 1, endCol: origLineStr.length + 1, type: "deleted" });
        deletedCount++;
      }
    } else if (op.type === "add") {
      const modLineStr = modLines[op.modIdx!] || "";
      modDecorations.push({ line: op.modIdx! + 1, startCol: 1, endCol: modLineStr.length + 1, type: "added" });
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

export const JsonCompareFeature: React.FC = () => {
  const [originalCode, setOriginalCode] = useState<string>(SAMPLE_ORIGINAL);
  const [modifiedCode, setModifiedCode] = useState<string>(SAMPLE_MODIFIED);
  const [originalFilename, setOriginalFilename] = useState<string>("Original JSON");
  const [modifiedFilename, setModifiedFilename] = useState<string>("Modified JSON");
  const { theme } = useTheme();

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
        range: new monacoRef.current.Range(d.line, d.startCol, d.line, d.endCol),
        options: {
          isWholeLine: d.type === "deleted",
          className: d.type === "deleted" ? "diff-line-deleted" : "diff-line-modified",
          inlineClassName: d.type === "modified" ? "diff-char-deleted" : undefined,
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
        range: new monacoRef.current.Range(d.line, d.startCol, d.line, d.endCol),
        options: {
          isWholeLine: d.type === "added",
          className: d.type === "added" ? "diff-line-added" : "diff-line-modified",
          inlineClassName: d.type === "modified" ? "diff-char-added" : undefined,
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
  }, [applyDecorations]);

  const handleFormatOriginal = useCallback(() => {
    if (!originalCode) return;
    const formatted = formatJsonString(originalCode);
    setOriginalCode(formatted);
    if (origEditorRef.current) {
      setTimeout(() => {
        origEditorRef.current.getAction("editor.action.formatDocument")?.run();
      }, 50);
    }
  }, [originalCode]);

  const handleFormatModified = useCallback(() => {
    if (!modifiedCode) return;
    const formatted = formatJsonString(modifiedCode);
    setModifiedCode(formatted);
    if (modEditorRef.current) {
      setTimeout(() => {
        modEditorRef.current.getAction("editor.action.formatDocument")?.run();
      }, 50);
    }
  }, [modifiedCode]);

  const handleFormatBoth = useCallback(() => {
    handleFormatOriginal();
    handleFormatModified();
  }, [handleFormatOriginal, handleFormatModified]);

  const handleOrigMount = (editor: any, monaco: any) => {
    origEditorRef.current = editor;
    monacoRef.current = monaco;
    applyDecorations();

    editor.onDidPaste(() => {
      setTimeout(() => {
        const val = editor.getValue();
        if (val) {
          const formatted = formatJsonString(val);
          if (formatted !== val) {
            editor.setValue(formatted);
          }
          editor.getAction("editor.action.formatDocument")?.run();
        }
      }, 100);
    });
  };

  const handleModMount = (editor: any, monaco: any) => {
    modEditorRef.current = editor;
    monacoRef.current = monaco;
    applyDecorations();

    editor.onDidPaste(() => {
      setTimeout(() => {
        const val = editor.getValue();
        if (val) {
          const formatted = formatJsonString(val);
          if (formatted !== val) {
            editor.setValue(formatted);
          }
          editor.getAction("editor.action.formatDocument")?.run();
        }
      }, 100);
    });
  };

  const handleReset = () => {
    setOriginalCode("");
    setModifiedCode("");
    setOriginalFilename("Original JSON");
    setModifiedFilename("Modified JSON");
  };

  const handleLoadSample = () => {
    setOriginalCode(SAMPLE_ORIGINAL);
    setModifiedCode(SAMPLE_MODIFIED);
    setOriginalFilename("Sample Original JSON");
    setModifiedFilename("Sample Modified JSON");
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
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/10 border border-indigo-200/80 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400 ">
            <FileJson className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
              Online JSON Compare
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 font-bold mt-1.5">
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-500/20">
                <PlusCircle className="w-3.5 h-3.5" /> +{stats.addedCount} Added
              </span>
              <span className="flex items-center gap-1 text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-200/60 dark:border-rose-500/20">
                <MinusCircle className="w-3.5 h-3.5" /> -{stats.deletedCount} Deleted
              </span>
              {stats.modifiedCount > 0 && (
                <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-200/60 dark:border-amber-500/20">
                  <Edit3 className="w-3.5 h-3.5" /> ~{stats.modifiedCount} Modified
                </span>
              )}
              <span className="bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80">
                Total: {stats.totalLines} lines
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Format Both Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleFormatBoth}
            icon={<Wand2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            title="Auto format JSON on both sides"
          >
            Auto Format JSON
          </Button>

          {/* Theme Toggle */}
          

          {/* Sample Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLoadSample}
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            title="Load Sample JSON"
          >
            Sample
          </Button>

          {/* Swap Sides Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSwapSides}
            icon={<ArrowLeftRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            title="Swap Left and Right Sides"
          >
            Swap
          </Button>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
            title="Clean/Reset both JSON boxes"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Main Dual Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Box 1: Original Source */}
        <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative">
          <span className="lens-sheen" />
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-900/10 relative z-10">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-50 dark:bg-rose-500/100 shrink-0" />
              <FileCode className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {originalFilename}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                {stats.origLinesCount} Lines
              </span>
              {stats.deletedCount > 0 && (
                <span className="text-xs font-mono font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-200/70">
                  -{stats.deletedCount} Removed
                </span>
              )}
              {stats.modifiedCount > 0 && (
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-200/70">
                  ~{stats.modifiedCount} Modified
                </span>
              )}
              <button
                onClick={handleFormatOriginal}
                disabled={!originalCode}
                title="Format original JSON"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Wand2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyOriginal}
                disabled={!originalCode}
                title="Copy original JSON"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                {copiedOriginal ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setOriginalCode("")}
                disabled={!originalCode}
                title="Clear original JSON"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:text-rose-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700/90 shadow-inner bg-white dark:bg-slate-900 relative z-10">
            <Editor
              height="100%"
              language="json"
              value={originalCode}
              onChange={(v) => setOriginalCode(v || "")}
              theme={theme === "dark" ? "vs-dark" : "vs"}
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
                lineDecorationsWidth: 26,
                lineNumbersMinChars: 3,
                glyphMargin: false,
                scrollbar: { alwaysConsumeMouseWheel: false },
              }}
            />
          </div>
        </div>

        {/* Box 2: Modified Source */}
        <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative">
          <span className="lens-sheen" />
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-900/10 relative z-10">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-50 dark:bg-emerald-500/100 shrink-0" />
              <FileCode className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 dark:text-slate-100 truncate">
                {modifiedFilename}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                {stats.modLinesCount} Lines
              </span>
              {stats.addedCount > 0 && (
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-200/70">
                  +{stats.addedCount} Added
                </span>
              )}
              {stats.modifiedCount > 0 && (
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-200/70">
                  ~{stats.modifiedCount} Modified
                </span>
              )}
              <button
                onClick={handleFormatModified}
                disabled={!modifiedCode}
                title="Format modified JSON"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Wand2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyModified}
                disabled={!modifiedCode}
                title="Copy modified JSON"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                {copiedModified ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setModifiedCode("")}
                disabled={!modifiedCode}
                title="Clear modified JSON"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:text-rose-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700/90 shadow-inner bg-white dark:bg-slate-900 relative z-10">
            <Editor
              height="100%"
              language="json"
              value={modifiedCode}
              onChange={(v) => setModifiedCode(v || "")}
              theme={theme === "dark" ? "vs-dark" : "vs"}
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
                lineDecorationsWidth: 26,
                lineNumbersMinChars: 3,
                glyphMargin: false,
                scrollbar: { alwaysConsumeMouseWheel: false },
              }}
            />
          </div>
        </div>
      </div>
    </SlideUp>
  );
};









