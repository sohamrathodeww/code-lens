"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FluidCanvas } from '@/components/ui/FluidCanvas';
import LanguageSelector from '@/components/editor/LanguageSelector';
import CodeEditor from '@/components/editor/CodeEditor';
import OutputPanel from '@/components/editor/OutputPanel';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

const DEFAULT_CODE: Record<string, string> = {
  javascript: 'console.log("Hello, World!");',
  python: 'print("Hello, World!")',
  java: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}',
  c: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
};

export default function PlaygroundPage() {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(DEFAULT_CODE['javascript']);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [leftWidth, setLeftWidth] = useState(65);
  const isDragging = useRef(false);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(DEFAULT_CODE[newLang] || '');
    setOutput('');
    setError('');
    setIsSimulated(false);
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    setOutput('');
    setError('');
    setIsSimulated(false);

    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language, sourceCode: code }),
      });

      const data = await response.json();

      if (data.isSimulated) {
        setIsSimulated(true);
      }

      if (!response.ok) {
        setError(data.error || data.details || 'Execution failed');
      } else {
        if (data.run && data.run.code !== 0) {
          setError(data.run.stderr || data.run.stdout);
        } else if (data.run) {
          setOutput(data.run.stdout);
          if (data.run.stderr) {
            setError(data.run.stderr);
          }
        } else {
           // Fallback for mocked response
           setOutput(data.stdout || '');
           if (data.stderr) setError(data.stderr);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    isDragging.current = true;
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  const onDrag = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const container = document.getElementById('split-container');
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
      if (newWidth > 20 && newWidth < 80) { // Limit resizing between 20% and 80%
        setLeftWidth(newWidth);
      }
    }
  };

  const endDrag = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  };

  // Toast visibility state
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (output || error) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [output, error]);

  const isError = Boolean(error);
  const isSuccess = Boolean(output) && !isError;

  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden font-sans bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* Global Toast Notification */}
      {showToast && (isSuccess || isError) && (
        <div className="fixed top-6 right-6 z-[100] flex items-center shadow-xl animate-in slide-in-from-top-5 fade-in duration-300">
          <div className={`flex items-center px-4 py-3 rounded-lg border text-sm font-bold shadow-lg ${
            isError ? 'bg-red-50 dark:bg-red-900/10 border-red-200 text-red-700 dark:text-red-200' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            {isError ? (
              <AlertCircle className="w-5 h-5 mr-3 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 mr-3 shrink-0 text-emerald-600" />
            )}
            <div className="flex flex-col mr-6">
              <span className="leading-tight">{isError ? 'Execution Error' : 'Success'}</span>
              <span className={`text-xs font-medium opacity-80 mt-0.5 ${isError ? 'text-red-600 dark:text-red-300' : 'text-emerald-600'}`}>
                {isError ? 'Code failed to run.' : 'Code executed successfully!'}
              </span>
            </div>
            <button onClick={() => setShowToast(false)} className={`p-1 hover:bg-black/5 rounded-md transition-colors ${isError ? 'text-red-700 dark:text-red-200' : 'text-emerald-700'}`}>
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <FluidCanvas />
      <Navbar />

      <main className="relative z-10 max-w-[1750px] w-full mx-auto px-4 sm:px-8 pt-6 pb-12 flex-1 space-y-6">
        <div id="split-container" className="flex flex-col lg:flex-row h-[75vh] relative">
          {/* Left Panel: Editor */}
          <div style={{ width: `${leftWidth}%` }} className="hidden lg:flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)] overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-300 font-extrabold text-xs">&lt;/&gt;</span>
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Online Editor</h2>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Write & Compile Code</p>
                </div>
              </div>
              <LanguageSelector language={language} onSelect={handleLanguageChange} />
            </div>
            <div className="flex-1 w-full bg-white dark:bg-slate-900 relative">
              <CodeEditor
                language={language}
                value={code}
                onChange={(val) => setCode(val || '')}
              />
            </div>
          </div>
          
          {/* Mobile Fallback Left Panel */}
          <div className="lg:hidden w-full flex-1 flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)] overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-600 dark:text-indigo-300 font-extrabold text-xs">&lt;/&gt;</span>
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">Online Editor</h2>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Write & Compile Code</p>
                </div>
              </div>
              <LanguageSelector language={language} onSelect={handleLanguageChange} />
            </div>
            <div className="flex-1 w-full bg-white dark:bg-slate-900 relative min-h-[300px]">
              <CodeEditor
                language={language}
                value={code}
                onChange={(val) => setCode(val || '')}
              />
            </div>
          </div>

          {/* Draggable Divider */}
          <div 
            className="hidden lg:flex w-6 cursor-col-resize items-center justify-center group z-20"
            onMouseDown={startDrag}
          >
            <div className="w-1.5 h-16 bg-slate-200 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
          </div>

          {/* Right Panel: Output */}
          <div style={{ width: `calc(${100 - leftWidth}% - 1.5rem)` }} className="hidden lg:flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)] overflow-hidden">
            <OutputPanel
              output={output}
              error={error}
              isLoading={isLoading}
              isSimulated={isSimulated}
              onRun={handleRunCode}
            />
          </div>
          
          {/* Mobile Fallback Right Panel */}
          <div className="lg:hidden w-full h-[40vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)] overflow-hidden">
            <OutputPanel
              output={output}
              error={error}
              isLoading={isLoading}
              isSimulated={isSimulated}
              onRun={handleRunCode}
            />
          </div>
        </div>

        {/* SEO Information Section */}
        <div className="mt-12 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/80 dark:border-slate-700/80 shadow-[0_8px_32px_rgba(15,23,42,0.04)] text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          <h3 className="font-extrabold text-slate-900 dark:text-slate-100 mb-3 text-lg">CodeLens Free Online Compiler & IDE</h3>
          <p className="mb-4">
            Welcome to the ultimate <strong>Online Code Editor</strong> and <strong>Online Compiler</strong>. Designed for developers, students, and educators, this powerful <strong>online IDE</strong> allows you to write, compile, and run code instantly directly from your browser. No downloads or complex local setups are required.
          </p>
          <p className="mb-4">
            Whether you are testing an algorithm in Python, writing competitive programming logic in C++, or building scripts in JavaScript, our <strong>online code playground</strong> provides an intuitive, high-performance environment. The editor is powered by the same underlying technology as VS Code, providing intelligent syntax highlighting, auto-completion, and a clean interface.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Supported Languages</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instantly switch between JavaScript, Python, Java, C++, C, and many more. Our <strong>multi-language compiler</strong> handles real-time execution flawlessly.
              </p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">Run Code Instantly</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click <strong>Run Code</strong> to execute your logic securely in the cloud. Review your output, catch compilation errors, and iterate quickly with our seamless output console.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}



