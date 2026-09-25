import React from 'react';
import { Terminal, Play, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface OutputPanelProps {
  output: string;
  error: string;
  isLoading: boolean;
  isSimulated?: boolean;
  onRun: () => void;
}

export default function OutputPanel({ output, error, isLoading, isSimulated, onRun }: OutputPanelProps) {
  const isError = Boolean(error);
  const isSuccess = Boolean(output) && !isError;

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden relative">
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center text-slate-700 dark:text-slate-300 font-extrabold text-sm">
          <Terminal className="w-4 h-4 mr-2" />
          Output
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onRun}
            disabled={isLoading}
            className="flex items-center px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded-md font-medium text-sm transition-all shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" fill="currentColor" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 font-mono text-sm overflow-auto relative">
        <div className="pt-2">
          {isLoading ? (
            <div className="text-slate-500 dark:text-slate-400 animate-pulse mt-4">Executing code...</div>
          ) : error ? (
            <div className="text-red-600 dark:text-red-400 whitespace-pre-wrap">{error}</div>
          ) : output ? (
            <div className="text-slate-800 dark:text-slate-200 whitespace-pre-wrap">{output}</div>
          ) : (
            <div className="text-slate-400 italic mt-8 text-center flex items-center justify-center">
              Click "Run Code" to see the output here.
            </div>
          )}
        </div>
      </div>
      
      {isSimulated && (
        <div className="px-4 py-2 bg-amber-50 dark:bg-amber-900/10 border-t border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-200 text-[11px] font-medium flex items-center">
          <AlertCircle className="w-3 h-3 mr-2 shrink-0" />
          <span>Note: This is a simulated output. The public execution server is currently unreachable.</span>
        </div>
      )}
    </div>
  );
}


