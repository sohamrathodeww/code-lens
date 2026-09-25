'use client';

import React, { useState, useRef, useCallback } from 'react';
import { FileText, FileSpreadsheet, Settings, ArrowRight, Loader2, Download, X, UploadCloud, FileOutput, CheckCircle2, ChevronLeft, Zap } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'framer-motion';

type ToolType = 'merge-pdf' | 'excel-to-csv' | 'merge-excel';

const MAX_FILES = 5;
const MAX_FILE_SIZE_MB = 10;

const TOOLS_LIST = [
  { id: 'merge-pdf', name: 'Merge PDFs', desc: 'Combine multiple PDFs into one cohesive document', type: 'pdf', icon: FileText, color: 'rose' },
  { id: 'excel-to-csv', name: 'Excel to CSV', desc: 'Convert XLSX/XLS spreadsheets to standard CSV', type: 'excel', icon: FileSpreadsheet, color: 'emerald' },
  { id: 'merge-excel', name: 'Merge Excel Sheets', desc: 'Combine multiple Excel workbooks into one', type: 'excel', icon: FileSpreadsheet, color: 'emerald' },
];

export const DocumentToolsFeature = () => {
  const [activeTool, setActiveTool] = useState<ToolType | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFileName, setResultFileName] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleToolChange = (tool: ToolType) => {
    setActiveTool(tool);
    clearAll();
  };

  const clearAll = () => {
    setFiles([]);
    setResultUrl(null);
    setResultFileName(null);
    setResultSize(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setResultUrl(null);
  };

  const validateFiles = (newFiles: File[]) => {
    setError(null);
    if (files.length + newFiles.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
      return false;
    }

    for (const file of newFiles) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError(`File ${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit.`);
        return false;
      }

      if (activeTool?.includes('pdf')) {
        if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
          setError(`File ${file.name} is not a valid PDF.`);
          return false;
        }
      } else if (activeTool?.includes('excel')) {
        const validExcelTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-excel',
          'text/csv'
        ];
        if (!validExcelTypes.includes(file.type) && !file.name.toLowerCase().match(/\.(xlsx|xls|csv)$/)) {
          setError(`File ${file.name} is not a valid Excel/CSV file.`);
          return false;
        }
      }
    }
    
    // For single file tools
    if ((activeTool === 'excel-to-csv') && files.length + newFiles.length > 1) {
      setError(`This tool only accepts 1 file at a time.`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      if (validateFiles(newFiles)) {
        setFiles(prev => [...prev, ...newFiles]);
        setResultUrl(null);
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      if (validateFiles(newFiles)) {
        setFiles(prev => [...prev, ...newFiles]);
        setResultUrl(null);
      }
    }
  }, [files, activeTool]);

  const processDocument = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setResultUrl(null);

    try {
      if (activeTool === 'merge-pdf') {
        const mergedPdf = await PDFDocument.create();
        
        for (const file of files) {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await PDFDocument.load(arrayBuffer);
          const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
          copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();
        const blob = new Blob([mergedPdfBytes as unknown as BlobPart], { type: 'application/pdf' });
        createResult(blob, 'merged-document.pdf');
      }
      else if (activeTool === 'excel-to-csv') {
        const arrayBuffer = await files[0].arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        const csvContent = XLSX.utils.sheet_to_csv(worksheet);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        createResult(blob, `${files[0].name.replace(/\.[^/.]+$/, "")}.csv`);
      }
      else if (activeTool === 'merge-excel') {
        const mergedWorkbook = XLSX.utils.book_new();
        
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const arrayBuffer = await file.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          
          // Copy the first sheet of each file into the new workbook
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          let safeSheetName = file.name.replace(/\.[^/.]+$/, "").substring(0, 31); // Max 31 chars
          
          // Ensure unique sheet name
          let finalName = safeSheetName;
          let counter = 1;
          while(mergedWorkbook.SheetNames.includes(finalName)) {
            finalName = `${safeSheetName.substring(0, 28)}_${counter}`;
            counter++;
          }
          
          XLSX.utils.book_append_sheet(mergedWorkbook, worksheet, finalName);
        }

        const excelBuffer = XLSX.write(mergedWorkbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        createResult(blob, 'merged-workbook.xlsx');
      }
    } catch (err: any) {
      console.error(err);
      setError(`Failed to process document: ${err.message || 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const createResult = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    setResultUrl(url);
    setResultSize(blob.size);
    setResultFileName(filename);
  };

  const activeToolData = TOOLS_LIST.find(t => t.id === activeTool);
  const isMultiFile = activeTool === 'merge-pdf' || activeTool === 'merge-excel';
  const canProcess = files.length > 0 && (!isMultiFile || files.length >= 2);
  const colorClass = activeToolData?.color === 'rose' ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200' : 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200';
  const iconColor = activeToolData?.color === 'rose' ? 'text-rose-500' : 'text-emerald-500';

  return (
    <div className="w-full relative min-h-[600px] flex justify-center">
      <AnimatePresence mode="wait">
        
        {/* VIEW 1: TOOL SELECTION DIRECTORY */}
        {activeTool === null ? (
          <motion.div 
            key="directory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl mx-auto"
          >
            {TOOLS_LIST.map((tool) => {
              const Icon = tool.icon;
              const isPdf = tool.type === 'pdf';
              return (
                <button
                  key={tool.id}
                  onClick={() => handleToolChange(tool.id as ToolType)}
                  className="group relative p-8 flex flex-col items-start h-full text-left rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 transition-all duration-300 overflow-hidden hover:border-indigo-300 hover:shadow-[0_20px_60px_-15px_rgba(79,70,229,0.15)] hover:-translate-y-1 z-10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  <div className={`p-4 rounded-2xl mb-6 transition-all duration-300 shadow-sm
                    ${tool.color === 'rose' ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:bg-rose-50 dark:bg-rose-500/100 group-hover:text-white' 
                            : 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 group-hover:bg-emerald-50 dark:bg-emerald-500/100 group-hover:text-white'} 
                    group-hover:scale-110`}
                  >
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:text-indigo-400 transition-colors duration-300 tracking-tight mb-2">
                    {tool.name}
                  </h3>
                  
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {tool.desc}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    Open Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </motion.div>
        ) : (
          
          /* VIEW 2: TOOL WORKSPACE (2-COLUMN LAYOUT) */
          <motion.div 
            key="workspace"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-6xl mx-auto flex flex-col gap-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700">
              <button 
                onClick={() => { setActiveTool(null); clearAll(); }}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-slate-100 transition-colors px-3 py-2 rounded-xl hover:bg-slate-100 dark:bg-slate-800"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Tools
              </button>
              
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${colorClass}`}>
                  {activeToolData && <activeToolData.icon className="w-5 h-5" />}
                </div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{activeToolData?.name}</h2>
              </div>
            </div>

            {/* Error Banner */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="bg-rose-50 dark:bg-rose-500/10 border border-rose-200 text-rose-700 dark:text-rose-400 px-5 py-4 rounded-2xl text-sm font-bold flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <X className="w-5 h-5 bg-rose-200 text-rose-700 dark:text-rose-400 rounded-full p-0.5" />
                    {error}
                  </div>
                  <button onClick={() => setError(null)} className="text-rose-400 hover:text-rose-700 dark:text-rose-400 p-1">
                    <X className="w-5 h-5" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start h-full">
              
              {/* LEFT COLUMN: Input & Config */}
              <div className="liquid-glass-surface rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 p-6 flex flex-col gap-6 bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl">
                
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-base">
                    <UploadCloud className={`w-5 h-5 ${iconColor}`} />
                    Input Documents
                  </h3>
                  {files.length > 0 && (
                    <button onClick={clearAll} className="text-xs font-bold text-rose-500 hover:text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:bg-rose-900/30 px-3 py-1.5 rounded-lg transition-colors">
                      Clear All
                    </button>
                  )}
                </div>

                {/* Dropzone */}
                <div 
                  className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer p-8 relative overflow-hidden group
                    ${files.length >= (isMultiFile ? MAX_FILES : 1) ? 'opacity-50 pointer-events-none bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700' : 'hover:bg-indigo-50/50 border-slate-300 dark:border-slate-600 hover:border-indigo-300'}`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept={activeTool?.includes('pdf') ? 'application/pdf' : '.xlsx,.xls,.csv'}
                    onChange={handleFileChange}
                    multiple={isMultiFile}
                  />
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 ${colorClass}`}>
                    <UploadCloud className={`w-8 h-8 ${iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Click or drag to upload</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    {activeTool?.includes('pdf') ? 'PDF Documents' : 'Excel / CSV Files'}
                  </p>
                  <p className="text-xs text-slate-400 mt-4 font-medium">
                    Max {isMultiFile ? MAX_FILES : 1} file{isMultiFile ? 's' : ''}, up to {MAX_FILE_SIZE_MB}MB
                  </p>
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="flex flex-col gap-3">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className={`p-2 rounded-xl shrink-0 ${colorClass}`}>
                            {activeToolData && <activeToolData.icon className="w-5 h-5" />}
                          </div>
                          <div className="truncate">
                            <p className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={() => removeFile(idx)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:bg-rose-500/10 rounded-xl transition-colors shrink-0">
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}


                {/* Action Button */}
                <button
                  onClick={processDocument}
                  disabled={isProcessing || !canProcess}
                  className="w-full mt-2 flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 py-4 rounded-2xl text-base font-bold transition-all shadow-[0_8px_20px_rgba(79,70,229,0.2)] disabled:shadow-none active:scale-[0.98]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Process Document{isMultiFile ? 's' : ''}
                    </>
                  )}
                </button>
              </div>

              {/* RIGHT COLUMN: Output Result */}
              <div className="liquid-glass-surface rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 p-6 flex flex-col bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl h-full min-h-[400px]">
                <h3 className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2 text-base mb-6">
                  <FileOutput className="w-5 h-5 text-indigo-500" />
                  Processed Result
                </h3>
                
                <div className="flex-1 flex flex-col relative border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/50">
                  <AnimatePresence mode="wait">
                    {!resultUrl ? (
                      <motion.div 
                        key="empty"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                      >
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-300">
                          <FileOutput className="w-8 h-8" />
                        </div>
                        <h4 className="font-bold text-slate-500 dark:text-slate-400 mb-2">No Output Yet</h4>
                        <p className="text-sm font-medium text-slate-400">
                          Upload files and click process to generate your optimized document.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="result"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900"
                      >
                        <div className="w-24 h-24 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border-4 border-white dark:border-slate-700 shadow-lg">
                          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        
                        <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-xl text-center break-all mb-2">
                          {resultFileName}
                        </h3>
                        
                        {resultSize && (
                          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full mb-8">
                            Size: {(resultSize / 1024 / 1024).toFixed(2)} MB
                          </p>
                        )}
                        
                        <a 
                          href={resultUrl} 
                          download={resultFileName || 'processed-document'}
                          className="w-full flex items-center justify-center gap-3 bg-emerald-50 dark:bg-emerald-500/100 hover:bg-emerald-600 text-white px-6 py-4 rounded-2xl text-base font-bold transition-all shadow-[0_8px_20px_rgba(16,185,129,0.2)] active:scale-[0.98]"
                        >
                          <Download className="w-6 h-6" />
                          Download File
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};






