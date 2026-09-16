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
    name: "Code Compare Studio",
    shortDescription: "Side-by-side & inline code diff comparison with Monaco Engine.",
    description: "Professional diff comparison tool supporting side-by-side and inline unified views, syntax highlighting for 13+ languages, and dual 5MB file upload.",
    category: "Code & Diff",
    route: "/tools/code-compare",
    iconName: "Code2",
    status: "active",
    tags: ["diff", "compare", "monaco", "code", "side-by-side", "git"],
  },
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    shortDescription: "Pretty print JSON with custom indentation and schema validation.",
    description: "Format raw JSON with 2-space, 4-space, or tab indentations and instant error line pinpointing.",
    category: "JSON",
    route: "/tools/json-formatter",
    iconName: "Braces",
    status: "planned",
    tags: ["json", "formatter", "pretty-print", "schema"],
  },
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    shortDescription: "Decode headers, payload, and verify signatures for JSON Web Tokens.",
    description: "Inspect JWT claims, expiration timestamps, and signature verification without transmitting secrets.",
    category: "Encoders",
    route: "/tools/jwt-decoder",
    iconName: "KeyRound",
    status: "planned",
    tags: ["jwt", "auth", "token", "decoder", "base64"],
  },
  {
    id: "sql-formatter",
    name: "SQL Query Formatter",
    shortDescription: "Format and beautify complex SQL queries across major dialects.",
    description: "Format SQL queries with support for PostgreSQL, MySQL, SQLite, and T-SQL keywords.",
    category: "Formatters",
    route: "/tools/sql-formatter",
    iconName: "Database",
    status: "planned",
    tags: ["sql", "database", "formatter", "query"],
  },
  {
    id: "regex-tester",
    name: "Regex Tester & Debugger",
    shortDescription: "Test regular expressions with real-time match highlighting.",
    description: "Test JavaScript and Python regex patterns against test strings with group captures.",
    category: "Converters",
    route: "/tools/regex-tester",
    iconName: "Regex",
    status: "planned",
    tags: ["regex", "pattern", "tester", "match"],
  },
];
