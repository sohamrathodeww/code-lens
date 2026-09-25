'use client';

import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Copy, Check, AlertCircle, FileText, Binary } from 'lucide-react';

type Mode = 'encode' | 'decode';

export const Base64ConverterFeature = () => {
  const [mode, setMode] = useState<Mode>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    processText(input, mode);
  }, [input, mode]);

  const processText = (text: string, currentMode: Mode) => {
    if (!text) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (currentMode === 'encode') {
        // Safe UTF-8 encoding
        const encoded = btoa(unescape(encodeURIComponent(text)));
        setOutput(encoded);
      } else {
        // Safe UTF-8 decoding
        const decoded = decodeURIComponent(escape(atob(text.trim())));
        setOutput(decoded);
      }
      setError(null);
    } catch (err) {
      if (currentMode === 'decode') {
        setError('Invalid Base64 string. Please ensure your input is properly encoded.');
      } else {
        setError('Failed to encode the provided text.');
      }
      setOutput('');
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'encode' ? 'decode' : 'encode');
    setInput(output);
  };

  return (
    <div className="w-full space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 liquid-glass-surface border border-white/80 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 bg-slate-100/50 p-1 rounded-xl">
          <button
            onClick={() => setMode('encode')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              mode === 'encode'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-6 py-2 rounded-lg font-bold text-sm transition-all ${
              mode === 'decode'
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Decode
          </button>
        </div>

        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 rounded-xl text-sm font-bold transition-all shadow-sm"
        >
          <ArrowDownUp className="w-4 h-4" />
          Swap
        </button>
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="liquid-glass-surface rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[500px] overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              {mode === 'encode' ? <FileText className="w-4 h-4 text-indigo-500" /> : <Binary className="w-4 h-4 text-indigo-500" />}
              {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {input.length} chars
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? "Paste your text here to encode..." : "Paste your Base64 string here to decode..."}
            className="flex-1 w-full bg-transparent p-5 resize-none outline-none text-sm text-slate-700 font-mono"
            spellCheck="false"
          />
        </div>

        {/* Output */}
        <div className="liquid-glass-surface rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[500px] overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
              {mode === 'encode' ? <Binary className="w-4 h-4 text-emerald-500" /> : <FileText className="w-4 h-4 text-emerald-500" />}
              {mode === 'encode' ? 'Base64 Output' : 'Plain Text Output'}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {output.length} chars
              </span>
              <button
                onClick={handleCopy}
                disabled={!output}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-indigo-100"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="flex-1 w-full bg-slate-50/30 p-5 relative">
            {error ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-rose-500 gap-3">
                <AlertCircle className="w-8 h-8" />
                <p className="font-medium text-sm">{error}</p>
              </div>
            ) : (
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-full bg-transparent resize-none outline-none text-sm text-slate-700 font-mono"
                spellCheck="false"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
