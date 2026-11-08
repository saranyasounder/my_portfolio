const ROOTCAUSE_POST = {
  slug: "rootcause-devdiary",
  projectId: "rootcause",
  projectTitle: "RootCause",
  title: "Perfect Retrieval Scores, Wrong Answer: How a Chunk Boundary Broke My RAG System",
  date: "Oct 2026",
  readTime: "7 min read",
  tags: ["RAG", "pgvector", "PostgreSQL", "FastAPI", "Evaluation", "Claude API"],
  excerpt: "RootCause is a troubleshooting assistant over a 155-page Dell PowerEdge service manual. My evaluation harness said retrieval was perfect, yet the assistant kept refusing questions the manual clearly answered. Here is how I traced it to a chunk boundary, fixed it with neighbor-chunk expansion, and took fully answered questions from 8/11 to 11/11.",
  sections: [
    { type: "h2", content: "Why I built this" },
    { type: "p", content: "Equipment service manuals are long, dense, and written for reference, not for answering questions. When a server throws an error, nobody wants to scroll through 155 pages to find the one table that explains it. I wanted an assistant that could answer troubleshooting questions straight from the manual and show exactly which page every answer came from." },
    { type: "p", content: "Citations were the whole point. In equipment support a confident wrong answer is worse than no answer. If the assistant cannot point to the page, it should not be making the claim." },

    { type: "h2", content: "Two kinds of questions, two kinds of search" },
    { type: "callout", variant: "struggle", label: "The Problem", content: "Some questions are exact: what does this error code mean? Others are open ended: why will the server not power on after a memory swap? Semantic search is fuzzy on exact codes, and keyword search misses questions phrased differently from the manual. One retrieval strategy could not handle both." },
    { type: "p", content: "So RootCause starts with a query router. Questions with an explicit error code skip semantic search entirely and go to an exact SQL lookup, because a code either matches or it does not. Everything else goes to hybrid search: pgvector semantic search and Postgres full text search run side by side, and the two rankings are merged with Reciprocal Rank Fusion." },
    {
      type: "code",
      content: `# Reciprocal Rank Fusion
# A chunk that ranks well in BOTH searches rises to the top.
score(chunk) = sum over each ranker r of  1 / (k + rank_r(chunk))

# k is a constant (commonly 60) so a single #1 rank
# cannot dominate the fused list`,
    },
    { type: "p", content: "The top chunks go to Claude along with their page numbers, and every answer cites its pages. If the retrieved context does not support an answer, the model is expected to say so instead of guessing." },

    { type: "h2", content: "Measuring it instead of eyeballing it" },
    { type: "p", content: "I hand labeled 28 questions and built an evaluation harness that scores each stage separately: whether the router sent the question down the right path, whether retrieval found the right page, and whether the final answer was faithful to the cited text or correctly abstained. An LLM judge scored the answers." },
    { type: "callout", variant: "victory", label: "The Numbers", content: "Routing accuracy: 92.9 percent. Retrieval: hit@5 of 1.0 and MRR of 0.93, meaning the right page was always in the top five and usually first." },

    { type: "h2", content: "The bug: a refusal that made no sense" },
    { type: "callout", variant: "struggle", label: "The Bigger Problem", content: "Retrieval was perfect, but some answers were refusals. The assistant said the manual did not cover a question even though the right page had been retrieved. A perfect hit@5 next to a wrong refusal meant the failure was somewhere between retrieval and generation." },
    { type: "p", content: "I stopped looking at the scores and inspected the context that was actually saved and sent to the model. The relevant passage had been split across two chunks. The retrieved chunk held the setup of the procedure, and the steps that actually answered the question sat in the next chunk, which was never retrieved." },
    { type: "p", content: "The model was right to refuse given what it saw. The pipeline was what failed. This is why retrieval metrics alone are not enough: finding the right page and giving the model the answer are two different claims." },

    { type: "h2", content: "The fix: neighbor-chunk expansion" },
    { type: "p", content: "After retrieval, each top chunk now brings its immediate neighbors from the same section of the manual. That restores passages chunking cut in half, without re-chunking the whole manual or making every chunk bigger and noisier." },
    { type: "p", content: "Then I re-ran the evaluation set to confirm the fix worked and did not break anything else." },
    { type: "callout", variant: "victory", label: "The Result", content: "Fully answered questions went from 8/11 to 11/11. Judge-rated faithful answers went from 7/11 to 9/11." },

    { type: "h2", content: "What I mastered" },
    { type: "callout", variant: "tip", label: "Key Takeaway", content: "Evaluate every stage, not just the final answer. A perfect retrieval score can hide a broken system. Without stage-by-stage evaluation, this bug would have looked like the model being cautious, not a pipeline defect with a concrete fix. When something fails, inspect what the model actually saw before blaming the model." }
  ],
};
