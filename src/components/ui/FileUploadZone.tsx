"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, AlertCircle, X, FileCode } from "lucide-react";
import { clsx } from "clsx";

interface FileUploadZoneProps {
  onFileSelect: (content: string, filename: string, filesize: number) => void;
  acceptLabel?: string;
  maxSizeMB?: number;
  allowedExtensions?: string[];
  title?: string;
  subtitle?: string;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileSelect,
  acceptLabel = "JSON, TXT, JS, TS, HTML, CSS, PY (Max 5MB)",
  maxSizeMB = 5,
  allowedExtensions,
  title = "Upload or Drag File Here",
  subtitle = "Supports files up to 5MB with instant validation",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentFile, setCurrentFile] = useState<{ name: string; size: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateAndProcessFile = (file: File) => {
    setErrorMessage(null);

    if (file.size > maxSizeBytes) {
      setErrorMessage(
        `File "${file.name}" exceeds the maximum 5MB size limit (${(
          file.size /
          (1024 * 1024)
        ).toFixed(2)}MB). Upload rejected.`
      );
      return;
    }

    if (allowedExtensions && allowedExtensions.length > 0) {
      const ext = "." + file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(ext)) {
        setErrorMessage(
          `Invalid file format "${ext}". Supported types: ${allowedExtensions.join(", ")}`
        );
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCurrentFile({ name: file.name, size: file.size });
      onFileSelect(content, file.name, file.size);
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read file content.");
    };
    reader.readAsText(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setCurrentFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full font-sans">
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.008 }}
        onClick={() => fileInputRef.current?.click()}
        className={clsx(
          "relative group border-2 border-dashed rounded-3xl p-7 transition-all duration-300 cursor-pointer text-center flex flex-col items-center justify-center gap-3 overflow-hidden backdrop-blur-2xl bg-white/70 border-indigo-300/60 shadow-[inset_0_1.5px_2px_#ffffff,0_10px_25px_rgba(15,23,42,0.05)]",
          isDragging
            ? "border-indigo-600 bg-indigo-50 shadow-[0_12px_32px_rgba(99,102,241,0.25)] scale-[1.01]"
            : "hover:border-indigo-500 hover:bg-white hover:shadow-[0_16px_36px_rgba(99,102,241,0.15)]"
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleInputChange}
          accept={allowedExtensions ? allowedExtensions.join(",") : undefined}
        />

        <div className="p-3.5 rounded-2xl bg-indigo-600/10 border border-indigo-200/80 text-indigo-600 group-hover:scale-110 transition-transform duration-300 shadow-[inset_0_1.5px_2px_#ffffff]">
          <UploadCloud className="w-7 h-7" />
        </div>

        <div>
          <h4 className="text-sm font-extrabold text-slate-950 tracking-tight">{title}</h4>
          <p className="text-xs text-slate-600 font-medium mt-0.5">{subtitle}</p>
        </div>

        <span className="px-3.5 py-1 text-[11px] font-mono font-bold rounded-full bg-white text-indigo-700 border border-indigo-200/80 shadow-sm">
          {acceptLabel}
        </span>
      </motion.div>

      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-300 text-rose-800 flex items-start gap-3 text-xs shadow-md font-sans backdrop-blur-xl"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
            <div className="flex-1 font-bold">{errorMessage}</div>
            <button
              onClick={clearFile}
              className="text-rose-600 hover:text-rose-900 transition-colors p-1 rounded-lg hover:bg-rose-500/20"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {currentFile && !errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-300 text-emerald-900 flex items-center justify-between text-xs font-sans shadow-sm backdrop-blur-xl"
        >
          <div className="flex items-center gap-2.5 truncate">
            <FileCode className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-mono font-bold truncate">{currentFile.name}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-md bg-white text-emerald-800 font-mono font-bold border border-emerald-200">
              {formatBytes(currentFile.size)}
            </span>
          </div>
          <button
            onClick={clearFile}
            className="text-slate-500 hover:text-slate-900 transition-colors p-1 rounded-lg hover:bg-slate-200/50"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

