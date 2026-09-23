import React, { useState, useRef, useEffect } from 'react';
import { ALL_LANGUAGES, TOP_LANGUAGES } from '@/lib/languages';
import { FileCode2, ChevronDown } from 'lucide-react';
import { 
  SiJavascript, SiPython, SiCplusplus, SiTypescript, 
  SiC, SiGo, SiRust, SiPhp, SiRuby 
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandCSharp } from 'react-icons/tb';

interface LanguageSelectorProps {
  language: string;
  onSelect: (language: string) => void;
}

const getIcon = (lang: string) => {
  switch (lang) {
    case 'javascript': return <SiJavascript className="w-4 h-4" />;
    case 'typescript': return <SiTypescript className="w-4 h-4" />;
    case 'python': return <SiPython className="w-4 h-4" />;
    case 'java': return <FaJava className="w-4 h-4" />;
    case 'csharp': return <TbBrandCSharp className="w-4 h-4" />;
    case 'cpp': return <SiCplusplus className="w-4 h-4" />;
    case 'c': return <SiC className="w-4 h-4" />;
    case 'go': return <SiGo className="w-4 h-4" />;
    case 'rust': return <SiRust className="w-4 h-4" />;
    case 'php': return <SiPhp className="w-4 h-4" />;
    case 'ruby': return <SiRuby className="w-4 h-4" />;
    default: return <FileCode2 className="w-4 h-4" />;
  }
};

export default function LanguageSelector({ language, onSelect }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLang = ALL_LANGUAGES.find(l => l.name === language);

  return (
    <div className="flex items-center space-x-2 bg-slate-100 p-2 rounded-xl border border-slate-200">
      <div className="flex space-x-2 mr-2 sm:mr-4">
        {TOP_LANGUAGES.map((lang) => (
          <button
            key={lang.name}
            onClick={() => onSelect(lang.name)}
            className={`flex items-center gap-2 pr-4 pl-1.5 py-1.5 rounded-lg transition-all duration-200 ease-in-out text-sm font-semibold
              ${language === lang.name 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
                : 'text-slate-600 hover:text-indigo-600 hover:bg-white/50 border border-transparent'
              }`}
          >
            <div className={`w-7 h-7 rounded flex items-center justify-center
              ${language === lang.name ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-500'}`}
            >
              {getIcon(lang.name)}
            </div>
            {lang.label}
          </button>
        ))}
      </div>
      
      <div className="w-px h-6 bg-slate-300 mx-1 sm:mx-2 hidden sm:block"></div>
      
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 text-sm font-semibold bg-white text-indigo-600 border-slate-200 shadow-sm hover:bg-slate-50"
        >
          {selectedLang ? (
            <>
              <div className="w-7 h-7 rounded flex items-center justify-center bg-indigo-100 text-indigo-700">
                {getIcon(selectedLang.name)}
              </div>
              <span>{selectedLang.label}</span>
            </>
          ) : (
            <>
              <div className="w-7 h-7 rounded flex items-center justify-center bg-slate-200 text-slate-500">
                <FileCode2 className="w-4 h-4" />
              </div>
              <span>Select Language</span>
            </>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
            <div className="max-h-64 overflow-y-auto">
              {ALL_LANGUAGES.map((lang) => {
                const isSelected = language === lang.name;
                return (
                  <button
                    key={lang.name}
                    onClick={() => {
                      onSelect(lang.name);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium transition-colors
                      ${isSelected 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center
                        ${isSelected ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'}`}
                      >
                        {getIcon(lang.name)}
                      </div>
                      {lang.label}
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
