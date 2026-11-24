<!-- LinkedIn · scheduled 2027-01-18 · source: apps/blog/src/content/posts/publish-mcp-server.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->
How to publish your MCP server and use it in AI tools

Package a TypeScript MCP server for npm, list it in the official MCP Registry, and add it to Claude Code, Claude Desktop, VS Code and Cursor.

Key takeaways:
→ Publish the code to npm with a bin entry and a shebang, so anyone can start your server with npx -y and the package name.
→ The official MCP Registry stores only metadata. Its server.json points to your npm package, and mcpName in package.json proves you own it.
→ Test the packed tarball with npm pack and the MCP Inspector before you publish anything.
→ Every AI app takes the same command and arguments. Only where you write them, and the JSON key, differ.

Q: Do I have to publish to the MCP Registry?
A: No. People can install your server from npm with one command. The Registry makes it easier to find, because marketplaces and other registries read from it.

Full guide: https://inexconnect.com/blog/publish-mcp-server?utm_source=linkedin&utm_medium=social&utm_campaign=blog

#AI #MCP #ClaudeCode #Claude #GitHubCopilot
