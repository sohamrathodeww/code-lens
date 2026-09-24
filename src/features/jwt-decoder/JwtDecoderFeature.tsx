"use client";

import React, { useState, useMemo } from "react";
import { Editor } from "@monaco-editor/react";
import {
  KeyRound,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  ShieldCheck,
  ShieldAlert,
  Clock,
  FileCode,
  Lock,
  Unlock,
  Eye,
  Calendar,
  AlertCircle,
  Sun,
  Moon,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ShimmerLoader } from "@/components/ui/ShimmerLoader";
import { SlideUp, FadeIn } from "@/components/motion/MotionPrimitives";

// Sample JWT Tokens for demonstration
const SAMPLE_JWT_ACTIVE = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggTW9yZ2FuIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhbGV4Lm1vcmdhbkBjb2RlbGVucy5kZXYiLCJpYXQiOjE3MjYzODA0MDAsImV4cCI6MjA0MTk0MDQwMH0.XbPjsTQIb-TY85vE82Tq723N6Q82M11pX09t-5qW6e8`;

const SAMPLE_JWT_EXPIRED = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzk5ODg3NyIsIm5hbWUiOiJTYW11ZWwgQ2xhcmsiLCJyb2xlIjoidXNlciIsImlhdCI6MTYwOTQ1OTIwMCwiZXhwIjoxNjA5NDYyODAwfQ.dytg2_9_5-L3kPz923N6Q82M11pX09t-5qW6e8`;

const SAMPLE_JWT_OAUTH = `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImNvZGVsZW5zLWF1dGgtMjAyNiJ9.ImF1ZCI6Imh0dHBzOi8vYXBpLmNvZGVsZW5zLmRldiIsImlzcyI6Imh0dHBzOi8vYXV0aC5jb2RlbGVucy5kZXYvIiwic3ViIjoiYXV0aDB8NjVjMTIzNDU2Nzg5MCIsImlhdCI6MTcyNjM4MDQwMCwiZXhwIjoyMDQxOTQwNDAwLCJzY29wZSI6InJlYWQ6Y29kZSB3cml0ZTpjb2RlIGFkbWluIn0.c2FtcGxlX3NpZ25hdHVyZV9kZW1v`;

/**
 * Base64URL decoder supporting UTF-8 string decoding
 */
function base64UrlDecode(str: string): string {
  try {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("Illegal base64url string!");
    }
    const decodedBinary = atob(output);
    return decodeURIComponent(
      Array.from(decodedBinary)
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    throw new Error("Invalid Base64URL encoding");
  }
}

interface ParsedJwt {
  rawHeader: string;
  rawPayload: string;
  signature: string;
  headerObj: Record<string, any> | null;
  payloadObj: Record<string, any> | null;
  headerFormatted: string;
  payloadFormatted: string;
  isValid: boolean;
  error?: string;
  timestamps: {
    exp?: { val: number; dateStr: string; status: "active" | "expired"; diffStr: string };
    iat?: { val: number; dateStr: string };
    nbf?: { val: number; dateStr: string; status: "valid" | "not_yet_active" };
  };
}

export const JwtDecoderFeature: React.FC = () => {
  const [jwtInput, setJwtInput] = useState<string>(SAMPLE_JWT_ACTIVE);
  const [secretKey, setSecretKey] = useState<string>("");
  const [editorTheme, setEditorTheme] = useState<"vs" | "vs-dark">("vs");

  const [copiedToken, setCopiedToken] = useState<boolean>(false);
  const [copiedHeader, setCopiedHeader] = useState<boolean>(false);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);

  // Parse JWT token dynamically
  const parsedJwt = useMemo<ParsedJwt>(() => {
    const trimmed = jwtInput.trim();
    if (!trimmed) {
      return {
        rawHeader: "",
        rawPayload: "",
        signature: "",
        headerObj: null,
        payloadObj: null,
        headerFormatted: "",
        payloadFormatted: "",
        isValid: false,
        error: "Please paste a JWT token to decode.",
        timestamps: {},
      };
    }

    const parts = trimmed.split(".");
    if (parts.length !== 3) {
      return {
        rawHeader: parts[0] || "",
        rawPayload: parts[1] || "",
        signature: parts[2] || "",
        headerObj: null,
        payloadObj: null,
        headerFormatted: "",
        payloadFormatted: "",
        isValid: false,
        error: "Invalid JWT format. A valid JWT token must contain 3 dot-separated parts (Header.Payload.Signature).",
        timestamps: {},
      };
    }

    const [rawHeader, rawPayload, signature] = parts;

    try {
      const decodedHeaderStr = base64UrlDecode(rawHeader);
      const decodedPayloadStr = base64UrlDecode(rawPayload);

      const headerObj = JSON.parse(decodedHeaderStr);
      const payloadObj = JSON.parse(decodedPayloadStr);

      const headerFormatted = JSON.stringify(headerObj, null, 2);
      const payloadFormatted = JSON.stringify(payloadObj, null, 2);

      // Parse claim timestamps (exp, iat, nbf)
      const timestamps: ParsedJwt["timestamps"] = {};
      const nowSec = Math.floor(Date.now() / 1000);

      if (typeof payloadObj.exp === "number") {
        const expVal = payloadObj.exp;
        const expDate = new Date(expVal * 1000);
        const isExpired = nowSec > expVal;

        const diffSec = Math.abs(expVal - nowSec);
        const days = Math.floor(diffSec / 86400);
        const hours = Math.floor((diffSec % 86400) / 3600);
        const mins = Math.floor((diffSec % 3600) / 60);

        let diffStr = "";
        if (days > 0) diffStr += `${days}d `;
        if (hours > 0) diffStr += `${hours}h `;
        diffStr += `${mins}m`;

        timestamps.exp = {
          val: expVal,
          dateStr: expDate.toLocaleString(),
          status: isExpired ? "expired" : "active",
          diffStr: isExpired ? `Expired ${diffStr} ago` : `Expires in ${diffStr}`,
        };
      }

      if (typeof payloadObj.iat === "number") {
        const iatVal = payloadObj.iat;
        const iatDate = new Date(iatVal * 1000);
        timestamps.iat = {
          val: iatVal,
          dateStr: iatDate.toLocaleString(),
        };
      }

      if (typeof payloadObj.nbf === "number") {
        const nbfVal = payloadObj.nbf;
        const nbfDate = new Date(nbfVal * 1000);
        const isNotYetActive = nowSec < nbfVal;
        timestamps.nbf = {
          val: nbfVal,
          dateStr: nbfDate.toLocaleString(),
          status: isNotYetActive ? "not_yet_active" : "valid",
        };
      }

      return {
        rawHeader,
        rawPayload,
        signature,
        headerObj,
        payloadObj,
        headerFormatted,
        payloadFormatted,
        isValid: true,
        timestamps,
      };
    } catch (err: any) {
      return {
        rawHeader,
        rawPayload,
        signature,
        headerObj: null,
        payloadObj: null,
        headerFormatted: "",
        payloadFormatted: "",
        isValid: false,
        error: err?.message || "Failed to decode JWT payload JSON.",
        timestamps: {},
      };
    }
  }, [jwtInput]);

  const handleCopyToken = () => {
    if (!jwtInput) return;
    navigator.clipboard.writeText(jwtInput);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleCopyHeader = () => {
    if (!parsedJwt.headerFormatted) return;
    navigator.clipboard.writeText(parsedJwt.headerFormatted);
    setCopiedHeader(true);
    setTimeout(() => setCopiedHeader(false), 2000);
  };

  const handleCopyPayload = () => {
    if (!parsedJwt.payloadFormatted) return;
    navigator.clipboard.writeText(parsedJwt.payloadFormatted);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleReset = () => {
    setJwtInput("");
    setSecretKey("");
  };

  return (
    <SlideUp className="space-y-6 font-sans">
      {/* Top Header & Toolbar */}
      <div className="liquid-glass-surface p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <span className="lens-sheen" />

        {/* Title & Status Badges */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/10 border border-indigo-200/80 text-indigo-600 shadow-[inset_0_1.5px_2px_#ffffff]">
            <KeyRound className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 flex items-center gap-2">
              Online JWT Decoder
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-600 mt-1.5">
              {parsedJwt.isValid ? (
                <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <ShieldCheck className="w-3.5 h-3.5" /> Valid Token Format
                </span>
              ) : (
                <span className="flex items-center gap-1 text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60">
                  <ShieldAlert className="w-3.5 h-3.5" /> Invalid JWT Structure
                </span>
              )}

              {parsedJwt.timestamps.exp && (
                <span
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full border font-bold ${
                    parsedJwt.timestamps.exp.status === "active"
                      ? "text-emerald-700 bg-emerald-50 border-emerald-200/60"
                      : "text-rose-700 bg-rose-50 border-rose-200/60"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" /> {parsedJwt.timestamps.exp.diffStr}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditorTheme(editorTheme === "vs" ? "vs-dark" : "vs")}
            icon={editorTheme === "vs" ? <Moon className="w-4 h-4 text-slate-700" /> : <Sun className="w-4 h-4 text-amber-500" />}
            title="Toggle Dark/Light Theme"
          >
            {editorTheme === "vs" ? "Dark" : "Light"}
          </Button>

          {/* Sample Preset Selector */}
          <div className="flex items-center gap-1 bg-white/90 border border-slate-200/80 rounded-full p-1 shadow-[inset_0_1.5px_2px_#ffffff]">
            <button
              onClick={() => setJwtInput(SAMPLE_JWT_ACTIVE)}
              className={`px-3 py-1 rounded-full text-xs font-sans font-bold transition-all ${
                jwtInput === SAMPLE_JWT_ACTIVE
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              Active Sample
            </button>
            <button
              onClick={() => setJwtInput(SAMPLE_JWT_EXPIRED)}
              className={`px-3 py-1 rounded-full text-xs font-sans font-bold transition-all ${
                jwtInput === SAMPLE_JWT_EXPIRED
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              Expired Sample
            </button>
            <button
              onClick={() => setJwtInput(SAMPLE_JWT_OAUTH)}
              className={`px-3 py-1 rounded-full text-xs font-sans font-bold transition-all ${
                jwtInput === SAMPLE_JWT_OAUTH
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
              }`}
            >
              OAuth2 Sample
            </button>
          </div>

          {/* Reset Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            icon={<RotateCcw className="w-4 h-4 text-rose-600" />}
            title="Reset Token Input"
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Main 2-Column Liquid Glass Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column (5 Cols): Raw Encoded JWT Input & Breakdown */}
        <div className="lg:col-span-5 liquid-glass-surface p-6 sm:p-7 flex flex-col h-[780px] relative">
          <span className="lens-sheen" />
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-900/10 relative z-10">
            <div className="flex items-center gap-2 overflow-hidden">
              <KeyRound className="w-4.5 h-4.5 text-indigo-600 shrink-0" />
              <span className="text-xs sm:text-sm font-mono font-extrabold text-slate-900 truncate">
                Encoded JWT Token Input
              </span>
            </div>
            <button
              onClick={handleCopyToken}
              disabled={!jwtInput}
              title="Copy Raw Token"
              className="p-1.5 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-xl transition-colors border border-slate-200/80 bg-white/80 shadow-2xs disabled:opacity-40"
            >
              {copiedToken ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Color-Coded Token Display Header breakdown */}
          <div className="mt-3.5 p-3 rounded-2xl bg-slate-100/90 border border-slate-200/80 relative z-10 flex items-center justify-around text-xs font-mono font-bold">
            <div className="flex items-center gap-1.5 text-indigo-700">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
              <span>Header</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span>Payload</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1.5 text-rose-700">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>Signature</span>
            </div>
          </div>

          {/* Raw Input Editor Area */}
          <div className="flex-1 mt-3.5 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10 flex flex-col">
            <textarea
              value={jwtInput}
              onChange={(e) => setJwtInput(e.target.value)}
              placeholder="Paste your JSON Web Token (JWT) here..."
              className="w-full h-full p-4 font-mono text-xs sm:text-sm text-slate-900 bg-transparent resize-none focus:outline-none leading-relaxed tracking-tight"
            />
          </div>
        </div>

        {/* Right Column (7 Cols): Decoded Header, Payload & Timestamp Claims */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {parsedJwt.isValid ? (
            <>
              {/* Claims & Timestamps Card */}
              {Object.keys(parsedJwt.timestamps).length > 0 && (
                <FadeIn className="liquid-glass-surface p-5 sm:p-6 relative">
                  <span className="lens-sheen" />
                  <h3 className="text-xs font-mono font-extrabold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5 relative z-10">
                    <Calendar className="w-4 h-4 text-indigo-600" /> Claim Timestamps & Expiration
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
                    {parsedJwt.timestamps.exp && (
                      <div
                        className={`p-3.5 rounded-2xl border flex items-start justify-between gap-3 ${
                          parsedJwt.timestamps.exp.status === "active"
                            ? "bg-emerald-50/80 border-emerald-200/80 text-emerald-950"
                            : "bg-rose-50/80 border-rose-200/80 text-rose-950"
                        }`}
                      >
                        <div>
                          <div className="text-[11px] font-mono font-extrabold uppercase opacity-70">
                            Expiration (exp)
                          </div>
                          <div className="text-xs font-mono font-bold mt-1">
                            {parsedJwt.timestamps.exp.dateStr}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full shrink-0 border ${
                            parsedJwt.timestamps.exp.status === "active"
                              ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                              : "bg-rose-100 border-rose-300 text-rose-800"
                          }`}
                        >
                          {parsedJwt.timestamps.exp.diffStr}
                        </span>
                      </div>
                    )}

                    {parsedJwt.timestamps.iat && (
                      <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-950 flex items-start justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-mono font-extrabold uppercase opacity-70">
                            Issued At (iat)
                          </div>
                          <div className="text-xs font-mono font-bold mt-1">
                            {parsedJwt.timestamps.iat.dateStr}
                          </div>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full border border-indigo-200">
                          Unix: {parsedJwt.timestamps.iat.val}
                        </span>
                      </div>
                    )}
                  </div>
                </FadeIn>
              )}

              {/* Decoded Header & Payload Viewers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {/* Decoded Header */}
                <div className="liquid-glass-surface p-5 flex flex-col h-[520px] relative">
                  <span className="lens-sheen" />
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900/10 relative z-10">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                      <span className="text-xs font-mono font-extrabold text-slate-900 truncate">
                        Header (Algorithm & Type)
                      </span>
                    </div>
                    <button
                      onClick={handleCopyHeader}
                      title="Copy Header JSON"
                      className="p-1 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-slate-200/80 bg-white/80"
                    >
                      {copiedHeader ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex-1 mt-3 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10">
                    <Editor
                      height="100%"
                      language="json"
                      value={parsedJwt.headerFormatted}
                      theme={editorTheme}
                      loading={<ShimmerLoader variant="editor" />}
                      options={{
                        readOnly: true,
                        fontSize: 13,
                        fontFamily: "var(--font-jetbrains-mono)",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                        scrollbar: { alwaysConsumeMouseWheel: false },
                      }}
                    />
                  </div>
                </div>

                {/* Decoded Payload */}
                <div className="liquid-glass-surface p-5 flex flex-col h-[520px] relative">
                  <span className="lens-sheen" />
                  <div className="flex items-center justify-between pb-3 border-b border-slate-900/10 relative z-10">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
                      <span className="text-xs font-mono font-extrabold text-slate-900 truncate">
                        Payload (Claims & Data)
                      </span>
                    </div>
                    <button
                      onClick={handleCopyPayload}
                      title="Copy Payload JSON"
                      className="p-1 text-slate-600 hover:text-indigo-600 hover:bg-white rounded-lg transition-colors border border-slate-200/80 bg-white/80"
                    >
                      {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="flex-1 mt-3 rounded-2xl overflow-hidden border border-slate-200/90 shadow-inner bg-white relative z-10">
                    <Editor
                      height="100%"
                      language="json"
                      value={parsedJwt.payloadFormatted}
                      theme={editorTheme}
                      loading={<ShimmerLoader variant="editor" />}
                      options={{
                        readOnly: true,
                        fontSize: 13,
                        fontFamily: "var(--font-jetbrains-mono)",
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 12 },
                        scrollbar: { alwaysConsumeMouseWheel: false },
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="liquid-glass-surface p-8 sm:p-12 flex flex-col items-center justify-center text-center h-[780px] relative space-y-4">
              <span className="lens-sheen" />
              <div className="p-4 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200/80 shadow-inner">
                <AlertCircle className="w-10 h-10" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-sans">
                Unable to Decode Token
              </h3>
              <p className="text-xs font-mono text-slate-500 max-w-sm">
                {parsedJwt.error}
              </p>
            </div>
          )}
        </div>
      </div>
    </SlideUp>
  );
};
