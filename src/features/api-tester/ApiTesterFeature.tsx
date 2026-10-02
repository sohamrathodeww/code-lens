"use client";

import React, { useState } from "react";
import { Play, Plus, Trash2, Code2, Network, Clock, Database, CheckCircle2, AlertCircle, Wand2, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import CodeEditor from "@/components/editor/CodeEditor";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";

interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  active: boolean;
}

interface ApiResponse {
  status: number;
  statusText: string;
  timeMs: number;
  sizeBytes: number;
  body: string;
  headers: Record<string, string>;
}

export function ApiTesterFeature() {
  const [method, setMethod] = useState<HttpMethod>("GET");
  const [methodDropdownOpen, setMethodDropdownOpen] = useState(false);
  const methodDropdownRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (methodDropdownRef.current && !methodDropdownRef.current.contains(event.target as Node)) {
        setMethodDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/posts/1");
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">("headers");
  
  const [headers, setHeaders] = useState<KeyValuePair[]>([
    { id: "1", key: "Accept", value: "application/json", active: true },
    { id: "2", key: "Content-Type", value: "application/json", active: true }
  ]);
  const [params, setParams] = useState<KeyValuePair[]>([]);
  const [body, setBody] = useState("{\n  \n}");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const addHeader = () => setHeaders([...headers, { id: Date.now().toString(), key: "", value: "", active: true }]);
  const updateHeader = (id: string, field: "key" | "value" | "active", val: any) => {
    setHeaders(headers.map(h => h.id === id ? { ...h, [field]: val } : h));
  };
  const removeHeader = (id: string) => setHeaders(headers.filter(h => h.id !== id));

  const addParam = () => setParams([...params, { id: Date.now().toString(), key: "", value: "", active: true }]);
  const updateParam = (id: string, field: "key" | "value" | "active", val: any) => {
    setParams(params.map(p => p.id === id ? { ...p, [field]: val } : p));
  };
  const removeParam = (id: string) => setParams(params.filter(p => p.id !== id));

  const sendRequest = async () => {
    if (!url) {
      setErrorMsg("Please enter a valid URL");
      return;
    }
    
    setLoading(true);
    setErrorMsg("");
    setResponse(null);

    const startTime = performance.now();
    
    try {
      // Build URL with query params
      const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
      params.filter(p => p.active && p.key).forEach(p => urlObj.searchParams.append(p.key, p.value));
      
      // Build Headers
      const reqHeaders: Record<string, string> = {};
      headers.filter(h => h.active && h.key).forEach(h => {
        reqHeaders[h.key] = h.value;
      });

      const options: RequestInit = {
        method,
        headers: reqHeaders,
      };

      if (method !== "GET" && method !== "HEAD" && body) {
        options.body = body;
      }

      const res = await fetch(urlObj.toString(), options);
      const endTime = performance.now();
      
      const resText = await res.text();

      const resHeaders: Record<string, string> = {};
      res.headers.forEach((value, key) => {
        resHeaders[key] = value;
      });

      setResponse({
        status: res.status,
        statusText: res.statusText,
        timeMs: Math.round(endTime - startTime),
        sizeBytes: new Blob([resText]).size,
        body: resText,
        headers: resHeaders
      });

    } catch (error: any) {
      setErrorMsg(error.message || "Failed to fetch. CORS policy might be blocking the request, or the network is offline.");
      setResponse({
        status: 0,
        statusText: "Error",
        timeMs: Math.round(performance.now() - startTime),
        sizeBytes: 0,
        body: error.stack || error.message || "Unknown error",
        headers: {}
      });
    } finally {
      setLoading(false);
    }
  };

  const formatResponse = () => {
    if (!response || !response.body) return;
    try {
      const parsed = JSON.parse(response.body);
      const isPretty = response.body.includes('\n');
      setResponse({
        ...response,
        body: isPretty ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2)
      });
    } catch (e) {
      // Ignore if not valid JSON
    }
  };

  const formatRequestBody = () => {
    try {
      const parsed = JSON.parse(body);
      const isPretty = body.includes('\n');
      setBody(isPretty ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2));
    } catch (e) {
      // Ignore if not valid JSON
    }
  };

  const downloadResponse = () => {
    if (!response || !response.body) return;
    try {
      // Basic check to determine extension
      const isJson = response.body.trim().startsWith("{") || response.body.trim().startsWith("[");
      const ext = isJson ? "json" : "txt";
      
      const blob = new Blob([response.body], { type: isJson ? "application/json;charset=utf-8" : "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `response.${ext}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      // Ignore
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30";
    if (status >= 400 && status < 500) return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/30";
    if (status >= 500) return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/30";
    return "text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-500/10 border-slate-200 dark:border-slate-500/30";
  };

  const methodColors: Record<string, string> = {
    GET: "text-blue-600 dark:text-blue-400",
    POST: "text-emerald-600 dark:text-emerald-400",
    PUT: "text-amber-600 dark:text-amber-400",
    DELETE: "text-red-600 dark:text-red-400",
    PATCH: "text-purple-600 dark:text-purple-400",
  };

  return (
    <FadeIn delay={0.1} className="flex flex-col gap-6 mt-8">
      {/* URL & Method Bar */}
      <SlideUp delay={0.15} className="liquid-glass-surface p-4 border border-white dark:border-slate-700/80 rounded-2xl flex flex-col md:flex-row gap-4 shadow-xl">
        <div className="flex bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700/80 p-1 flex-1 relative z-10">
          <div className="relative" ref={methodDropdownRef}>
            <button
              onClick={() => setMethodDropdownOpen(!methodDropdownOpen)}
              className={`flex items-center gap-2 px-4 h-full bg-transparent border-none outline-none font-bold text-sm cursor-pointer rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 ${methodColors[method]}`}
            >
              {method}
              <ChevronDown className="w-4 h-4 opacity-50" />
            </button>
            
            {methodDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-xl overflow-hidden z-50 py-1">
                {["GET", "POST", "PUT", "PATCH", "DELETE"].map(m => (
                  <button
                    key={m}
                    onClick={() => {
                      setMethod(m as HttpMethod);
                      setMethodDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50 ${methodColors[m]}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="w-[1px] bg-slate-200 dark:bg-slate-700 my-2 mx-1"></div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendRequest()}
            placeholder="https://api.example.com/v1/users"
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder:text-slate-400"
          />
        </div>
        <Button 
          onClick={sendRequest} 
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 shadow-lg shadow-indigo-500/20 md:w-auto w-full h-[52px]"
        >
          {loading ? (
            <div className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/> Sending...</div>
          ) : (
            <div className="flex items-center gap-2"><Play className="w-4 h-4" /> Send Request</div>
          )}
        </Button>
      </SlideUp>

      {errorMsg && (
        <SlideUp delay={0.2} className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p>{errorMsg}</p>
        </SlideUp>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request Configuration */}
        <SlideUp delay={0.25} className="liquid-glass-surface border border-white dark:border-slate-700/80 rounded-2xl flex flex-col overflow-hidden h-[600px]">
          <div className="flex border-b border-slate-200 dark:border-slate-700/50 bg-white/30 dark:bg-slate-900/30">
            <button
              onClick={() => setActiveTab("params")}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === "params" ? "text-indigo-600 dark:text-indigo-400 border-indigo-500 bg-white/50 dark:bg-slate-900/50" : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
            >
              Query Params
            </button>
            <button
              onClick={() => setActiveTab("headers")}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === "headers" ? "text-indigo-600 dark:text-indigo-400 border-indigo-500 bg-white/50 dark:bg-slate-900/50" : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
            >
              Headers
            </button>
            <button
              onClick={() => setActiveTab("body")}
              className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${activeTab === "body" ? "text-indigo-600 dark:text-indigo-400 border-indigo-500 bg-white/50 dark:bg-slate-900/50" : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
            >
              Body
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50 dark:bg-slate-900/20">
            {activeTab === "headers" && (
              <div className="space-y-3">
                {headers.map((header) => (
                  <div key={header.id} className="flex gap-2">
                    <input 
                      type="checkbox" 
                      checked={header.active}
                      onChange={(e) => updateHeader(header.id, "active", e.target.checked)}
                      className="mt-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <input 
                      type="text" 
                      placeholder="Header" 
                      value={header.key}
                      onChange={(e) => updateHeader(header.id, "key", e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-sm dark:text-slate-200"
                    />
                    <input 
                      type="text" 
                      placeholder="Value" 
                      value={header.value}
                      onChange={(e) => updateHeader(header.id, "value", e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-sm dark:text-slate-200"
                    />
                    <button onClick={() => removeHeader(header.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button onClick={addHeader} variant="secondary" className="w-full border-dashed border-slate-300 dark:border-slate-700 mt-2">
                  <Plus className="w-4 h-4 mr-2" /> Add Header
                </Button>
              </div>
            )}
            
            {activeTab === "params" && (
              <div className="space-y-3">
                {params.map((param) => (
                  <div key={param.id} className="flex gap-2">
                    <input 
                      type="checkbox" 
                      checked={param.active}
                      onChange={(e) => updateParam(param.id, "active", e.target.checked)}
                      className="mt-3 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <input 
                      type="text" 
                      placeholder="Key" 
                      value={param.key}
                      onChange={(e) => updateParam(param.id, "key", e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-sm dark:text-slate-200"
                    />
                    <input 
                      type="text" 
                      placeholder="Value" 
                      value={param.value}
                      onChange={(e) => updateParam(param.id, "value", e.target.value)}
                      className="flex-1 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg outline-none font-mono text-sm dark:text-slate-200"
                    />
                    <button onClick={() => removeParam(param.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button onClick={addParam} variant="secondary" className="w-full border-dashed border-slate-300 dark:border-slate-700 mt-2">
                  <Plus className="w-4 h-4 mr-2" /> Add Parameter
                </Button>
              </div>
            )}

            {activeTab === "body" && (
              <div className="h-full flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <div className="text-xs text-slate-500 font-medium">JSON Body</div>
                  <button onClick={formatRequestBody} className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    <Wand2 className="w-3 h-3" />
                    Format
                  </button>
                </div>
                <div className="flex-1 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700/50 relative">
                  <CodeEditor 
                    language="json"
                    value={body}
                    onChange={(val) => setBody(val || "")}
                  />
                </div>
              </div>
            )}
          </div>
        </SlideUp>

        {/* Response Viewer */}
        <SlideUp delay={0.35} className="liquid-glass-surface border border-white dark:border-slate-700/80 rounded-2xl flex flex-col overflow-hidden h-[600px]">
          {response ? (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700/50 bg-white/30 dark:bg-slate-900/30">
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${getStatusColor(response.status)}`}>
                    {response.status >= 200 && response.status < 300 ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                    {response.status} {response.statusText}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Clock className="w-3 h-3" /> {response.timeMs}ms
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <Database className="w-3 h-3" /> {(response.sizeBytes / 1024).toFixed(2)} KB
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={downloadResponse} className="flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                    <Download className="w-3 h-3" />
                    Download
                  </button>
                  <button onClick={formatResponse} className="flex items-center gap-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
                    <Wand2 className="w-3 h-3" />
                    Format JSON
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  language="json"
                  value={response.body}
                  readOnly={true}
                />
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8 text-center bg-slate-50/50 dark:bg-slate-900/20">
              <Network className="w-16 h-16 mb-4 opacity-20" />
              <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300 mb-2">No Response Yet</h3>
              <p className="text-sm max-w-sm">
                Enter a URL and click "Send Request" to see the API response. You can configure headers, query parameters, and the request body on the left.
              </p>
            </div>
          )}
        </SlideUp>
      </div>
    </FadeIn>
  );
}
