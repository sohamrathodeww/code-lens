export const LANGUAGE_VERSIONS: Record<string, string> = {
  javascript: '18.15.0',
  typescript: '5.0.3',
  python: '3.10.0',
  java: '15.0.2',
  csharp: '6.12.0',
  cpp: '10.2.0',
  c: '10.2.0',
  go: '1.16.2',
  rust: '1.68.2',
  php: '8.2.3',
  ruby: '3.0.1',
};

export const TOP_LANGUAGES = [
  { name: 'javascript', label: 'JavaScript' },
  { name: 'python', label: 'Python' },
  { name: 'java', label: 'Java' },
  { name: 'cpp', label: 'C++' }
];

export const ALL_LANGUAGES = Object.keys(LANGUAGE_VERSIONS).map((lang) => ({
  name: lang,
  label: lang === 'cpp' ? 'C++' : lang === 'csharp' ? 'C#' : lang.charAt(0).toUpperCase() + lang.slice(1)
}));
