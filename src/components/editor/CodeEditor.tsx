import React from 'react';
import { useTheme } from 'next-themes';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  const { theme } = useTheme();
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <Editor
        height="100%"
        language={language === 'c' || language === 'cpp' ? 'cpp' : language}
        value={value}
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          formatOnPaste: true,
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
        }}
        loading={
          <div className="flex items-center justify-center h-full text-slate-500 bg-[#1e1e1e]/5 rounded-xl font-mono text-sm">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-transparent border-t-indigo-600 border-l-indigo-600 mr-3"></div>
            Loading Editor...
          </div>
        }
      />
    </div>
  );
}


