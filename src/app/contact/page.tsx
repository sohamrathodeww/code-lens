import { Metadata } from "next";
import ClientPage from "./ClientPage";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us | CodeLens",
  description:
    "Get in touch with the CodeLens team for support, feature requests, or business inquiries.",
  keywords: [
    "contact codelens",
    "codelens support",
    "developer tools contact",
    "codelens inquiries",
  ],
  alternates: {
    canonical: `${APP_URL}/contact`,
  },
  openGraph: {
    title: "Contact Us | CodeLens",
    description: "Get in touch with the CodeLens team for support, feature requests, or business inquiries.",
    url: `${APP_URL}/contact`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | CodeLens",
    description: "Get in touch with the CodeLens team.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

export default function ContactPage() {
  return <ClientPage />;
}
