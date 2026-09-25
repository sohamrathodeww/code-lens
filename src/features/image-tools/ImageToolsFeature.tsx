'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Download, Settings, Loader2, ArrowRight, X, RotateCcw } from 'lucide-react';

type ToolType = 'convert' | 'compress' | 'resize';

export const ImageToolsFeature = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>('convert');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [resultFileName, setResultFileName] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState<number | null>(null);
  
  // Tool states
  const [format, setFormat] = useState('jpeg');
  const [quality, setQuality] = useState(80);
  const [width, setWidth] = useState<number | ''>('');
  const [height, setHeight] = useState<number | ''>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResultUrl(null);
      setResultSize(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResultUrl(null);
      setResultSize(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResultUrl(null);
    setResultSize(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processImage = async () => {
    if (!file) return;

    setIsProcessing(true);
    setResultUrl(null);
    setResultSize(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('action', activeTool);
    
    if (activeTool === 'convert') {
      formData.append('format', format);
      if (format === 'jpeg' || format === 'jpg' || format === 'webp') {
        formData.append('quality', quality.toString());
      }
    } else if (activeTool === 'compress') {
      formData.append('quality', quality.toString());
    } else if (activeTool === 'resize') {
      if (width) formData.append('width', width.toString());
      if (height) formData.append('height', height.toString());
    }

    try {
      const res = await fetch('/api/image', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Processing failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      
      const contentDisposition = res.headers.get('Content-Disposition');
      let filename = 'processed-image';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) filename = match[1];
      }
      setResultFileName(filename);
      
    } catch (error) {
      console.error(error);
      alert('Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Tools Sidebar */}
      <div className="lg:col-span-1 space-y-4">
        <div className="liquid-glass-surface rounded-2xl shadow-sm border border-slate-200/80 p-5">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            Select Image Tool
          </h3>
          <div className="space-y-3">
            {[
              { id: 'convert', label: 'Image Converter', desc: 'Convert PNG, JPG, WebP, GIF' },
              { id: 'compress', label: 'Image Compressor', desc: 'Reduce file size efficiently' },
              { id: 'resize', label: 'Image Resizer', desc: 'Change dimensions' },
            ].map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id as ToolType)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 border ${
                  activeTool === tool.id 
                    ? 'border-indigo-300 bg-indigo-50 shadow-sm text-indigo-900' 
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="font-bold text-sm">{tool.label}</div>
                <div className="text-xs opacity-70 mt-1">{tool.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Tool Options */}
        <div className="liquid-glass-surface rounded-2xl shadow-sm border border-slate-200/80 p-5">
          <h3 className="font-bold text-slate-900 mb-4">Configuration</h3>
          
          {activeTool === 'convert' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Target Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                >
                  <option value="jpeg">JPG / JPEG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                  <option value="gif">GIF</option>
                </select>
              </div>
              {(format === 'jpeg' || format === 'jpg' || format === 'webp') && (
                <div>
                  <label className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    <span>Quality</span>
                    <span className="text-indigo-600">{quality}%</span>
                  </label>
                  <input 
                    type="range" min="1" max="100" value={quality} 
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              )}
            </div>
          )}

          {activeTool === 'compress' && (
            <div className="space-y-4">
              <div>
                <label className="flex justify-between text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  <span>Compression Quality</span>
                  <span className="text-indigo-600">{quality}%</span>
                </label>
                <input 
                  type="range" min="1" max="100" value={quality} 
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="w-full accent-indigo-600"
                />
                <p className="text-xs text-slate-500 mt-2">Lower quality = smaller file size.</p>
              </div>
            </div>
          )}

          {activeTool === 'resize' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Width (px)</label>
                <input 
                  type="number" 
                  placeholder="Auto"
                  value={width}
                  onChange={(e) => setWidth(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Height (px)</label>
                <input 
                  type="number" 
                  placeholder="Auto"
                  value={height}
                  onChange={(e) => setHeight(e.target.value ? parseInt(e.target.value) : '')}
                  className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
              <p className="text-xs text-slate-500">Leave one empty to maintain aspect ratio.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Area */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6 h-full">
          {/* Original Image Pane */}
          <div className="flex-1 liquid-glass-surface rounded-2xl shadow-sm border border-slate-200/80 flex flex-col overflow-hidden min-h-[400px]">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <ImageIcon className="w-4 h-4 text-indigo-500" />
                Original Image
              </h3>
              {file && (
                <button onClick={clearFile} className="text-xs font-bold text-rose-500 hover:text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md transition-colors">
                  Clear
                </button>
              )}
            </div>
            
            <div className="flex-1 flex flex-col p-5 relative">
              {!file ? (
                <div 
                  className="absolute inset-4 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-center hover:bg-slate-50/50 transition-colors cursor-pointer"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                    <UploadCloud className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">Click or drag to upload</h3>
                  <p className="text-slate-500 text-xs">JPG, PNG, WebP, GIF</p>
                </div>
              ) : (
                <div className="absolute inset-4 flex flex-col items-center justify-center">
                  <div className="w-full h-full bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center border border-slate-200">
                    <img src={preview!} alt="Original" className="max-w-full max-h-full object-contain p-2" />
                  </div>
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Process Button (Mobile visible, Desktop implicit) */}
          <div className="hidden md:flex flex-col items-center justify-center shrink-0 gap-6 px-2">
            <div className="flex flex-col items-center gap-2">
              <button
                onClick={processImage}
                disabled={isProcessing || !file}
                className="flex items-center justify-center w-12 h-12 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded-full transition-all shadow-md shadow-indigo-500/20 active:scale-95"
                title="Process Image"
              >
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
              </button>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Process</span>
            </div>

            {file && (
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={clearFile}
                  disabled={isProcessing}
                  className="flex items-center justify-center w-12 h-12 bg-white border border-rose-200 text-rose-500 hover:bg-rose-50 rounded-full transition-all shadow-sm active:scale-95"
                  title="Reset/Clear Tool"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Clear</span>
              </div>
            )}
          </div>

          {/* Mobile Process Button */}
          <div className="md:hidden flex justify-center">
            <button
              onClick={processImage}
              disabled={isProcessing || !file}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95 w-full justify-center"
            >
              {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Process Image'}
            </button>
          </div>

          {/* Processed Result Pane */}
          <div className="flex-1 liquid-glass-surface rounded-2xl shadow-sm border border-slate-200/80 flex flex-col overflow-hidden min-h-[400px]">
            <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                Processed Result
              </h3>
            </div>
            
            <div className="flex-1 flex flex-col p-5 relative">
              {!resultUrl ? (
                <div className="absolute inset-4 flex flex-col items-center justify-center">
                  <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center relative bg-slate-50/50 border-2 border-dashed border-slate-200">
                    <span className="text-slate-400 text-xs font-medium text-center px-4">
                      {isProcessing ? "Processing..." : "Select options and process to see result"}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col h-full gap-4">
                  <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center relative">
                    <img src={resultUrl} alt="Result" className="max-w-full max-h-full object-contain p-2 drop-shadow-md" />
                    {resultSize && (
                      <div className="absolute bottom-2 right-2 bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                        {(resultSize / 1024 / 1024).toFixed(2)} MB
                      </div>
                    )}
                  </div>
                  
                  <a 
                    href={resultUrl} 
                    download={resultFileName || 'processed-image'}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" />
                    Download Processed Image
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
