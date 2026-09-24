import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { APP_URL, DEFAULT_KEYWORDS } from "@/lib/constants";

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

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "CodeLens — Free Online JSON Viewer, Code Compare & Developer Tools",
    template: "%s | CodeLens",
  },
  description:
    "Free online developer tools suite for JSON inspection, code comparison, API validation, and browser-based productivity workflows for engineers.",
  icons: {
    icon: "/favicon-light.png",
    shortcut: "/favicon-light.png",
    apple: "/logo-dark-small.jpg",
  },
  alternates: {
    canonical: APP_URL,
  },
  verification: {
    google: ["M6Yf023eUnfRIzdRXM51SOlO7XraCE-iKSWq4fI1KWw", "_euwH9UmO-8vxd0LJb4HABnxeuuKY0O3wzskTrFvdCs"],
  },
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: "CodeLens Team", url: APP_URL }],
  creator: "CodeLens Product Team",
  publisher: "CodeLens",
  applicationName: "CodeLens Free Online Developer Tools",
  referrer: "origin-when-cross-origin",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    title: "CodeLens — Free Online JSON Viewer, Code Compare & Developer Tools",
    description:
      "CodeLens helps developers inspect JSON, compare code, validate API payloads, and review files in-browser using high-performance, privacy-first tools.",
    siteName: "CodeLens",
    images: [
      {
        url: `${APP_URL}/logo-large.jpg`,
        width: 1200,
        height: 630,
        alt: "CodeLens Free Online Developer Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CodeLens — Free JSON Viewer & Code Compare Tools",
    description:
      "Free online JSON viewer, code diff tool, and developer utilities for API inspection, code review, and file comparison.",
    creator: "@codelens",
    images: [`${APP_URL}/logo-large.jpg`],
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
        target: `${APP_URL}/json-viewer?q={search_term_string}`,
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
