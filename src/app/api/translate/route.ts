import { NextResponse } from "next/server";

interface TranslateRequestBody {
  text: string;
  source?: string;
  target: string;
}

const MAX_ALLOWED_CHARACTERS = 5000;
const MAX_CHUNK_LENGTH = 3000;

/**
 * Helper to split long text into natural paragraph/sentence chunks
 */
function splitTextIntoChunks(text: string, maxLength: number): string[] {
  if (text.length <= maxLength) return [text];

  const chunks: string[] = [];
  let remaining = text;

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }

    // Try splitting by paragraph break first
    let splitIndex = remaining.lastIndexOf("\n", maxLength);
    
    // If no paragraph break found, split by sentence end (. ! ?)
    if (splitIndex < maxLength * 0.3) {
      const match = remaining.substring(0, maxLength).match(/[\s\S]*[.!?](?=\s|$)/);
      if (match) {
        splitIndex = match[0].length;
      }
    }

    // Fall back to space break
    if (splitIndex < maxLength * 0.3) {
      splitIndex = remaining.lastIndexOf(" ", maxLength);
    }

    // Hard fallback if no break found
    if (splitIndex <= 0) {
      splitIndex = maxLength;
    }

    chunks.push(remaining.substring(0, splitIndex));
    remaining = remaining.substring(splitIndex).trimStart();
  }

  return chunks;
}

/**
 * Primary Engine: Google Translate AT Engine (translate.google.com)
 */
async function translateWithGoogleAT(text: string, source: string, target: string) {
  const url = `https://translate.google.com/translate_a/single?client=at&sl=${encodeURIComponent(
    source
  )}&tl=${encodeURIComponent(target)}&hl=en&dt=t&dt=bd&dt=qc&dt=rm&dt=ex&dt=at&dt=ss&dt=rw&dt=ld&q=${encodeURIComponent(
    text
  )}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://translate.google.com/",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Google AT API error: HTTP status ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error("Invalid response structure from Google AT API");
  }

  let translatedText = "";
  for (const part of data[0]) {
    if (Array.isArray(part) && typeof part[0] === "string") {
      translatedText += part[0];
    }
  }

  let detectedSource = source;
  if (typeof data[2] === "string") {
    detectedSource = data[2];
  } else if (Array.isArray(data[8]) && Array.isArray(data[8][0]) && typeof data[8][0][0] === "string") {
    detectedSource = data[8][0][0];
  }

  return { translatedText, detectedSource };
}

/**
 * Secondary Engine: Google Clients5 Chrome Extension Endpoint
 */
async function translateWithGoogleClients5(text: string, source: string, target: string) {
  const url = `https://clients5.google.com/translate_a/single?client=dict-chrome-ex&sl=${encodeURIComponent(
    source
  )}&tl=${encodeURIComponent(target)}&hl=en&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Google Clients5 API error: HTTP status ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error("Invalid response structure from Google Clients5 API");
  }

  let translatedText = "";
  for (const part of data[0]) {
    if (Array.isArray(part) && typeof part[0] === "string") {
      translatedText += part[0];
    }
  }

  let detectedSource = source;
  if (typeof data[2] === "string") {
    detectedSource = data[2];
  } else if (Array.isArray(data[8]) && Array.isArray(data[8][0]) && typeof data[8][0][0] === "string") {
    detectedSource = data[8][0][0];
  }

  return { translatedText, detectedSource };
}

/**
 * Tertiary Engine: Google GTX Fallback Engine
 */
async function translateWithGoogleGTX(text: string, source: string, target: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
    source
  )}&tl=${encodeURIComponent(target)}&hl=en&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Google GTX API error: HTTP status ${res.status}`);
  }

  const data = await res.json();
  if (!Array.isArray(data) || !Array.isArray(data[0])) {
    throw new Error("Invalid response structure from Google GTX API");
  }

  let translatedText = "";
  for (const part of data[0]) {
    if (Array.isArray(part) && typeof part[0] === "string") {
      translatedText += part[0];
    }
  }

  let detectedSource = source;
  if (typeof data[2] === "string") {
    detectedSource = data[2];
  } else if (Array.isArray(data[8]) && Array.isArray(data[8][0]) && typeof data[8][0][0] === "string") {
    detectedSource = data[8][0][0];
  }

  return { translatedText, detectedSource };
}

export async function POST(req: Request) {
  try {
    const body: TranslateRequestBody = await req.json();
    const { text, source = "auto", target } = body;

    if (!text || typeof text !== "string" || !text.trim()) {
      return NextResponse.json({ error: "Text to translate is required" }, { status: 400 });
    }

    if (text.length > MAX_ALLOWED_CHARACTERS) {
      return NextResponse.json(
        {
          error: `Text exceeds the maximum allowed limit of ${MAX_ALLOWED_CHARACTERS.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    if (!target || typeof target !== "string") {
      return NextResponse.json({ error: "Target language code is required" }, { status: 400 });
    }

    const providers = [
      { name: "Google AT Engine", fn: translateWithGoogleAT },
      { name: "Google Clients5 Engine", fn: translateWithGoogleClients5 },
      { name: "Google GTX Engine", fn: translateWithGoogleGTX },
    ];

    let currentProviderIdx = 0;
    let lastError: any = null;

    const chunks = splitTextIntoChunks(text, MAX_CHUNK_LENGTH);

    // Seamless failover across Google engines
    while (currentProviderIdx < providers.length) {
      const provider = providers[currentProviderIdx];
      try {
        const translatedChunks: string[] = [];
        let detectedSourceLanguage = source;

        for (const chunk of chunks) {
          const result = await provider.fn(chunk, source, target);
          translatedChunks.push(result.translatedText);
          if (result.detectedSource && result.detectedSource !== "auto") {
            detectedSourceLanguage = result.detectedSource;
          }
        }

        const fullTranslation = translatedChunks.join(chunks.length > 1 && text.includes("\n\n") ? "\n\n" : "");

        return NextResponse.json({
          success: true,
          translatedText: fullTranslation,
          detectedSourceLanguage,
          providerUsed: currentProviderIdx,
          chunkCount: chunks.length,
        });
      } catch (err: any) {
        console.warn(`Translation provider ${currentProviderIdx} (${provider.name}) failed:`, err?.message || err);
        lastError = err;
        currentProviderIdx++;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "All translation services are currently experiencing high load. Please try again in a few moments.",
        details: lastError?.message,
      },
      { status: 503 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Internal translation error" },
      { status: 500 }
    );
  }
}


