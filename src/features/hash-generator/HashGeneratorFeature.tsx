"use client";

import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import { Lock, Unlock, Hash, Copy, ShieldAlert, Key } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";

export function HashGeneratorFeature() {
  const [activeTab, setActiveTab] = useState<"hash" | "encrypt">("hash");
  
  // Hash State
  const [hashInput, setHashInput] = useState("");
  const [hashAlgo, setHashAlgo] = useState<"MD5" | "SHA1" | "SHA256" | "SHA512" | "SHA3" | "RIPEMD160">("SHA256");
  const [hashOutput, setHashOutput] = useState("");

  // Encrypt State
  const [encryptInput, setEncryptInput] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [encryptAlgo, setEncryptAlgo] = useState<"AES" | "DES" | "TripleDES" | "Rabbit" | "RC4">("AES");
  const [encryptOutput, setEncryptOutput] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [errorMsg, setErrorMsg] = useState("");

  // Process Hash
  useEffect(() => {
    if (!hashInput) {
      setHashOutput("");
      return;
    }
    try {
      const result = CryptoJS[hashAlgo](hashInput).toString(CryptoJS.enc.Hex);
      setHashOutput(result);
    } catch (e) {
      setHashOutput("Error generating hash");
    }
  }, [hashInput, hashAlgo]);

  // Process Encrypt/Decrypt
  useEffect(() => {
    if (!encryptInput || !secretKey) {
      setEncryptOutput("");
      setErrorMsg("");
      return;
    }
    setErrorMsg("");
    try {
      if (mode === "encrypt") {
        const result = CryptoJS[encryptAlgo].encrypt(encryptInput, secretKey).toString();
        setEncryptOutput(result);
      } else {
        const result = CryptoJS[encryptAlgo].decrypt(encryptInput, secretKey).toString(CryptoJS.enc.Utf8);
        if (!result && encryptInput.length > 0) {
          setErrorMsg("Decryption failed. Invalid key, algorithm, or corrupted payload.");
          setEncryptOutput("");
        } else {
          setEncryptOutput(result);
        }
      }
    } catch (e) {
      setErrorMsg("Malformed payload or invalid key.");
      setEncryptOutput("");
    }
  }, [encryptInput, secretKey, encryptAlgo, mode]);

  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
  };

  return (
    <FadeIn delay={0.1} className="liquid-glass-surface border border-white dark:border-slate-700/80 mt-8 overflow-hidden rounded-[2rem]">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-700/50 bg-white/30 dark:bg-slate-900/30">
        <button
          onClick={() => setActiveTab("hash")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-colors ${
            activeTab === "hash"
              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Hash className="w-4 h-4" />
          Hash Generator
        </button>
        <button
          onClick={() => setActiveTab("encrypt")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-colors ${
            activeTab === "encrypt"
              ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
        >
          <Lock className="w-4 h-4" />
          Encrypt / Decrypt
        </button>
      </div>

      <div className="p-6 sm:p-8">
        {activeTab === "hash" ? (
          <SlideUp delay={0.2} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Hash Algorithm</label>
              <div className="flex flex-wrap gap-2">
                {(["MD5", "SHA1", "SHA256", "SHA512", "SHA3", "RIPEMD160"] as const).map((algo) => (
                  <button
                    key={algo}
                    onClick={() => setHashAlgo(algo)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                      hashAlgo === algo
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800'
                    }`}
                  >
                    {algo}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Input Data</label>
                <textarea
                  value={hashInput}
                  onChange={(e) => setHashInput(e.target.value)}
                  placeholder="Enter text to hash..."
                  className="w-full h-48 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-mono text-sm resize-none"
                />
              </div>
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Generated Hash (Hex)</label>
                  <button onClick={() => copyToClipboard(hashOutput)} className="text-xs text-indigo-500 flex items-center gap-1 hover:text-indigo-600">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <textarea
                  value={hashOutput}
                  readOnly
                  placeholder="Generated hash will appear here..."
                  className="w-full h-48 p-4 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-mono text-sm resize-none"
                />
              </div>
            </div>
          </SlideUp>
        ) : (
          <SlideUp delay={0.2} className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Action</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode("encrypt")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors border ${
                      mode === "encrypt"
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Lock className="w-4 h-4" /> Encrypt
                  </button>
                  <button
                    onClick={() => setMode("decrypt")}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg transition-colors border ${
                      mode === "decrypt"
                        ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30' 
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Unlock className="w-4 h-4" /> Decrypt
                  </button>
                </div>
              </div>
              <div className="flex-2 space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Algorithm</label>
                <div className="flex flex-wrap gap-2">
                  {(["AES", "DES", "TripleDES", "Rabbit", "RC4"] as const).map((algo) => (
                    <button
                      key={algo}
                      onClick={() => setEncryptAlgo(algo)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
                        encryptAlgo === algo
                          ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800'
                      }`}
                    >
                      {algo}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Secret Key (Password)</label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter secret passphrase..."
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-mono text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {mode === "encrypt" ? "Plain Text Data" : "Encrypted Payload (Base64)"}
                </label>
                <textarea
                  value={encryptInput}
                  onChange={(e) => setEncryptInput(e.target.value)}
                  placeholder={mode === "encrypt" ? "Enter text to encrypt..." : "Enter ciphertext to decrypt..."}
                  className="w-full h-40 p-4 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-mono text-sm resize-none"
                />
              </div>
              <div className="space-y-2 relative">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {mode === "encrypt" ? "Encrypted Output (Base64)" : "Decrypted Plain Text"}
                  </label>
                  <button onClick={() => copyToClipboard(encryptOutput)} className="text-xs text-indigo-500 flex items-center gap-1 hover:text-indigo-600">
                    <Copy className="w-3 h-3" /> Copy
                  </button>
                </div>
                <div className="relative h-40">
                  <textarea
                    value={encryptOutput}
                    readOnly
                    placeholder={errorMsg ? "" : (mode === "encrypt" ? "Ciphertext will appear here..." : "Decrypted text will appear here...")}
                    className="w-full h-full p-4 bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-700 rounded-xl outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-mono text-sm resize-none"
                  />
                  {errorMsg && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50/90 dark:bg-red-900/20 backdrop-blur-sm border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                      <ShieldAlert className="w-8 h-8 mb-2" />
                      <p className="text-sm font-medium">{errorMsg}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SlideUp>
        )}
      </div>
    </FadeIn>
  );
}
