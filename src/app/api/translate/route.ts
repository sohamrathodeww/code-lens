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
 * Provider 0: Google GTX Free Translation API
 */
async function translateWithGoogleGTX(text: string, source: string, target: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
    source
  )}&tl=${encodeURIComponent(target)}&dt=t&q=${encodeURIComponent(text)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
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

  const detectedSource = (typeof data[2] === "string" ? data[2] : source) || source;

  return { translatedText, detectedSource };
}

/**
 * Provider 1: MyMemory Free Translation API
 */
async function translateWithMyMemory(text: string, source: string, target: string) {
  const langPair = `${source === "auto" ? "en" : source}|${target}`;
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    text
  )}&langpair=${encodeURIComponent(langPair)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "CodeLens-TranslationTool/1.0",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`MyMemory API error: HTTP status ${res.status}`);
  }

  const data = await res.json();
  if (data.responseStatus !== 200 || !data.responseData?.translatedText) {
    throw new Error(data.responseDetails || "MyMemory translation failed");
  }

  return {
    translatedText: data.responseData.translatedText,
    detectedSource: source === "auto" ? "en" : source,
  };
}

/**
 * Provider 2: Lingva Open-Source Proxy API
 */
async function translateWithLingva(text: string, source: string, target: string) {
  const srcLang = source === "auto" ? "auto" : source;
  const url = `https://lingva.ml/api/v1/${encodeURIComponent(srcLang)}/${encodeURIComponent(
    target
  )}/${encodeURIComponent(text)}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`Lingva API error: HTTP status ${res.status}`);
  }

  const data = await res.json();
  if (!data.translation) {
    throw new Error("Lingva translation empty output");
  }

  return {
    translatedText: data.translation,
    detectedSource: data.info?.detectedSource || source,
  };
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
      { name: "Primary Engine", fn: translateWithGoogleGTX },
      { name: "Secondary Engine", fn: translateWithMyMemory },
      { name: "Tertiary Engine", fn: translateWithLingva },
    ];

    let currentProviderIdx = 0;
    let lastError: any = null;

    const chunks = splitTextIntoChunks(text, MAX_CHUNK_LENGTH);

    // Silent seamless failover across providers
    while (currentProviderIdx < providers.length) {
      const provider = providers[currentProviderIdx];
      try {
        const translatedChunks: string[] = [];
        let detectedSourceLanguage = source;

        for (const chunk of chunks) {
          const result = await provider.fn(chunk, source, target);
          translatedChunks.push(result.translatedText);
          if (result.detectedSource) {
            detectedSourceLanguage = result.detectedSource;
          }
        }

        const fullTranslation = translatedChunks.join(chunks.length > 1 && text.includes("\n\n") ? "\n\n" : " ");

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
