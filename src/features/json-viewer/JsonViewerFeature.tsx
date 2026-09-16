"use client";

import React, { useState, useMemo } from "react";
import Editor from "@monaco-editor/react";
import {
  FileJson,
  Check,
  Copy,
  Download,
  Search,
  AlertCircle,
  Wand2,
  Minimize2,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  Layers,
  FileText,
  Upload,
  Trash2,
  CheckCircle2,
  Table,
  Network,
  BarChart3,
  PieChart,
  FolderTree,
  Hash,
  Activity,
  Grid,
  Workflow,
  GitFork,
  Boxes,
  Share2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { FileUploadZone } from "@/components/ui/FileUploadZone";
import { ShimmerLoader } from "@/components/ui/ShimmerLoader";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

const DEFAULT_SAMPLE_JSON = {
  appName: "CodeLens PRO",
  version: "3.2.0",
  feature: "Online JSON Viewer & Inspector",
  settings: {
    maxUploadSizeMB: 5,
    autoValidate: true,
    syntaxHighlighting: true,
    theme: "Liquid Glass Dark Mode",
  },
  supportedFormats: ["JSON", "JSONL", "TXT"],
  dataSample: {
    users: [
      { id: 101, name: "Alice Vance", role: "Frontend Architect", active: true, score: 98.4 },
      { id: 102, name: "Bob Sterling", role: "Principal Engineer", active: true, score: 92.1 },
      { id: 103, name: "Charlie Davis", role: "DevOps Lead", active: false, score: 87.6 },
    ],
    status: "success",
    timestamp: "2026-09-10T16:15:00Z",
  },
};

type ViewMode = "tree" | "table" | "hierarchy" | "diagram" | "graph";

export const JsonViewerFeature: React.FC = () => {
  const [jsonText, setJsonText] = useState<string>(
    JSON.stringify(DEFAULT_SAMPLE_JSON, null, 2)
  );
  const [parsedData, setParsedData] = useState<any>(DEFAULT_SAMPLE_JSON);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandAll, setExpandAll] = useState<boolean>(true);
  const [showInlineUpload, setShowInlineUpload] = useState<boolean>(false);
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("tree");

  const formatJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setParsedData(parsed);
      setJsonError(null);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.8 } });
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON payload syntax.");
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed));
      setParsedData(parsed);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON payload syntax.");
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    const text = value || "";
    setJsonText(text);
    try {
      if (!text.trim()) {
        setParsedData(null);
        setJsonError(null);
        return;
      }
      const parsed = JSON.parse(text);
      setParsedData(parsed);
      setJsonError(null);
    } catch (err: any) {
      setJsonError(err.message || "Invalid JSON syntax.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonText], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "json_viewer_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSample = () => {
    const sampleStr = JSON.stringify(DEFAULT_SAMPLE_JSON, null, 2);
    setJsonText(sampleStr);
    setParsedData(DEFAULT_SAMPLE_JSON);
    setJsonError(null);
  };

  const handleFileLoaded = (content: string, filename: string) => {
    setJsonText(content);
    try {
      const parsed = JSON.parse(content);
      setParsedData(parsed);
      setJsonError(null);
    } catch (err: any) {
      setJsonError("File loaded, but syntax validation failed.");
    }
  };

  const clearJson = () => {
    setJsonText("");
    setParsedData(null);
    setJsonError(null);
  };

  const handleCopyPath = (path: string) => {
    navigator.clipboard.writeText(path);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2500);
  };

  return (
    <SlideUp className="space-y-6 font-sans">
      {/* Title Header */}
      <div className="liquid-glass-surface px-6 py-4.5 sm:px-8 sm:py-5 flex items-center justify-between gap-4 relative">
        <span className="lens-sheen" />
        <div className="flex items-center gap-3.5 relative z-10">
          <div className="p-2.5 rounded-2xl bg-indigo-600/10 border border-indigo-200/80 text-indigo-600 shadow-[inset_0_1.5px_2px_#ffffff]">
            <FileJson className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
              Online JSON Viewer
            </h1>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Multi-View JSON Suite: Tree, Table, Hierarchy, Flow Diagram & Analytics
            </p>
          </div>
        </div>
      </div>

      {/* Inline File Upload Area */}
      {showInlineUpload && (
        <FadeIn className="liquid-glass-surface p-6">
          <FileUploadZone
            onFileSelect={handleFileLoaded}
            allowedExtensions={[".json", ".txt", ".jsonl"]}
            acceptLabel="JSON, JSONL, TXT (Max 5MB)"
            title="Drag & Drop JSON File Here"
            subtitle="Strict 5MB file validation with instant formatting"
          />
        </FadeIn>
      )}

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
        {/* Box 1: Source JSON Editor */}
        <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[800px] relative">
          <span className="lens-sheen" />
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-900/10 relative z-10">
            <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-indigo-600" />
              Source Code (Input)
            </span>
            <span className="text-xs font-mono text-slate-500 font-bold">
              {jsonText.split("\n").length} Lines
            </span>
          </div>

          <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-white/80 shadow-inner bg-white/90 relative z-10">
            <Editor
              height="100%"
              defaultLanguage="json"
              theme="vs"
              value={jsonText}
              onChange={handleEditorChange}
              loading={<ShimmerLoader variant="editor" />}
              options={{
                fontSize: 13.5,
                fontFamily: "var(--font-jetbrains-mono)",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                formatOnPaste: true,
                padding: { top: 16 },
              }}
            />
          </div>

          {jsonError && (
            <div className="mt-3 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-300 text-rose-800 text-xs flex items-center gap-2 font-mono font-bold relative z-10">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span className="truncate">{jsonError}</span>
            </div>
          )}
        </div>

        {/* Center Vertical Action Buttons */}
        <div className="flex flex-row lg:flex-col items-center justify-center gap-3 relative z-20 self-center py-2">
          {/* 1. Sample */}
          <Button
            variant="secondary"
            size="sm"
            onClick={loadSample}
            icon={<RefreshCw className="w-4 h-4 text-amber-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-slate-950"
            title="Load Sample JSON"
          >
            Sample
          </Button>

          {/* 2. Format */}
          <Button
            variant="primary"
            size="sm"
            onClick={formatJson}
            icon={<Wand2 className="w-4 h-4 text-indigo-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-slate-950"
            title="Format & Beautify JSON"
          >
            Format
          </Button>

          {/* 3. Clear */}
          <Button
            variant="secondary"
            size="sm"
            onClick={clearJson}
            icon={<Trash2 className="w-4 h-4 text-rose-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-rose-700 hover:bg-rose-50/80"
            title="Clear All Code"
          >
            Clear
          </Button>

          {/* 4. Minify */}
          <Button
            variant="secondary"
            size="sm"
            onClick={minifyJson}
            icon={<Minimize2 className="w-4 h-4 text-cyan-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-slate-950"
            title="Minify JSON payload"
          >
            Minify
          </Button>

          {/* 5. Copy */}
          <Button
            variant="secondary"
            size="sm"
            onClick={copyToClipboard}
            icon={copied ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <Copy className="w-4 h-4 text-blue-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-slate-950"
            title="Copy JSON to Clipboard"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>

          {/* 6. Download */}
          <Button
            variant="secondary"
            size="sm"
            onClick={downloadJson}
            icon={<Download className="w-4 h-4 text-violet-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-slate-950"
            title="Download JSON File"
          >
            Download
          </Button>

          {/* 7. Upload */}
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowInlineUpload(!showInlineUpload)}
            icon={<Upload className="w-4 h-4 text-indigo-600 shrink-0" />}
            className="w-full justify-center min-w-[115px] font-sans text-xs sm:text-sm font-extrabold text-slate-950"
            title="Upload File (Max 5MB)"
          >
            Upload
          </Button>
        </div>

        {/* Box 2: Multi-View Output Inspector */}
        <div className="liquid-glass-surface p-6 sm:p-7 flex flex-col h-[800px] relative">
          <span className="lens-sheen" />
          
          {/* Output Mode Navigation Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-slate-900/10 relative z-10">
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 border border-white shadow-[inset_0_1px_2px_#ffffff]">
              <button
                onClick={() => setViewMode("tree")}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                  viewMode === "tree"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Tree</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                  viewMode === "table"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>

              <button
                onClick={() => setViewMode("hierarchy")}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                  viewMode === "hierarchy"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <FolderTree className="w-3.5 h-3.5" />
                <span>Hierarchy</span>
              </button>

              <button
                onClick={() => setViewMode("diagram")}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                  viewMode === "diagram"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>Diagram Chart</span>
              </button>

              <button
                onClick={() => setViewMode("graph")}
                className={`px-3 py-1.5 rounded-xl text-xs font-sans font-extrabold transition-all flex items-center gap-1.5 ${
                  viewMode === "graph"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {/* Search Bar for Tree / Table / Hierarchy / Diagram */}
          {viewMode !== "graph" && (
            <div className="my-3 relative z-10">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search keys, values, or JSON paths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs font-mono rounded-full bg-white/90 border border-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-[inset_0_1.5px_2px_#ffffff] font-medium"
              />
            </div>
          )}

          {/* Path Copy Toast Banner */}
          {copiedPath && (
            <div className="mb-2 p-2 rounded-xl bg-indigo-500/15 border border-indigo-300 text-indigo-900 text-xs font-mono flex items-center justify-between relative z-10">
              <span className="truncate">Copied path: <strong>{copiedPath}</strong></span>
              <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
            </div>
          )}

          {/* Main Viewport Content Area */}
          <div className="flex-1 overflow-auto p-4 rounded-2xl bg-white/90 border border-white/80 font-mono text-xs text-slate-900 shadow-inner relative z-10">
            {viewMode === "tree" && (
              <div className="space-y-1.5">
                {parsedData && typeof parsedData === "object" ? (
                  Object.keys(parsedData).map((key) => (
                    <JsonTreeNode
                      key={key}
                      keyName={key}
                      value={parsedData[key]}
                      path={`$.${key}`}
                      defaultExpanded={expandAll}
                      searchQuery={searchQuery}
                      onCopyPath={handleCopyPath}
                    />
                  ))
                ) : (
                  <div className="text-slate-400 text-center py-10">
                    Invalid or empty JSON payload
                  </div>
                )}
              </div>
            )}

            {viewMode === "table" && (
              <JsonTableView data={parsedData} searchQuery={searchQuery} />
            )}

            {viewMode === "hierarchy" && (
              <JsonHierarchyView data={parsedData} searchQuery={searchQuery} onCopyPath={handleCopyPath} />
            )}

            {viewMode === "diagram" && (
              <JsonDiagramView data={parsedData} searchQuery={searchQuery} onCopyPath={handleCopyPath} />
            )}

            {viewMode === "graph" && (
              <JsonGraphView data={parsedData} jsonText={jsonText} />
            )}
          </div>
        </div>
      </div>
    </SlideUp>
  );
};


// 1. Tree Node Component
interface JsonTreeNodeProps {
  keyName: string;
  value: any;
  path: string;
  defaultExpanded?: boolean;
  searchQuery?: string;
  depth?: number;
  onCopyPath: (path: string) => void;
}

const JsonTreeNode: React.FC<JsonTreeNodeProps> = ({
  keyName,
  value,
  path,
  defaultExpanded = true,
  searchQuery = "",
  depth = 0,
  onCopyPath,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultExpanded);

  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  const matchesSearch = (k: string, v: any, p: string): boolean => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    if (k.toLowerCase().includes(query)) return true;
    if (p.toLowerCase().includes(query)) return true;
    if (!isObject && String(v).toLowerCase().includes(query)) return true;
    return false;
  };

  if (!matchesSearch(keyName, value, path) && !isObject) {
    return null;
  }

  if (!isObject) {
    let valueColor = "text-emerald-700 font-semibold";
    if (typeof value === "number") valueColor = "text-amber-700 font-bold";
    if (typeof value === "boolean") valueColor = "text-purple-700 font-bold";
    if (value === null) valueColor = "text-rose-600 font-bold";

    return (
      <div
        className="group flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-100/80 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 6}px` }}
      >
        <div className="flex items-center gap-2 truncate">
          <span className="text-indigo-700 font-bold">{keyName}:</span>
          <span className={valueColor}>{JSON.stringify(value)}</span>
        </div>

        <button
          onClick={() => onCopyPath(path)}
          className="opacity-0 group-hover:opacity-100 text-[10px] text-slate-500 hover:text-slate-900 px-2 py-0.5 rounded-full bg-white border border-slate-200 transition-opacity shadow-sm"
          title={`Copy path: ${path}`}
        >
          Copy Path
        </button>
      </div>
    );
  }

  const keys = Object.keys(value);
  const itemCount = keys.length;

  return (
    <div className="select-none">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between py-1 px-2 rounded-lg hover:bg-slate-100/80 cursor-pointer text-slate-900 transition-colors"
        style={{ paddingLeft: `${depth * 16 + 6}px` }}
      >
        <div className="flex items-center gap-1.5">
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          )}
          <span className="text-indigo-700 font-extrabold">{keyName}:</span>
          <span className="text-slate-500 font-mono text-[11px]">
            {isArray ? `Array[${itemCount}]` : `Object{${itemCount}}`}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onCopyPath(path);
          }}
          className="text-[10px] text-slate-500 hover:text-slate-900 px-2 py-0.5 rounded-full bg-white border border-slate-200 shadow-sm"
          title={`Copy path: ${path}`}
        >
          Path
        </button>
      </div>

      {isOpen && (
        <div className="overflow-hidden">
          {keys.map((k) => {
            const childPath = isArray ? `${path}[${k}]` : `${path}.${k}`;
            return (
              <JsonTreeNode
                key={k}
                keyName={k}
                value={value[k]}
                path={childPath}
                defaultExpanded={defaultExpanded}
                searchQuery={searchQuery}
                depth={depth + 1}
                onCopyPath={onCopyPath}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};


// 2. Tabular Data View Component
const JsonTableView: React.FC<{ data: any; searchQuery: string }> = ({ data, searchQuery }) => {
  const tableData = useMemo<{ headers: string[]; rows: any[]; title?: string }>(() => {
    if (!data) return { headers: [], rows: [] };

    // Case A: Root is array of objects
    if (Array.isArray(data) && data.length > 0 && typeof data[0] === "object") {
      const headers = Array.from(
        new Set(data.flatMap((item: any) => (item && typeof item === "object" ? Object.keys(item) : [])))
      ) as string[];
      return { headers, rows: data };
    }

    // Case B: Root object contains an array property (e.g. users, items)
    if (typeof data === "object" && !Array.isArray(data)) {
      const arrayKey = Object.keys(data).find((k) => Array.isArray(data[k]) && data[k].length > 0);
      if (arrayKey && typeof data[arrayKey][0] === "object") {
        const arr = data[arrayKey];
        const headers = Array.from(
          new Set(arr.flatMap((item: any) => (item && typeof item === "object" ? Object.keys(item) : [])))
        ) as string[];
        return { headers, rows: arr, title: `Property: ${arrayKey}` };
      }
    }

    // Case C: Fallback to Key-Value dictionary rows
    if (typeof data === "object" && data !== null) {
      const entries = Object.keys(data).map((k) => ({
        Key: k,
        Value: typeof data[k] === "object" ? JSON.stringify(data[k]) : String(data[k]),
        Type: Array.isArray(data[k]) ? "Array" : data[k] === null ? "Null" : typeof data[k],
      }));
      return { headers: ["Key", "Value", "Type"], rows: entries };
    }

    return { headers: [], rows: [] };
  }, [data]);

  const filteredRows = useMemo(() => {
    if (!searchQuery) return tableData.rows;
    const query = searchQuery.toLowerCase();
    return tableData.rows.filter((row: any) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(query))
    );
  }, [tableData.rows, searchQuery]);

  if (!data || tableData.headers.length === 0) {
    return (
      <div className="text-slate-400 text-center py-12">
        No tabular structure detected in JSON payload.
      </div>
    );
  }

  return (
    <div className="space-y-3 font-sans">
      {tableData.title && (
        <div className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50/80 px-3 py-1.5 rounded-lg inline-block">
          {tableData.title} ({filteredRows.length} Rows)
        </div>
      )}

      <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white shadow-sm">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 border-b border-slate-200 font-mono text-slate-700">
            <tr>
              <th className="p-2.5 font-bold w-12 text-center border-r border-slate-200">#</th>
              {tableData.headers.map((h: string) => (
                <th key={h} className="p-2.5 font-bold border-r border-slate-200 last:border-r-0">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {filteredRows.map((row: any, idx: number) => (
              <tr key={idx} className="hover:bg-indigo-50/40 transition-colors">
                <td className="p-2.5 text-slate-400 text-center border-r border-slate-200 font-bold">
                  {idx + 1}
                </td>
                {tableData.headers.map((h: string) => {
                  const val = row[h];
                  const displayVal = typeof val === "object" ? JSON.stringify(val) : String(val ?? "null");
                  const isBool = typeof val === "boolean";
                  const isNum = typeof val === "number";

                  return (
                    <td key={h} className="p-2.5 border-r border-slate-200 last:border-r-0 max-w-[200px] truncate">
                      {isBool ? (
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${val ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                          {String(val)}
                        </span>
                      ) : isNum ? (
                        <span className="text-amber-700 font-bold">{displayVal}</span>
                      ) : (
                        <span className="text-slate-800">{displayVal}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


// 3. Parent-Child Hierarchy View Component
const JsonHierarchyView: React.FC<{ data: any; searchQuery: string; onCopyPath: (p: string) => void }> = ({
  data,
  searchQuery,
  onCopyPath,
}) => {
  const nodes = useMemo(() => {
    if (!data || typeof data !== "object") return [];

    const result: Array<{ id: string; key: string; path: string; depth: number; type: string; childCount: number; valuePreview: string }> = [];

    const traverse = (obj: any, path: string, depth: number) => {
      if (obj === null || typeof obj !== "object") return;
      Object.keys(obj).forEach((key) => {
        const val = obj[key];
        const isArr = Array.isArray(val);
        const isObj = val !== null && typeof val === "object";
        const childPath = isArr ? `${path}[${key}]` : `${path}.${key}`;
        const typeStr = isArr ? "Array" : isObj ? "Object" : typeof val;
        const childCount = isObj ? Object.keys(val).length : 0;
        const valuePreview = isObj ? (isArr ? `[${childCount} items]` : `{${childCount} keys}`) : String(val);

        result.push({
          id: childPath,
          key,
          path: childPath,
          depth,
          type: typeStr,
          childCount,
          valuePreview,
        });

        if (isObj) {
          traverse(val, childPath, depth + 1);
        }
      });
    };

    traverse(data, "$", 0);
    return result;
  }, [data]);

  const filteredNodes = useMemo(() => {
    if (!searchQuery) return nodes;
    const q = searchQuery.toLowerCase();
    return nodes.filter((n) => n.key.toLowerCase().includes(q) || n.path.toLowerCase().includes(q) || n.valuePreview.toLowerCase().includes(q));
  }, [nodes, searchQuery]);

  if (!data || nodes.length === 0) {
    return <div className="text-slate-400 text-center py-12">No hierarchy nodes to display.</div>;
  }

  return (
    <div className="space-y-2 font-mono text-xs">
      <div className="text-xs font-mono font-bold text-slate-500 pb-2 border-b border-slate-200">
        Root Node Breakdown ({filteredNodes.length} Hierarchy Nodes)
      </div>

      {filteredNodes.map((n) => (
        <div
          key={n.id}
          className="p-2.5 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 hover:shadow-sm transition-all flex items-center justify-between gap-3"
          style={{ marginLeft: `${n.depth * 18}px` }}
        >
          <div className="flex items-center gap-2 truncate">
            <span className="text-slate-400 font-bold">
              {n.depth === 0 ? "ROOT ❯" : `DEPTH ${n.depth} └─`}
            </span>
            <span className="font-extrabold text-indigo-700">{n.key}</span>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
              {n.type}
            </span>
            <span className="text-slate-500 truncate max-w-[220px]">{n.valuePreview}</span>
          </div>

          <button
            onClick={() => onCopyPath(n.path)}
            className="text-[10px] text-slate-500 hover:text-slate-900 px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 shrink-0"
          >
            Copy Path
          </button>
        </div>
      ))}
    </div>
  );
};


// 4. Interactive Flow Chart Diagram Component (Org Chart Layout)
const JsonDiagramView: React.FC<{ data: any; searchQuery: string; onCopyPath: (p: string) => void }> = ({
  data,
  searchQuery,
  onCopyPath,
}) => {
  if (!data || typeof data !== "object") {
    return <div className="text-slate-400 text-center py-12">No object data for flow chart diagram.</div>;
  }

  return (
    <div className="space-y-6 overflow-x-auto p-4 font-sans min-w-[700px]">
      <div className="text-xs font-mono font-bold text-slate-500 pb-3 border-b border-slate-200 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-indigo-600" />
          Interactive Flow Chart Diagram (Org Chart Node Tree)
        </span>
        <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-extrabold">
          Parent ➔ Child Architecture
        </span>
      </div>

      <div className="flex flex-col items-center space-y-8 py-4">
        <DiagramNodeCard
          keyName="Root (JSON Object)"
          value={data}
          path="$"
          depth={0}
          searchQuery={searchQuery}
          onCopyPath={onCopyPath}
        />
      </div>
    </div>
  );
};

// Diagram Card Box Component
const DiagramNodeCard: React.FC<{
  keyName: string;
  value: any;
  path: string;
  depth: number;
  searchQuery: string;
  onCopyPath: (p: string) => void;
}> = ({ keyName, value, path, depth, searchQuery, onCopyPath }) => {
  const isObject = value !== null && typeof value === "object";
  const isArray = Array.isArray(value);

  // Extract scalar fields vs child object/array branches
  const { scalarFields, childBranches } = useMemo(() => {
    if (!isObject) return { scalarFields: [], childBranches: [] };

    const scalars: Array<{ key: string; val: any }> = [];
    const children: Array<{ key: string; val: any }> = [];

    Object.keys(value).forEach((k) => {
      const v = value[k];
      if (v !== null && typeof v === "object") {
        children.push({ key: k, val: v });
      } else {
        scalars.push({ key: k, val: v });
      }
    });

    return { scalarFields: scalars, childBranches: children };
  }, [value, isObject]);

  if (!isObject) return null;

  return (
    <div className="flex flex-col items-center">
      {/* Node Box */}
      <div className="w-[320px] rounded-2xl border-2 border-indigo-200 bg-white shadow-md hover:shadow-lg hover:border-indigo-400 transition-all overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-cyan-700 px-4 py-2.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <Boxes className="w-4 h-4 shrink-0 text-cyan-200" />
            <span className="font-extrabold text-xs tracking-tight truncate">{keyName}</span>
          </div>
          <button
            onClick={() => onCopyPath(path)}
            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 shrink-0 transition-colors"
          >
            Copy
          </button>
        </div>

        {/* Content Properties Table inside Card */}
        <div className="p-3.5 space-y-1.5 font-mono text-[11px] bg-slate-50/50 flex-1">
          <div className="text-[10px] font-bold text-slate-400 font-mono pb-1 border-b border-slate-200 flex items-center justify-between">
            <span>TYPE: {isArray ? `Array [${value.length}]` : `Object {${Object.keys(value).length}}`}</span>
            <span>PATH: {path}</span>
          </div>

          {scalarFields.length > 0 ? (
            <div className="space-y-1 pt-1 max-h-[160px] overflow-y-auto pr-1">
              {scalarFields.map(({ key, val }) => (
                <div key={key} className="flex items-center justify-between py-1 px-2 rounded bg-white border border-slate-100">
                  <span className="font-bold text-indigo-700 truncate mr-2">{key}:</span>
                  <span className={`truncate font-semibold ${typeof val === "number" ? "text-amber-700" : typeof val === "boolean" ? "text-purple-700" : "text-slate-800"}`}>
                    {JSON.stringify(val)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 text-center py-2 italic">
              {childBranches.length > 0 ? `${childBranches.length} Child Branch Node(s)` : "Empty Node"}
            </div>
          )}
        </div>
      </div>

      {/* Connected Child Branches */}
      {childBranches.length > 0 && depth < 3 && (
        <div className="flex flex-col items-center w-full pt-2">
          {/* Vertical Stem Line Down */}
          <div className="w-0.5 h-6 bg-indigo-400" />

          {/* Horizontal Connector Bar across Children */}
          {childBranches.length > 1 && (
            <div className="h-0.5 bg-indigo-300 w-[80%]" />
          )}

          {/* Children Cards Row */}
          <div className="flex flex-wrap items-start justify-center gap-6 pt-3">
            {childBranches.map(({ key, val }) => {
              const childPath = isArray ? `${path}[${key}]` : `${path}.${key}`;
              return (
                <DiagramNodeCard
                  key={key}
                  keyName={key}
                  value={val}
                  path={childPath}
                  depth={depth + 1}
                  searchQuery={searchQuery}
                  onCopyPath={onCopyPath}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};


// 5. Graphical Analytics View Component
const JsonGraphView: React.FC<{ data: any; jsonText: string }> = ({ data, jsonText }) => {
  const stats = useMemo<{
    totalKeys: number;
    maxDepth: number;
    typesCount: Record<string, number>;
    totalValues: number;
    arrayMetrics: Array<{ name: string; length: number }>;
  }>(() => {
    if (!data || typeof data !== "object") {
      return {
        totalKeys: 0,
        maxDepth: 0,
        typesCount: { String: 0, Number: 0, Boolean: 0, Object: 0, Array: 0, Null: 0 },
        totalValues: 0,
        arrayMetrics: [],
      };
    }

    let totalKeys = 0;
    let maxDepth = 0;
    const typesCount: Record<string, number> = { String: 0, Number: 0, Boolean: 0, Object: 0, Array: 0, Null: 0 };
    const arrayMetrics: Array<{ name: string; length: number }> = [];

    const analyze = (obj: any, depth: number) => {
      if (depth > maxDepth) maxDepth = depth;
      if (obj === null || typeof obj !== "object") return;

      Object.keys(obj).forEach((key) => {
        totalKeys++;
        const val = obj[key];
        if (val === null) {
          typesCount.Null++;
        } else if (Array.isArray(val)) {
          typesCount.Array++;
          arrayMetrics.push({ name: key, length: val.length });
          analyze(val, depth + 1);
        } else if (typeof val === "object") {
          typesCount.Object++;
          analyze(val, depth + 1);
        } else if (typeof val === "number") {
          typesCount.Number++;
        } else if (typeof val === "boolean") {
          typesCount.Boolean++;
        } else {
          typesCount.String++;
        }
      });
    };

    analyze(data, 1);
    const totalValues = Object.values(typesCount).reduce((a, b) => a + b, 0);

    return { totalKeys, maxDepth, typesCount, totalValues, arrayMetrics };
  }, [data]);

  const byteSize = new Blob([jsonText]).size;
  const kbSize = (byteSize / 1024).toFixed(2);

  if (!data) {
    return <div className="text-slate-400 text-center py-12">No data available for graphical analytics.</div>;
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-1">
          <span className="text-[11px] font-mono font-bold text-indigo-700 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" /> Total Keys
          </span>
          <p className="text-2xl font-extrabold text-slate-950">{stats.totalKeys}</p>
        </div>

        <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 space-y-1">
          <span className="text-[11px] font-mono font-bold text-cyan-700 flex items-center gap-1.5">
            <Network className="w-3.5 h-3.5" /> Max Depth
          </span>
          <p className="text-2xl font-extrabold text-slate-950">{stats.maxDepth} Levels</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
          <span className="text-[11px] font-mono font-bold text-emerald-700 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Payload Size
          </span>
          <p className="text-2xl font-extrabold text-slate-950">{kbSize} KB</p>
        </div>

        <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200/80 space-y-1">
          <span className="text-[11px] font-mono font-bold text-violet-700 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> Total Values
          </span>
          <p className="text-2xl font-extrabold text-slate-950">{stats.totalValues}</p>
        </div>
      </div>

      {/* Data Type Breakdown Charts */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
        <h3 className="text-xs font-mono font-bold text-slate-900 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-indigo-600" />
          Data Type Composition Breakdown
        </h3>

        <div className="space-y-3">
          {Object.entries(stats.typesCount).map(([type, count]) => {
            if (count === 0) return null;
            const pct = stats.totalValues > 0 ? ((count / stats.totalValues) * 100).toFixed(1) : "0";

            let barColor = "bg-indigo-600";
            if (type === "Number") barColor = "bg-amber-500";
            if (type === "Boolean") barColor = "bg-purple-600";
            if (type === "String") barColor = "bg-emerald-600";
            if (type === "Array") barColor = "bg-cyan-600";
            if (type === "Null") barColor = "bg-rose-500";

            return (
              <div key={type} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-700">{type} ({count})</span>
                  <span className="font-extrabold text-slate-950">{pct}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Array Metrics Bars */}
      {stats.arrayMetrics.length > 0 && (
        <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4">
          <h3 className="text-xs font-mono font-bold text-slate-900 flex items-center gap-2">
            <Grid className="w-4 h-4 text-cyan-600" />
            Top Array Properties Length Indicator
          </h3>

          <div className="space-y-2.5">
            {stats.arrayMetrics.slice(0, 5).map((arr, idx) => (
              <div key={idx} className="flex items-center justify-between gap-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="font-mono text-xs font-bold text-indigo-700">{arr.name}</span>
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-mono text-xs font-extrabold">
                  {arr.length} Items
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
