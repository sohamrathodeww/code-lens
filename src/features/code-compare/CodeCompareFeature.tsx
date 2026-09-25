"use client";


import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "next-themes";
import { DiffEditor } from "@monaco-editor/react";
import {
  Code2,
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

const SAMPLE_ORIGINAL = `// CodeLens PRO - Online Text & Code Compare Original
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

const SAMPLE_MODIFIED = `// CodeLens PRO - Online Text & Code Compare Refactored
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

/**
 * Smart Code & Text Formatter
 */
export function formatCodeString(code: string, lang: string = "typescript"): string {
  if (!code || !code.trim()) return code;

  // JSON formatting
  if (lang === "json" || (code.trim().startsWith("{") && code.trim().endsWith("}"))) {
    try {
      const parsed = JSON.parse(code);
      return JSON.stringify(parsed, null, 2);
    } catch {
      // Fallback
    }
  }

  // Bracket & Indentation formatting for JS, TS, HTML, CSS, SQL, Python, C++, Java, etc.
  try {
    const lines = code.split(/\r?\n/);
    let indentLevel = 0;
    const formattedLines: string[] = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) {
        formattedLines.push("");
        continue;
      }

      if (/^[\}\]\)]/.test(line)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      formattedLines.push("  ".repeat(indentLevel) + line);

      const openBrackets = (line.match(/[\{\(\[]/g) || []).length;
      const closeBrackets = (line.match(/[\}\)\]]/g) || []).length;
      indentLevel += openBrackets - closeBrackets;
      if (indentLevel < 0) indentLevel = 0;
    }

    return formattedLines.join("\n");
  } catch {
    return code;
  }
}

/**
 * Line-by-line & character-level LCS diff logic for stats ONLY
 */
function computeLineDiffs(originalText: string, modifiedText: string) {
  const origLines = originalText ? originalText.split("\n") : [];
  const modLines = modifiedText ? modifiedText.split("\n") : [];

  const N = origLines.length;
  const M = modLines.length;

  if (N === 0 && M === 0) {
    return { addedCount: 0, deletedCount: 0, modifiedCount: 0, totalLines: 0, origLinesCount: 0, modLinesCount: 0 };
  }

  if (originalText === modifiedText) {
    return { addedCount: 0, deletedCount: 0, modifiedCount: 0, totalLines: N, origLinesCount: N, modLinesCount: M };
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

  let addedCount = 0;
  let deletedCount = 0;
  let modifiedCount = 0;

  let opIdx = 0;
  while (opIdx < diffOps.length) {
    const op = diffOps[opIdx];
    if (op.type === "delete") {
      if (opIdx + 1 < diffOps.length && diffOps[opIdx + 1].type === "add") {
        modifiedCount++;
        opIdx += 2;
        continue;
      } else {
        deletedCount++;
      }
    } else if (op.type === "add") {
      addedCount++;
    }
    opIdx++;
  }

  return { addedCount, deletedCount, modifiedCount, totalLines: Math.max(N, M), origLinesCount: N, modLinesCount: M };
}

export const CodeCompareFeature: React.FC = () => {
  const [originalCode, setOriginalCode] = useState<string>(SAMPLE_ORIGINAL);
  const [modifiedCode, setModifiedCode] = useState<string>(SAMPLE_MODIFIED);
  const [originalFilename, setOriginalFilename] = useState<string>("Original Text");
  const [modifiedFilename, setModifiedFilename] = useState<string>("Modified Text");
  const { theme } = useTheme();

  const [copiedOriginal, setCopiedOriginal] = useState<boolean>(false);
  const [copiedModified, setCopiedModified] = useState<boolean>(false);

  const diffEditorRef = useRef<any>(null);

  const stats = useMemo(() => computeLineDiffs(originalCode, modifiedCode), [originalCode, modifiedCode]);

  const handleFormatOriginal = useCallback(() => {
    if (!originalCode) return;
    const formatted = formatCodeString(originalCode);
    setOriginalCode(formatted);
    if (diffEditorRef.current) {
      setTimeout(() => {
        diffEditorRef.current.getOriginalEditor().getAction("editor.action.formatDocument")?.run();
      }, 50);
    }
  }, [originalCode]);

  const handleFormatModified = useCallback(() => {
    if (!modifiedCode) return;
    const formatted = formatCodeString(modifiedCode);
    setModifiedCode(formatted);
    if (diffEditorRef.current) {
      setTimeout(() => {
        diffEditorRef.current.getModifiedEditor().getAction("editor.action.formatDocument")?.run();
      }, 50);
    }
  }, [modifiedCode]);

  const handleFormatBoth = useCallback(() => {
    handleFormatOriginal();
    handleFormatModified();
  }, [handleFormatOriginal, handleFormatModified]);

  const handleDiffMount = (editor: any) => {
    diffEditorRef.current = editor;

    const originalEditor = editor.getOriginalEditor();
    const modifiedEditor = editor.getModifiedEditor();

    originalEditor.onDidChangeModelContent(() => {
      setOriginalCode(originalEditor.getValue());
    });

    modifiedEditor.onDidChangeModelContent(() => {
      setModifiedCode(modifiedEditor.getValue());
    });
    
    // Attempt auto-format on paste for both editors
    originalEditor.onDidPaste(() => {
      setTimeout(() => {
        const val = originalEditor.getValue();
        if (val) {
          const formatted = formatCodeString(val);
          if (formatted !== val) {
            originalEditor.setValue(formatted);
          }
        }
      }, 100);
    });
    
    modifiedEditor.onDidPaste(() => {
      setTimeout(() => {
        const val = modifiedEditor.getValue();
        if (val) {
          const formatted = formatCodeString(val);
          if (formatted !== val) {
            modifiedEditor.setValue(formatted);
          }
        }
      }, 100);
    });
  };

  const handleReset = () => {
    setOriginalCode("");
    setModifiedCode("");
    setOriginalFilename("Original Text");
    setModifiedFilename("Modified Text");
  };

  const handleLoadSample = () => {
    setOriginalCode(SAMPLE_ORIGINAL);
    setModifiedCode(SAMPLE_MODIFIED);
    setOriginalFilename("Original Sample");
    setModifiedFilename("Modified Sample");
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
            <Code2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
              Online Text Compare
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
            title="Format text on both sides automatically"
          >
            Format Both
          </Button>

          {/* Theme Toggle */}
          

          {/* Sample Button */}
          <Button
            variant="secondary"
            size="sm"
            onClick={handleLoadSample}
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
            title="Load Sample Text"
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
            Swap Sides
          </Button>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
            title="Clean/Reset both text boxes"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Main Single Card for DiffEditor */}
      <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative">
        <span className="lens-sheen" />
        
        {/* Dual Toolbars (Grid 2 cols to match the diff layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-slate-900/10 relative z-10">
          
          {/* Original Toolbar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-50 dark:bg-rose-500/100 shrink-0" />
              <FileCode className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 dark:text-slate-100 truncate">
                Original Text ({originalFilename})
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold hidden sm:inline-block">
                {stats.origLinesCount} Lines
              </span>
              <button
                onClick={handleFormatOriginal}
                disabled={!originalCode}
                title="Format original text"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Wand2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyOriginal}
                disabled={!originalCode}
                title="Copy original text"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                {copiedOriginal ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setOriginalCode("")}
                disabled={!originalCode}
                title="Clear original text"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:text-rose-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modified Toolbar */}
          <div className="flex items-center justify-between border-l-0 md:border-l border-slate-200/50 dark:border-slate-700/50 pl-0 md:pl-6 pt-4 md:pt-0 mt-4 md:mt-0 border-t md:border-t-0">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-50 dark:bg-emerald-500/100 shrink-0" />
              <FileCode className="w-4.5 h-4.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 dark:text-slate-100 truncate">
                Modified Text ({modifiedFilename})
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold hidden sm:inline-block">
                {stats.modLinesCount} Lines
              </span>
              <button
                onClick={handleFormatModified}
                disabled={!modifiedCode}
                title="Format modified text"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Wand2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleCopyModified}
                disabled={!modifiedCode}
                title="Copy modified text"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:text-indigo-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                {copiedModified ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setModifiedCode("")}
                disabled={!modifiedCode}
                title="Clear modified text"
                className="p-1.5 text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:text-rose-400 hover:bg-white dark:bg-slate-900 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 bg-white dark:bg-slate-900/80 dark:bg-slate-800/80 shadow-2xs disabled:opacity-40"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="flex-1 mt-4 rounded-xl overflow-hidden border border-slate-200/90 dark:border-slate-700/90 shadow-[inset_0_2px_12px_rgba(15,23,42,0.04)] bg-white dark:bg-slate-900 relative z-10">
          <DiffEditor
            height="100%"
            language="typescript"
            original={originalCode}
            modified={modifiedCode}
            theme={theme === "dark" ? "vs-dark" : "vs"}
            onMount={handleDiffMount}
            loading={<ShimmerLoader variant="editor" />}
            options={{
              renderSideBySide: true,
              originalEditable: true,
              fontSize: 13.5,
              fontFamily: "var(--font-jetbrains-mono)",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              cursorBlinking: "smooth",
              padding: { top: 16 },
              renderOverviewRuler: false,
              ignoreTrimWhitespace: false,
              scrollbar: {
                alwaysConsumeMouseWheel: false,
              },
            }}
          />
        </div>
      </div>
    </SlideUp>
  );
};









