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
    name: "Online Code Compare",
    shortDescription: "Free Online Code Compare tool with side-by-side & inline Monaco diff viewer.",
    description: "Professional Online Code Compare tool supporting side-by-side and inline unified diffs, syntax highlighting for 13+ programming languages, dual 5MB file upload, and browser privacy.",
    category: "Code & Diff",
    route: "/tools/code-compare",
    iconName: "Code2",
    status: "active",
    tags: [
      "online code compare",
      "compare code online",
      "code compare",
      "diff checker",
      "monaco diff editor",
      "side-by-side diff",
      "code diff tool",
      "git diff",
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
];

