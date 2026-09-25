"use client";

import * as React from "react";
import { loader } from "@monaco-editor/react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";

// Configure Monaco Loader once on client to prevent runtime script injection warnings
if (typeof window !== "undefined") {
  loader.config({
    paths: {
      vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs",
    },
  });
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <NextTopLoader color="#4f46e5" showSpinner={false} />
      {children}
    </ThemeProvider>
  );
}
