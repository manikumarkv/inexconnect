<!-- LinkedIn · scheduled 2027-01-11 · source: apps/blog/src/content/posts/first-llm-api-call.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->

Your first LLM API call: talk to Claude from your own code

Get an API key, keep it out of git, and call Claude from Node.js or curl. Then read the response, add a system prompt, stream, and fix common errors.

Key takeaways:
→ An LLM API call is an HTTPS request with JSON inside. You send a list of messages, and the model sends back one new message.
→ Keep your API key in an environment variable or a git-ignored .env file. Never put it in your code or commit it.
→ The response tells you why the model stopped (stop_reason) and how many tokens it used (usage). Tokens are what you pay for.
→ The API remembers nothing between calls. To hold a conversation, your code sends the whole history every time.

Q: Do I need to pay to call the Claude API?
A: Yes. A Claude app subscription doesn't include API access. You buy prepaid credits in the Claude Console, and each call uses them up by the tokens it sends and receives. A short test call costs well under a cent.

Full guide: https://inexconnect.com/blog/first-llm-api-call?utm_source=linkedin&utm_medium=social&utm_campaign=blog

#AI #Claude #SoftwareDevelopment #AIEngineering
