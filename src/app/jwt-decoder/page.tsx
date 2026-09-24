import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FluidCanvas } from "@/components/ui/FluidCanvas";
import { JwtDecoderFeature } from "@/features/jwt-decoder/JwtDecoderFeature";
import { APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Online JWT Decoder & Claims Inspector – Free | CodeLens",
  description:
    "CodeLens Online JWT Decoder is a free tool to decode, inspect, and parse JSON Web Tokens (JWT) online. View color-coded header, payload claims, expiration timestamps, and signature structure safely in browser.",
  keywords: [
    "CodeLens JWT decoder",
    "online jwt decoder",
    "jwt decoder online",
    "jwt debugger online",
    "decode jwt token",
    "parse json web token",
    "jwt token inspector",
    "jwt claims viewer",
    "jwt expiration checker",
    "oauth2 token decoder",
    "oidc token inspector",
    "jwt header payload viewer",
    "free jwt decoder tool",
    "browser side jwt decoder",
  ],
  alternates: {
    canonical: `${APP_URL}/jwt-decoder`,
  },
  openGraph: {
    title: "Free Online JWT Decoder & Inspector — CodeLens",
    description:
      "Decode and inspect JSON Web Tokens (JWT) online for free. Color-coded header, payload claims, and expiration date converter.",
    url: `${APP_URL}/jwt-decoder`,
    siteName: "CodeLens",
    images: [`${APP_URL}/logo-large.jpg`],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online JWT Decoder & Claims Inspector — CodeLens",
    description:
      "Decode, inspect, and validate JSON Web Tokens (JWT) online with client-side privacy.",
    images: [`${APP_URL}/logo-large.jpg`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["SoftwareApplication", "WebApplication"],
      "@id": `${APP_URL}/jwt-decoder/#webapp`,
      name: "CodeLens Online JWT Decoder",
      url: `${APP_URL}/jwt-decoder`,
      description:
        "Free online JWT decoder tool to parse, inspect, and analyze JSON Web Token headers, payload claims, and expiration timestamps.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/jwt-decoder/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I decode a JWT token online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Paste your encoded JSON Web Token (JWT) into the input box. CodeLens automatically splits it into Header, Payload, and Signature, decoding base64url data live in your browser.",
          },
        },
        {
          "@type": "Question",
          name: "Is my JWT token transmitted to any server?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. All JWT parsing and Base64URL decoding is executed 100% locally in your client web browser. No token data or secrets leave your device.",
          },
        },
        {
          "@type": "Question",
          name: "How does CodeLens parse JWT expiration timestamps?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "CodeLens automatically converts Unix epoch timestamps for claims like exp (Expires At), iat (Issued At), and nbf (Not Before) into human-readable local dates and remaining active durations.",
          },
        },
      ],
    },
  ],
};

export default function JwtDecoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500/20 selection:text-indigo-900 relative">
        <FluidCanvas />
        <Navbar />

        <main className="flex-1 max-w-[1750px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-10 space-y-12 relative z-10">
          <JwtDecoderFeature />

          {/* Educational SEO & Guide Section */}
          <section className="liquid-glass-surface p-6 sm:p-10 space-y-8">
            <span className="lens-sheen" />
            <div className="max-w-3xl space-y-3">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-sans">
                What is a JSON Web Token (JWT)?
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-mono font-extrabold text-indigo-600 uppercase">
                  1. Header
                </span>
                <h3 className="text-sm font-bold text-slate-950 font-sans">
                  Algorithm & Token Type
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Contains metadata about the token, such as the signing algorithm (e.g., HS256, RS256) and token type (`JWT`).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-mono font-extrabold text-emerald-600 uppercase">
                  2. Payload
                </span>
                <h3 className="text-sm font-bold text-slate-950 font-sans">
                  Claims & Identity Data
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Contains statements about an entity (typically user identity, roles, permissions) and metadata claims like `exp` and `iat`.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-slate-200/90 shadow-2xs space-y-2">
                <span className="text-xs font-mono font-extrabold text-rose-600 uppercase">
                  3. Signature
                </span>
                <h3 className="text-sm font-bold text-slate-950 font-sans">
                  Integrity Verification
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-sans">
                  Used to verify the sender of the JWT and to ensure that the message wasn&apos;t changed along the way.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
