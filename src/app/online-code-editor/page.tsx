import { Metadata } from "next";
import ClientPage from "./ClientPage";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online Code Editor & Compiler – Free IDE | CodeLens",
  description:
    "Free online code editor and compiler. Write, run, and execute code in Javascript, Python, Java, C++, and C instantly in your browser with our fast, lightweight IDE.",
  keywords: [
    "online code editor",
    "online compiler",
    "run python online",
    "run javascript online",
    "run c++ online",
    "browser IDE",
    "free online IDE",
    "coding playground",
    "CodeLens online editor",
    "developer tools online",
  ],
  alternates: {
    canonical: `${APP_URL}/online-code-editor`,
  },
  openGraph: {
    title: "Free Online Code Editor & Compiler — CodeLens",
    description:
      "Write, run, and compile code in Python, JavaScript, C++, and more directly in your browser. Fast, free, and secure.",
    url: `${APP_URL}/online-code-editor`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Code Editor & Compiler — CodeLens",
    description: "Write and execute Python, JS, and C++ code instantly in your browser.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/online-code-editor/#webapp`,
      name: "CodeLens Online Code Editor",
      url: `${APP_URL}/online-code-editor`,
      description:
        "Free online code editor and compiler for Python, JavaScript, Java, C, and C++.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    }
  ],
};

export default function OnlineCodeEditorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <ClientPage />
    </>
  );
}
