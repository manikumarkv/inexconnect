<!-- LinkedIn · scheduled 2026-12-21 · source: apps/blog/src/content/posts/ai-cost-and-latency.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->
AI cost and latency: what drives them and how to cut them

You pay per token and wait per token. See what an LLM request really costs, what makes it slow, and the levers that cut both without hurting quality.

Key takeaways:
→ Cost is tokens in times the input price plus tokens out times the output price. Output tokens cost five times more than input on current Claude models.
→ Latency comes mostly from model size and how many tokens the model must read and write. Time to first token and total time are different numbers.
→ The biggest levers are the smallest model that passes your evals, shorter prompts and answers, prompt caching and the Batch API.
→ Streaming doesn't make a request cheaper or finish sooner, but users see the answer start much earlier.

Q: Why do long answers cost so much?
A: On current Claude models, output tokens cost five times as much as input tokens. The model also writes output one token at a time, so a long answer is both the most expensive and the slowest part of a request.

Full guide: https://inexconnect.com/blog/ai-cost-and-latency?utm_source=linkedin&utm_medium=social&utm_campaign=blog

#AI #Claude #SoftwareDevelopment #AIEngineering
