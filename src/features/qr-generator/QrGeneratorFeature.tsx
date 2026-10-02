"use client";

import React, { useState, useRef, useEffect } from "react";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { Download, Upload, Trash2, SlidersHorizontal, Image as ImageIcon, Link as LinkIcon, Smartphone, Wifi } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FadeIn, SlideUp } from "@/components/motion/MotionPrimitives";

export function QrGeneratorFeature() {
  const [text, setText] = useState("https://codelens.app");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [level, setLevel] = useState<"L" | "M" | "Q" | "H">("Q");
  
  // Logo settings
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.2); // relative to QR size
  const [excavate, setExcavate] = useState(true);

  // Reference for downloading
  const qrRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
  };

  const downloadQR = (format: 'png' | 'svg') => {
    if (!qrRef.current) return;
    
    if (format === 'png') {
      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = "codelens-qr.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } else {
      const svg = qrRef.current.querySelector('svg');
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "codelens-qr.svg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    }
  };

  return (
    <FadeIn delay={0.1} className="liquid-glass-surface p-6 sm:p-8 border border-white dark:border-slate-700/80 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Settings Panel */}
        <SlideUp delay={0.2} className="lg:col-span-7 xl:col-span-8 space-y-8">
          
          {/* Content Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700/50 pb-2">
              <LinkIcon className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold">QR Content</h3>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">URL, Text, or Data</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-24 p-3 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                placeholder="Enter URL or text to encode..."
              />
            </div>
          </div>

          {/* Design Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700/50 pb-2">
              <SlidersHorizontal className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold">Design & Colors</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Foreground Color</label>
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <span className="font-mono text-sm text-slate-600 dark:text-slate-400 uppercase">{fgColor}</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Background Color</label>
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border-0 p-0 bg-transparent"
                  />
                  <span className="font-mono text-sm text-slate-600 dark:text-slate-400 uppercase">{bgColor}</span>
                </div>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Size (px)</span>
                  <span>{size}px</span>
                </label>
                <input
                  type="range"
                  min="128"
                  max="1024"
                  step="8"
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
              
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Error Correction Level</label>
                <div className="flex gap-2">
                  {(['L', 'M', 'Q', 'H'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors border ${
                        level === l 
                          ? 'bg-indigo-50 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30' 
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 dark:bg-slate-900/50 dark:text-slate-400 dark:border-slate-700 dark:hover:bg-slate-800'
                      }`}
                    >
                      {l} {l === 'H' && '(Best for Logos)'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700/50 pb-2">
              <ImageIcon className="w-5 h-5 text-indigo-500" />
              <h3 className="text-lg font-bold">Logo Integration</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Upload Logo</label>
                {!logo ? (
                  <label className="flex items-center justify-center w-full h-20 p-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer text-slate-500 hover:text-indigo-500 dark:text-slate-400">
                    <div className="flex flex-col items-center gap-1">
                      <Upload className="w-5 h-5" />
                      <span className="text-xs font-medium">Select Image</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  </label>
                ) : (
                  <div className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                    <button onClick={removeLogo} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {logo && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex justify-between">
                      <span>Logo Size</span>
                      <span>{Math.round(logoSize * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min="0.1"
                      max="0.3"
                      step="0.01"
                      value={logoSize}
                      onChange={(e) => setLogoSize(Number(e.target.value))}
                      className="w-full accent-indigo-500"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={excavate}
                      onChange={(e) => setExcavate(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Remove background behind logo</span>
                  </label>
                </div>
              )}
            </div>
          </div>

        </SlideUp>

        {/* Preview Panel */}
        <SlideUp delay={0.3} className="lg:col-span-5 xl:col-span-4">
          <div className="sticky top-24 bg-white/50 dark:bg-slate-900/30 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 rounded-3xl p-6 shadow-xl flex flex-col items-center gap-8">
            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Live Preview</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">High-quality SVG rendering</p>
            </div>
            
            {/* The QR Code Container */}
            <div 
              className="relative rounded-2xl overflow-hidden shadow-sm flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50"
            >
              <div ref={qrRef} className="relative z-10 p-2 bg-white rounded-xl shadow-sm border border-slate-200/50 dark:border-slate-700/50 transition-all">
                {/* We render BOTH SVG and Canvas. We hide canvas, but keep it for PNG download. We show SVG. */}
                <div className="block">
                  <QRCodeSVG
                    value={text || "https://codelens.app"}
                    size={Math.min(size, 250)} // Scale down for preview if large
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level={level}
                    includeMargin={true}
                    imageSettings={logo ? {
                      src: logo,
                      height: Math.min(size, 250) * logoSize,
                      width: Math.min(size, 250) * logoSize,
                      excavate: excavate,
                    } : undefined}
                  />
                </div>
                <div className="hidden">
                  <QRCodeCanvas
                    value={text || "https://codelens.app"}
                    size={size} // Actual size for download
                    fgColor={fgColor}
                    bgColor={bgColor}
                    level={level}
                    includeMargin={true}
                    imageSettings={logo ? {
                      src: logo,
                      height: size * logoSize,
                      width: size * logoSize,
                      excavate: excavate,
                    } : undefined}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full gap-3">
              <Button onClick={() => downloadQR('png')} className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-6">
                <Download className="w-5 h-5" />
                Download PNG
              </Button>
              <Button onClick={() => downloadQR('svg')} variant="secondary" className="w-full gap-2 rounded-xl py-6 border-slate-300 dark:border-slate-700">
                <Download className="w-5 h-5" />
                Download SVG
              </Button>
            </div>
          </div>
        </SlideUp>
      </div>
    </FadeIn>
  );
}
