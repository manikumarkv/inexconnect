<!-- LinkedIn · scheduled 2027-01-04 · source: apps/blog/src/content/posts/build-your-first-rag-app.mdx -->
<!-- Review, edit, then post by hand. Mark it posted in calendar.csv. -->

How to build your first RAG app

Build a small Node.js app that answers questions from your Markdown notes: chunk, embed locally, retrieve the best matches and ask Claude with sources.

Key takeaways:
→ A first RAG app fits in four small files. It splits notes into chunks, embeds them locally, finds the closest chunks for a question and sends them to Claude.
→ Indexing and search run on your machine with no API key. Only the final answer needs a call to the Claude API.
→ Tell the model to answer only from the chunks, to cite each source and to say "I don't know". Skip the call when no chunk matches.
→ Test retrieval with a short list of real questions and their expected chunks. Most RAG bugs are search bugs.

Q: Do I need a vector database for this?
A: No. This app keeps its vectors in a JSON file and searches them in memory. That's fine for thousands of chunks. Move to a vector database when you have much more data or need filters and many writers.

Full guide: https://inexconnect.com/blog/build-your-first-rag-app?utm_source=linkedin&utm_medium=social&utm_campaign=blog

#AI #Claude #SoftwareDevelopment #AIEngineering
