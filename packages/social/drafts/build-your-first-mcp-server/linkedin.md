<!-- LinkedIn · scheduled 2026-12-31 · source: apps/blog/src/content/posts/build-your-first-mcp-server.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->

How to build your first MCP server in TypeScript

Build a small MCP server with two tools in TypeScript, test it with the MCP Inspector, and connect it to Claude Code with one command.

Key takeaways:
→ An MCP server is a small program that tells an AI app which tools it offers and runs them when the AI asks.
→ With the official TypeScript SDK, a tool is a name, a description, an input schema and a function.
→ A local (stdio) server talks to the AI app over stdout, so your logs must go to stderr.
→ Test the server with the MCP Inspector first, then add it to Claude Code with claude mcp add.

Q: Which package do I install to build an MCP server in TypeScript?
A: Install @modelcontextprotocol/server, which is version 2 of the official TypeScript SDK, plus zod for the input schemas. The older @modelcontextprotocol/sdk package is version 1 and only gets fixes now.

Full guide: https://inexconnect.com/blog/build-your-first-mcp-server?utm_source=linkedin&utm_medium=social&utm_campaign=blog

#AI #MCP #ClaudeCode #SoftwareDevelopment #AIEngineering
