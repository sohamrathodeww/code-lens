import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

export default function CodeEditor({ language, value, onChange }: CodeEditorProps) {
  return (
    <div className="w-full h-full rounded-xl overflow-hidden border border-slate-200 bg-white">
      <Editor
        height="100%"
        language={language === 'c' || language === 'cpp' ? 'cpp' : language}
        value={value}
        theme="light"
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
        }}
        loading={
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mr-3"></div>
            Loading Editor...
          </div>
        }
      />
    </div>
  );
}
