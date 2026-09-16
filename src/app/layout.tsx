import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://devstudio-tools.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "CodeLens — Online Code Inspection & Developer Suite",
    template: "%s | CodeLens",
  },
  description:
    "Free, high-performance developer productivity suite featuring Online JSON Viewer, Beautifier, Tree Inspector, and Monaco Code Compare Studio with 5MB file validation.",
  icons: {
    icon: "/favicon-light.png",
    shortcut: "/favicon-light.png",
    apple: "/logo-dark-small.jpg",
  },
  keywords: [
    "online json viewer",
    "json viewer online",
    "json beautifier",
    "json formatter",
    "json minifier",
    "json tree inspector",
    "json path copy",
    "json validator",
    "code compare online",
    "code diff tool",
    "monaco diff editor",
    "side by side code diff",
    "compare text online",
    "developer utilities",
    "online dev tools",
    "free developer suite",
    "CodeLens",
  ],
  authors: [{ name: "CodeLens Team", url: APP_URL }],
  creator: "CodeLens Product Team",
  publisher: "CodeLens",
  applicationName: "CodeLens Developer Suite",
  referrer: "origin-when-cross-origin",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: "CodeLens — Online Code Inspection & Developer Suite",
    description:
      "Free high-performance developer utilities: Online JSON Viewer & Inspector and Monaco Code Compare Studio with 5MB file validation.",
    siteName: "CodeLens",
    images: ["/logo-large.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeLens — Developer Tools Suite",
    description:
      "Free online developer utilities: JSON Viewer, Beautifier, Minifier, Tree Inspector & Monaco Code Compare.",
    creator: "@codelens",
    images: ["/logo-large.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const globalJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#organization`,
      name: "CodeLens",
      url: APP_URL,
      logo: `${APP_URL}/logo-large.jpg`,
      sameAs: ["https://twitter.com/codelens"],
    },
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: "CodeLens — Developer Tools Suite",
      publisher: { "@id": `${APP_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${APP_URL}/tools/json-viewer?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
