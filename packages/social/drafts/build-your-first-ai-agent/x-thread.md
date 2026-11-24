<!-- X thread · scheduled 2026-12-28 · source: apps/blog/src/content/posts/build-your-first-ai-agent.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->
### Post 1  (46/280)

How to build your first AI agent in Node.js 🧵👇

### Post 2  (146/280)

1/ An AI agent is a loop - the model asks for a tool, your code runs it and sends back the result, and this repeats until the model has an answer.

### Post 3  (119/280)

2/ Your code checks stop_reason on every reply - tool_use means run the tools and loop again, anything else means stop.

### Post 4  (126/280)

3/ Start with read-only tools, keep them inside one folder, and cap the number of steps so a confused agent can't run forever.

### Post 5  (108/280)

4/ You can test the whole loop without an API key by swapping in a fake model that returns scripted replies.

### Post 6  (66/280)

Full write-up, with examples:
https://inexconnect.com/blog/build-your-first-ai-agent?utm_source=x&utm_medium=social&utm_campaign=blog

#AI #Claude
