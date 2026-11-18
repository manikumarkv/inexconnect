import { z } from "zod";

/**
 * MCP servers we build and publish — shown at /mcps and /mcps/<slug>.
 * Data-driven like content/site.ts: adding a server here creates its pages.
 * Facts for TrueIcon are taken from its README (github.com/manikumarkv/trueicon).
 */

const mcpSchema = z.object({
  slug: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  status: z.enum(["live", "in-development"]),
  statusLabel: z.string(),
  transport: z.enum(["stdio", "remote"]),
  github: z.string().url(),
  npmPackage: z.string().optional(),
  /** Hosted endpoint URL — set when a remote version ships; enables live connect steps. */
  connectUrl: z.string().url().optional(),
  points: z.array(z.string()).min(1),
  tools: z.array(z.object({ name: z.string(), description: z.string() })).min(1),
  /** Real recorded example calls/results for the "Try it" section. */
  examples: z.array(
    z.object({ title: z.string(), call: z.string(), result: z.string() }),
  ),
  /** Per-client install instructions; `code` renders with a copy button. */
  clients: z.array(
    z.object({
      name: z.string(),
      steps: z.array(z.string()).min(1),
      code: z.object({ label: z.string(), text: z.string() }).optional(),
    }),
  ),
});

export type McpServer = z.infer<typeof mcpSchema>;

export const mcpServers: McpServer[] = z.array(mcpSchema).parse([
  {
    slug: "trueicon",
    name: "TrueIcon MCP",
    tagline: "Icon search for AI coding assistants — exact, version-correct imports.",
    description:
      "AI assistants often guess icon names — an icon that never existed, one renamed a few releases ago, or one from a different library — and you find out when the build fails. TrueIcon closes that gap: it reads which icon packages and versions your project actually uses, indexes every icon in those exact versions, and answers searches with real icon names, import paths, and a ready-to-paste import line.",
    status: "live",
    statusLabel: "Live · on npm",
    transport: "stdio",
    github: "https://github.com/manikumarkv/trueicon",
    npmPackage: "trueicon",
    points: [
      "Searches 24 icon libraries — Lucide, Heroicons, React Icons, Phosphor, Tabler, Iconoir, Fluent UI, Carbon, Ant Design, MUI, Radix, Remix, Font Awesome, plus Vue and Svelte variants",
      "Version-correct: results are guaranteed to exist in the version your project has installed",
      "Zero config — it detects your project's icon packages and versions on its own",
      "Optional semantic search (fully local) for concept queries like “remove background”",
      "Runs entirely on your machine; no data leaves it",
    ],
    tools: [
      {
        name: "search_icons",
        description:
          "Search the index and get ranked matches with import statements — e.g. “trash” in lucide returns Trash, Trash2, Delete, each with its ready-to-paste import line. Filter by provider, version, style, or set; small typos are tolerated.",
      },
      {
        name: "get_icon",
        description:
          "Get the full record for an icon whose name you already know — import name, path, version, style, keywords, and the icon's SVG markup.",
      },
      {
        name: "list_providers",
        description:
          "Show which project directory TrueIcon is reading, the icon providers your project uses with their resolved versions, and every provider it supports.",
      },
      {
        name: "ping",
        description: "Health check — confirms the server is up and responding.",
      },
    ],
    examples: [
      {
        title: "Search for a trash icon in Lucide",
        call: `{ "query": "trash", "provider": "lucide", "limit": 3 }`,
        result: `Trash    → import { Trash } from 'lucide-react';
Trash2   → import { Trash2 } from 'lucide-react';
Delete   → import { Delete } from 'lucide-react';`,
      },
      {
        title: "Get one icon's full record",
        call: `{ "name": "Trash2", "provider": "lucide" }`,
        result: `import { Trash2 } from 'lucide-react';
keywords: trash, delete, remove, bin, garbage, rubbish
(+ the icon's SVG markup)`,
      },
    ],
    clients: [
      {
        name: "Claude Code",
        steps: [
          "Run this command from your project directory (Node.js 20 or newer):",
          "Ask your assistant for an icon — TrueIcon finds your project's icon packages on its own.",
        ],
        code: { label: "Terminal", text: "claude mcp add trueicon -- npx -y trueicon" },
      },
      {
        name: "Claude Desktop",
        steps: [
          "Open claude_desktop_config.json (macOS: ~/Library/Application Support/Claude/, Windows: %APPDATA%\\Claude\\).",
          "Add the entry below, with your project's absolute path, then restart Claude Desktop.",
        ],
        code: {
          label: "claude_desktop_config.json",
          text: `{
  "mcpServers": {
    "trueicon": {
      "command": "npx",
      "args": ["-y", "trueicon"],
      "env": {
        "TRUEICON_PROJECT_DIR": "/absolute/path/to/your/project"
      }
    }
  }
}`,
        },
      },
      {
        name: "VS Code",
        steps: ["Create .vscode/mcp.json in your project and add the entry below."],
        code: {
          label: ".vscode/mcp.json",
          text: `{
  "servers": {
    "trueicon": {
      "command": "npx",
      "args": ["-y", "trueicon"],
      "env": {
        "TRUEICON_PROJECT_DIR": "\${workspaceFolder}"
      }
    }
  }
}`,
        },
      },
      {
        name: "Cursor",
        steps: [
          "Create .cursor/mcp.json in your project and add the entry below (same shape as Claude Desktop, under “mcpServers”).",
        ],
        code: {
          label: ".cursor/mcp.json",
          text: `{
  "mcpServers": {
    "trueicon": {
      "command": "npx",
      "args": ["-y", "trueicon"],
      "env": {
        "TRUEICON_PROJECT_DIR": "\${workspaceFolder}"
      }
    }
  }
}`,
        },
      },
    ],
  },
  {
    slug: "imageright",
    name: "ImageRight MCP",
    tagline: "A version-aware MCP server for Vertafore ImageRight, the insurance document system.",
    description:
      "ImageRight's APIs change shape across versions 24, 25, and 7.2, across both REST and SOAP. This server gives AI tools a safe way to work with it: an explorer that knows every endpoint and error code per version, a client that builds the right request shape for the version in use, and high-level workflow tools for multi-step jobs — with a dry-run mode that shows exactly what would happen before anything is sent.",
    status: "in-development",
    statusLabel: "In development",
    transport: "stdio",
    github: "https://github.com/manikumarkv/imageright-mcp",
    points: [
      "Covers ImageRight 24 / 25 / 7.2 — REST v1 and v2 plus the SOAP services",
      "Custom error catalog: ImageRight error codes explained in plain language",
      "Dry-run mode previews requests before anything touches a live system",
      "Workflow tools chain multi-step jobs (find the file, resolve its drawer and type, then act)",
    ],
    tools: [
      {
        name: "API explorer tools",
        description:
          "Search the ImageRight API catalog — endpoints, operations, and error codes — filtered by the exact version in use.",
      },
      {
        name: "Version-aware client tools",
        description:
          "Call REST and SOAP operations with the request shape that version expects, with credentials kept in the server's own configuration, never in the chat.",
      },
      {
        name: "Workflow tools",
        description:
          "High-level, multi-step flows that resolve names to the IDs ImageRight needs (workflows, steps, drawers, document types) and then carry out the job — in dry-run first, if you ask.",
      },
    ],
    examples: [],
    clients: [],
  },
]);
