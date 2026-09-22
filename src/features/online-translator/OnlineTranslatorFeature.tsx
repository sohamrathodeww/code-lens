"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeftRight,
  Copy,
  Check,
  Trash2,
  Volume2,
  Sparkles,
  AlertTriangle,
  Languages,
  Loader2,
  Search,
  ChevronDown,
  Info,
  Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SUPPORTED_LANGUAGES, POPULAR_LANGUAGES } from "./language-data";

const MAX_CHAR_LIMIT = 5000;

const SAMPLE_TEXTS = [
  {
    label: "Developer API Notice",
    text: "CodeLens provides browser-based developer utilities designed for privacy, speed, and efficiency. All processing runs locally with high-performance backup failover.",
  },
  {
    label: "Tech Specs",
    text: "Microservices architecture allows software engineering teams to deploy, scale, and maintain independent modules with continuous integration pipelines.",
  },
  {
    label: "Greeting & Info",
    text: "Welcome to CodeLens Online Translator! Translate text effortlessly between 100+ languages with client privacy and automatic server fallback.",
  },
];

export const OnlineTranslatorFeature: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<string>("auto");
  const [targetLang, setTargetLang] = useState<string>("es");
  const [inputText, setInputText] = useState<string>("");
  const [translatedText, setTranslatedText] = useState<string>("");
  const [detectedLang, setDetectedLang] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [usedBackupEngine, setUsedBackupEngine] = useState<boolean>(false);

  // Dropdown UI states
  const [isSourceDropdownOpen, setIsSourceDropdownOpen] = useState<boolean>(false);
  const [isTargetDropdownOpen, setIsTargetDropdownOpen] = useState<boolean>(false);
  const [sourceSearch, setSourceSearch] = useState<string>("");
  const [targetSearch, setTargetSearch] = useState<string>("");

  const sourceDropdownRef = useRef<HTMLDivElement>(null);
  const targetDropdownRef = useRef<HTMLDivElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sourceDropdownRef.current && !sourceDropdownRef.current.contains(e.target as Node)) {
        setIsSourceDropdownOpen(false);
      }
      if (targetDropdownRef.current && !targetDropdownRef.current.contains(e.target as Node)) {
        setIsTargetDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced translation trigger (1000ms delay to prevent API spam while typing)
  useEffect(() => {
    if (!inputText.trim()) {
      setTranslatedText("");
      setDetectedLang("");
      setErrorMsg(null);
      return;
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      handleTranslate();
    }, 1000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [inputText, sourceLang, targetLang]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > MAX_CHAR_LIMIT) {
      setInputText(value.slice(0, MAX_CHAR_LIMIT));
    } else {
      setInputText(value);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) return;

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText.slice(0, MAX_CHAR_LIMIT),
          source: sourceLang,
          target: targetLang,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTranslatedText(data.translatedText);
        if (data.detectedSourceLanguage) {
          setDetectedLang(data.detectedSourceLanguage);
        }
        setUsedBackupEngine(data.providerUsed > 0);
      } else {
        setErrorMsg(data.error || "Translation failed. Please try again.");
      }
    } catch (err: any) {
      setErrorMsg("Network error connecting to translation server.");
    } finally {
      setIsLoading(false);
    }
  };

  const swapLanguages = () => {
    if (sourceLang === "auto") {
      const actualSource = detectedLang || "en";
      setSourceLang(targetLang);
      setTargetLang(actualSource);
    } else {
      setSourceLang(targetLang);
      setTargetLang(sourceLang);
    }
    const tempText = inputText;
    setInputText(translatedText.slice(0, MAX_CHAR_LIMIT));
    setTranslatedText(tempText);
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeech = () => {
    if (!translatedText || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const filteredSourceLangs = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(sourceSearch.toLowerCase()) ||
      l.code.toLowerCase().includes(sourceSearch.toLowerCase())
  );

  const filteredTargetLangs = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.code !== "auto" &&
      (l.name.toLowerCase().includes(targetSearch.toLowerCase()) ||
        l.code.toLowerCase().includes(targetSearch.toLowerCase()))
  );

  const getLangName = (code: string) => {
    const lang = SUPPORTED_LANGUAGES.find((l) => l.code === code);
    return lang ? lang.name : code;
  };

  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const isMaxReached = charCount >= MAX_CHAR_LIMIT;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="liquid-glass-surface p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <span className="lens-sheen" />
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 rounded-2xl bg-indigo-600/10 border border-indigo-200 text-indigo-600 shadow-[inset_0_1px_1.5px_#ffffff]">
              <Languages className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 text-xs font-mono font-bold rounded-full bg-emerald-500/15 text-emerald-800 border border-emerald-300">
              Automatic Silent Failover
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-sans">
            Accurate Online Translator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
            Translate text across 100+ languages with automatic backup failover and a 5,000 character limit for maximum reliability.
          </p>
        </div>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-2 relative z-10">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono mr-1">
            Samples:
          </span>
          {SAMPLE_TEXTS.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => setInputText(sample.text)}
              className="px-3 py-1.5 text-xs font-medium rounded-xl bg-white/80 border border-slate-200/90 text-slate-700 hover:bg-white hover:border-indigo-300 hover:text-indigo-600 transition-all cursor-pointer shadow-2xs"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>

      {/* Silent backup engine notification banner */}
      {usedBackupEngine && (
        <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 text-indigo-950 text-xs font-sans flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>
              <strong>Backup Service Active:</strong> Translation completed seamlessly using our secondary high-performance pipeline.
            </span>
          </div>
          <button
            onClick={() => setUsedBackupEngine(false)}
            className="text-indigo-700 font-bold hover:underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Workspace Card */}
      <div className="liquid-glass-surface p-4 sm:p-6 space-y-4">
        {/* Language Selection Toolbar */}
        <div className="relative z-30 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 backdrop-blur-md p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs">
          {/* Source Language Dropdown */}
          <div className="relative z-40 w-full sm:w-72" ref={sourceDropdownRef}>
            <button
              onClick={() => {
                setIsSourceDropdownOpen(!isSourceDropdownOpen);
                setIsTargetDropdownOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 flex items-center justify-between hover:border-indigo-300 transition-all cursor-pointer font-sans font-bold text-sm shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs text-slate-400 uppercase font-mono font-semibold">From:</span>
                <span className="text-slate-950 truncate font-semibold">{getLangName(sourceLang)}</span>
                {sourceLang === "auto" && detectedLang && (
                  <span className="text-[10px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                    Detected: {getLangName(detectedLang)}
                  </span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isSourceDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isSourceDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute left-0 top-full mt-2 w-full sm:w-80 p-3 rounded-2xl bg-white/95 backdrop-blur-3xl border border-slate-200 shadow-xl z-50 space-y-2 max-h-80 overflow-hidden flex flex-col"
                >
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search source language..."
                      value={sourceSearch}
                      onChange={(e) => setSourceSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Popular shortcuts */}
                  {!sourceSearch && (
                    <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
                      {["auto", ...POPULAR_LANGUAGES.slice(0, 5)].map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setSourceLang(code);
                            setIsSourceDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all ${
                            sourceLang === code
                              ? "bg-indigo-600 text-white font-bold"
                              : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                          }`}
                        >
                          {getLangName(code)}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="overflow-y-auto flex-1 space-y-1 custom-scrollbar">
                    {filteredSourceLangs.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSourceLang(lang.code);
                          setIsSourceDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs rounded-xl flex items-center justify-between font-sans transition-colors ${
                          sourceLang === lang.code
                            ? "bg-indigo-50 text-indigo-900 font-extrabold"
                            : "hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <span>{lang.name}</span>
                        {lang.nativeName && <span className="text-[10px] text-slate-400 font-normal">{lang.nativeName}</span>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Swap Languages Button */}
          <button
            onClick={swapLanguages}
            title="Swap Source and Target Languages"
            className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-700 hover:text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all cursor-pointer shadow-2xs"
          >
            <ArrowLeftRight className="w-4 h-4" />
          </button>

          {/* Target Language Dropdown */}
          <div className="relative z-40 w-full sm:w-72" ref={targetDropdownRef}>
            <button
              onClick={() => {
                setIsTargetDropdownOpen(!isTargetDropdownOpen);
                setIsSourceDropdownOpen(false);
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-900 flex items-center justify-between hover:border-indigo-300 transition-all cursor-pointer font-sans font-bold text-sm shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-xs text-slate-400 uppercase font-mono font-semibold">To:</span>
                <span className="text-slate-950 truncate font-semibold">{getLangName(targetLang)}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isTargetDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isTargetDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute right-0 top-full mt-2 w-full sm:w-80 p-3 rounded-2xl bg-white/95 backdrop-blur-3xl border border-slate-200 shadow-xl z-50 space-y-2 max-h-80 overflow-hidden flex flex-col"
                >
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search target language..."
                      value={targetSearch}
                      onChange={(e) => setTargetSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {/* Popular shortcuts */}
                  {!targetSearch && (
                    <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
                      {POPULAR_LANGUAGES.slice(0, 6).map((code) => (
                        <button
                          key={code}
                          onClick={() => {
                            setTargetLang(code);
                            setIsTargetDropdownOpen(false);
                          }}
                          className={`px-2.5 py-1 text-[11px] rounded-lg font-medium transition-all ${
                            targetLang === code
                              ? "bg-indigo-600 text-white font-bold"
                              : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
                          }`}
                        >
                          {getLangName(code)}
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="overflow-y-auto flex-1 space-y-1 custom-scrollbar">
                    {filteredTargetLangs.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setTargetLang(lang.code);
                          setIsTargetDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs rounded-xl flex items-center justify-between font-sans transition-colors ${
                          targetLang === lang.code
                            ? "bg-indigo-50 text-indigo-900 font-extrabold"
                            : "hover:bg-slate-100 text-slate-800"
                        }`}
                      >
                        <span>{lang.name}</span>
                        {lang.nativeName && <span className="text-[10px] text-slate-400 font-normal">{lang.nativeName}</span>}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Dual Text Editor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {/* Left Input Pane */}
          <div className="flex flex-col h-[340px] sm:h-[400px] rounded-2xl border border-slate-200/90 bg-white/90 overflow-hidden shadow-2xs focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/10 transition-all">
            <div className="p-3 bg-slate-50/80 border-b border-slate-200/70 flex items-center justify-between text-xs text-slate-500 font-sans">
              <span className="font-extrabold text-slate-800">Source Text</span>
              <div className="flex items-center gap-2 font-mono">
                <span className={`font-semibold ${isMaxReached ? "text-rose-600 font-extrabold" : "text-slate-600"}`}>
                  {charCount.toLocaleString()} / {MAX_CHAR_LIMIT.toLocaleString()} chars
                </span>
                <span>•</span>
                <span>{wordCount.toLocaleString()} words</span>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={handleInputChange}
              maxLength={MAX_CHAR_LIMIT}
              placeholder="Type or paste text here (up to 5,000 characters). Translation automatically triggers after typing pause..."
              className="flex-1 p-4 bg-transparent text-slate-900 text-sm sm:text-base font-sans leading-relaxed resize-none focus:outline-none placeholder:text-slate-400 custom-scrollbar"
            />

            <div className="p-3 bg-slate-50/50 border-t border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInputText("")}
                  disabled={!inputText}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-40 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>

                {isMaxReached && (
                  <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                    Max 5k limit reached
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isLoading ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold font-mono animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Translating...
                  </div>
                ) : (
                  <button
                    onClick={handleTranslate}
                    disabled={!inputText.trim()}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Translate Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Output Pane */}
          <div className="flex flex-col h-[340px] sm:h-[400px] rounded-2xl border border-slate-200/90 bg-slate-900 text-slate-100 overflow-hidden shadow-2xs relative">
            <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white">Translated Text</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                  {getLangName(targetLang)}
                </span>
              </div>

              {translatedText && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSpeech}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSpeaking
                        ? "bg-indigo-600 border-indigo-400 text-white"
                        : "bg-slate-800/80 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700"
                    }`}
                    title="Read Aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-500 transition-colors flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 p-4 overflow-y-auto text-sm sm:text-base font-sans leading-relaxed text-slate-100 custom-scrollbar select-text">
              {errorMsg ? (
                <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-rose-200">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    Translation Notice
                  </div>
                  <p>{errorMsg}</p>
                </div>
              ) : translatedText ? (
                <p className="whitespace-pre-wrap">{translatedText}</p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-2 text-center p-6 select-none">
                  <Languages className="w-8 h-8 opacity-40" />
                  <p className="text-xs">Translation output will appear here automatically</p>
                </div>
              )}
            </div>

            {/* Bottom Output Status */}
            <div className="p-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Status: {isLoading ? "Translating..." : translatedText ? "Ready" : "Idle"}</span>
              <span className="flex items-center gap-1">
                <Info className="w-3 h-3 text-slate-500" />
                Silent Multi-Engine Failover Enabled
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
