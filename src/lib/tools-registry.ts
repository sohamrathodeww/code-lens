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
    route: "/tools/json-viewer",
    iconName: "FileJson",
    status: "active",
    tags: ["json", "format", "minify", "tree", "validate", "inspector"],
  },
  {
    id: "code-compare",
    name: "Online Text Compare",
    shortDescription: "Free Online Text Compare tool with side-by-side text & code diff checker.",
    description: "Professional Online Text Compare tool supporting side-by-side diffs, word and line difference highlighting, formatting actions, and complete browser privacy.",
    category: "Code & Diff",
    route: "/tools/code-compare",
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
    route: "/tools/jwt-decoder",
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
    route: "/tools/online-translator",
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
    route: "/tools/code-playground",
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
];


