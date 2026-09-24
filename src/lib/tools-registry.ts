export interface ToolDefinition {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  category: "JSON" | "Code & Diff" | "Encoders" | "Formatters" | "Converters";
  route: string;
  iconName: string;
  status: "active" | "planned";
  tags: string[];
}

export const TOOLS_REGISTRY: ToolDefinition[] = [
  {
    id: "json-viewer",
    name: "Online JSON Viewer",
    shortDescription: "Format, minify, inspect tree nodes, and validate JSON payload.",
    description: "Professional JSON inspector featuring beautifier, minifier, tree view node navigation, path copy, and 5MB file upload validation.",
    category: "JSON",
    route: "/json-viewer",
    iconName: "FileJson",
    status: "active",
    tags: ["json", "format", "minify", "tree", "validate", "inspector"],
  },
  {
    id: "json-compare",
    name: "Online JSON Compare",
    shortDescription: "Side-by-side JSON diff with auto-formatting and character tracking.",
    description: "Compare two JSON payloads with side-by-side highlighting. Features automatic formatting to ignore arbitrary whitespaces.",
    category: "JSON",
    route: "/json-compare",
    iconName: "FileJson",
    status: "active",
    tags: [
      "json compare",
      "json diff",
      "compare json",
      "online json compare",
      "json diff checker",
    ],
  },
  {
    id: "code-compare",
    name: "Online Text Compare",
    shortDescription: "Free Online Text Compare tool with side-by-side text & code diff checker.",
    description: "Professional Online Text Compare tool supporting side-by-side diffs, word and line difference highlighting, formatting actions, and complete browser privacy.",
    category: "Code & Diff",
    route: "/code-compare",
    iconName: "Code2",
    status: "active",
    tags: [
      "online text compare",
      "text compare",
      "text compare online",
      "text diff",
      "text difference",
      "code diff",
      "code difference",
      "online code compare",
      "compare code online",
      "diff checker",
      "side-by-side text diff",
      "online diff tool",
      "compare text online",
    ],
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    shortDescription: "Decode headers, payload, and verify signatures for JSON Web Tokens.",
    description: "Inspect JWT claims, expiration timestamps, and signature verification without transmitting secrets.",
    category: "Encoders",
    route: "/jwt-decoder",
    iconName: "KeyRound",
    status: "active",
    tags: ["jwt", "auth", "token", "decoder", "base64"],
  },
  {
    id: "online-translator",
    name: "Online Translator",
    shortDescription: "Accurate multi-language online text translator with auto-fallback engine.",
    description: "Instant free online text translation supporting 100+ languages, auto language detection, side-by-side view, character counter, and multi-engine failover.",
    category: "Converters",
    route: "/translator",
    iconName: "Languages",
    status: "active",
    tags: [
      "online translator",
      "free translator online",
      "text translate",
      "language converter",
      "multi language translator",
      "auto detect language",
    ],
  },
  {
    id: "code-playground",
    name: "Online Code Editor",
    shortDescription: "Write, compile, and execute code in multiple languages online.",
    description: "Professional online code editor supporting syntax highlighting, multiple languages (JavaScript, Python, C++, Java, etc.), and instant cloud execution.",
    category: "Code & Diff",
    route: "/online-code-editor",
    iconName: "Terminal",
    status: "active",
    tags: [
      "online code editor",
      "code playground",
      "compile online",
      "execute code",
      "javascript online",
      "python compiler",
    ],
  },
  {
    id: "currency-converter",
    name: "Online Currency Converter",
    shortDescription: "Real-time exchange rates and multi-currency conversions.",
    description: "Professional online currency converter featuring real-time live exchange rates, historical fallback data, and an intuitive UI for global finance calculations.",
    category: "Converters",
    route: "/currency-converter",
    iconName: "Banknote",
    status: "active",
    tags: [
      "currency converter",
      "exchange rates",
      "online currency converter",
      "live exchange rates",
      "fiat converter",
    ],
  },
];


