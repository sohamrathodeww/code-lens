"use client";

import React, { useState } from "react";
import { DiffEditor } from "@monaco-editor/react";
import {
  Code2,
  Columns,
  Square,
  Upload,
  RefreshCw,
  PlusCircle,
  MinusCircle,
  FileCode,
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
  const [isInline, setIsInline] = useState<boolean>(false);
  const [showInlineUpload, setShowInlineUpload] = useState<boolean>(false);

  const getDiffStats = () => {
    const origLines = originalCode.split("\n");
    const modLines = modifiedCode.split("\n");

    const added = Math.max(0, modLines.length - origLines.length);
    const deleted = Math.max(0, origLines.length - modLines.length);
    const totalLines = modLines.length;

    return { added, deleted, totalLines };
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

  const clearEditors = () => {
    setOriginalCode("");
    setModifiedCode("");
    setOriginalFilename("Original Source");
    setModifiedFilename("Modified Source");
  };

  const resetPreset = () => {
    setOriginalCode(SAMPLE_ORIGINAL);
    setModifiedCode(SAMPLE_MODIFIED);
    setOriginalFilename("Original Source");
    setModifiedFilename("Modified Source");
    setLanguage("typescript");
  };

  return (
    <SlideUp className="space-y-6 font-sans">
      {/* Top Header Bar */}
      <div className="liquid-glass-surface p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <span className="lens-sheen" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-indigo-600/10 border border-indigo-200/80 text-indigo-600 shadow-[inset_0_1.5px_2px_#ffffff]">
            <Code2 className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              Code Compare Studio
            </h1>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-600 font-bold mt-1">
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <PlusCircle className="w-3.5 h-3.5" /> +{stats.added} Added
              </span>
              <span className="flex items-center gap-1 text-rose-700 font-bold">
                <MinusCircle className="w-3.5 h-3.5" /> -{stats.deleted} Deleted
              </span>
              <span>Total: {stats.totalLines} lines</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-4 py-2 text-xs font-bold rounded-full bg-white/90 border border-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-[inset_0_1.5px_2px_#ffffff,0_6px_16px_rgba(15,23,42,0.06)] cursor-pointer font-sans"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id} className="bg-white text-slate-900">
                {lang.name}
              </option>
            ))}
          </select>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsInline(!isInline)}
            icon={isInline ? <Columns className="w-4 h-4 text-indigo-600" /> : <Square className="w-4 h-4 text-indigo-600" />}
          >
            {isInline ? "Split View" : "Unified Inline"}
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowInlineUpload(!showInlineUpload)}
            icon={<Upload className="w-4 h-4 text-white" />}
          >
            {showInlineUpload ? "Hide Upload" : "Upload Files (Max 5MB)"}
          </Button>

          <Button variant="ghost" size="sm" onClick={clearEditors} icon={<Trash2 className="w-4 h-4 text-rose-600" />}>
            Clear
          </Button>

          <Button variant="ghost" size="sm" onClick={resetPreset} icon={<RefreshCw className="w-4 h-4 text-slate-700" />}>
            Reset
          </Button>
        </div>
      </div>

      {/* Dual File Upload Drop Bars */}
      {showInlineUpload && (
        <FadeIn className="liquid-glass-surface p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs font-bold text-indigo-700 mb-2">
                Upload Original File (Max 5MB)
              </h4>
              <FileUploadZone
                onFileSelect={handleOriginalUpload}
                maxSizeMB={5}
                title="Upload Original Code"
                subtitle="Select or drop original file (Max 5MB)"
              />
            </div>
            <div>
              <h4 className="text-xs font-bold text-cyan-700 mb-2">
                Upload Modified File (Max 5MB)
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

      {/* Monaco Diff Editor Card */}
      <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[800px] relative">

        <span className="lens-sheen" />
        <div className="flex items-center justify-between pb-3 border-b border-slate-900/10 relative z-10">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-mono font-extrabold text-slate-900">
              {originalFilename}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-600" />
            <span className="text-xs font-mono font-extrabold text-slate-900">
              {modifiedFilename}
            </span>
          </div>
        </div>

        <div className="flex-1 mt-3 rounded-2xl overflow-hidden border border-white/80 shadow-inner bg-white/90 relative z-10">
          <DiffEditor
            height="100%"
            language={language}
            original={originalCode}
            modified={modifiedCode}
            theme="vs"
            loading={<ShimmerLoader variant="diff" />}
            options={{
              renderSideBySide: !isInline,
              readOnly: false,
              originalEditable: true,
              fontSize: 13,
              fontFamily: "var(--font-jetbrains-mono)",
              minimap: { enabled: false },
              smoothScrolling: true,
              cursorBlinking: "smooth",
              padding: { top: 14 },
            }}
          />
        </div>
      </div>
    </SlideUp>
  );
};

