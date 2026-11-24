<!-- X thread · scheduled 2027-01-11 · source: apps/blog/src/content/posts/first-llm-api-call.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->

### Post 1 (61/280)

Your first LLM API call: talk to Claude from your own code 🧵👇

### Post 2 (127/280)

1/ An LLM API call is an HTTPS request with JSON inside. You send a list of messages, and the model sends back one new message.

### Post 3 (115/280)

2/ Keep your API key in an environment variable or a git-ignored .env file. Never put it in your code or commit it.

### Post 4 (127/280)

3/ The response tells you why the model stopped (stop_reason) and how many tokens it used (usage). Tokens are what you pay for.

### Post 5 (113/280)

4/ The API remembers nothing between calls. To hold a conversation, your code sends the whole history every time.

### Post 6 (66/280)

Full write-up, with examples:
https://inexconnect.com/blog/first-llm-api-call?utm_source=x&utm_medium=social&utm_campaign=blog

#AI #Claude
