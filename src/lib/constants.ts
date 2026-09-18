const getCanonicalUrl = (): string => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl && !envUrl.includes("onrender.com")) {
    return envUrl.replace(/\/$/, "");
  }
  return "https://codelens-dev.vercel.app";
};

export const APP_URL = getCanonicalUrl();

export const SITE_NAME = "CodeLens";
export const SITE_TAGLINE = "Online Code Inspection & Developer Suite";
export const SITE_DESCRIPTION =
  "Free, high-performance developer productivity suite featuring Online JSON Viewer, Beautifier, Tree Inspector, Flow Chart Diagram Visualizer, and Online Code Compare.";

export const DEFAULT_KEYWORDS = [
  "CodeLens",
  "CodeLens online",
  "Online Code Compare",
  "online code compare",
  "compare code online",
  "code compare online tool",
  "free online code compare",
  "side by side code compare",
  "online code diff tool",
  "code diff checker online",
  "monaco diff editor online",
  "free code comparison tool",
  "compare text files online",
  "javascript code compare online",
  "python code compare online",
  "sql diff viewer online",
  "json code compare online",
  "git diff viewer online",
  "browser based code review",
  "CodeLens JSON viewer",
  "online developer tools",
  "developer productivity tools",
  "free developer suite",
  "free json viewer",
  "online json viewer",
  "json beautifier",
  "json formatter online",
  "json minifier",
  "json tree inspector",
  "json validator",
  "developer utilities",
  "online dev tools",
];
