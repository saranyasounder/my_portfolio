const VERITAS_POST = {
  slug: "llm-eval-devdiary",
  projectId: "llm-evaluator",
  projectTitle: "Veritas",
  title: "Why BLEU Score Alone Is Useless for Evaluating LLMs",
  date: "June 2026",
  readTime: "7 min read",
  tags: ["LLM", "Evaluation", "NLP", "AI Engineering", "Veritas"],
  excerpt: "I built an LLM evaluation platform and the first thing I learned was that the most popular metric in NLP tells you almost nothing useful. Here is what actually works.",
  sections: [
    { type: "h2", content: "How I got here" },
    { type: "p", content: "I built Veritas, a full stack LLM evaluation and benchmarking platform, because I was frustrated that every LLM comparison I read online was based on vibes. Someone changes a system prompt and says the outputs feel better. A new model drops and people say it seems smarter. I wanted numbers. So I built a system that produces them." },
    { type: "p", content: "The first metric I implemented was BLEU score. It is the most cited metric in NLP papers, it has been around since 2002, and after using it seriously I can tell you it will mislead you more than it helps you." },
    { type: "h2", content: "What BLEU actually measures" },
    { type: "callout", variant: "struggle", label: "The Problem", content: "BLEU counts word overlap between a generated answer and a reference answer. That is it. It has no understanding of meaning, context, or correctness. Two sentences can mean opposite things and score 80% on BLEU." },
    { type: "p", content: "Consider these two sentences. The medicine cured the patient. The medicine killed the patient. BLEU gives this a high score because most of the words match. It cannot tell you that these sentences have opposite meanings because it is not reading them, it is counting tokens." },
    { type: "p", content: "This is not a theoretical problem. In Veritas I ran the same prompt through GPT-3.5 and GPT-4o and used GPT-4o as the reference answer. BLEU gave GPT-3.5 a score of 3 percent. BERTScore gave it 84 percent. Both models were saying essentially the same thing in different words. BLEU called it a failure. BERTScore correctly identified it as a near match." },
    { type: "h2", content: "The metric that actually works: BERTScore" },
    { type: "callout", variant: "victory", label: "The Fix", content: "BERTScore converts both texts into embeddings using a transformer model and measures semantic similarity. It understands that happy and joyful mean the same thing. BLEU does not." },
    { type: "p", content: "Instead of counting matching words, BERTScore encodes both the hypothesis and the reference into high dimensional vectors using a pretrained BERT model. Words with similar meanings get similar vectors. The score measures how close those vectors are. This means paraphrases score well, synonyms score well, and actually wrong answers score poorly." },
    {
      type: "code",
      content: `from bert_score import score as bert_score

P, R, F1 = bert_score(
    [hypothesis],
    [reference],
    lang="en"
)

# F1 is your score — precision and recall of meaning
final_score = round(F1[0].item(), 4)`,
    },
    { type: "h2", content: "But BERTScore still is not enough" },
    { type: "p", content: "Here is the deeper problem. Both BLEU and BERTScore require a reference answer to compare against. In the real world you often do not have one. If a user asks your chatbot about your product and it makes something up, there is no ground truth reference answer to compare against. You need a different kind of evaluation entirely." },
    { type: "h2", content: "Hallucination detection: the metric nobody talks about enough" },
    { type: "callout", variant: "struggle", label: "The Real Problem", content: "LLMs confidently state things that are wrong. BLEU and BERTScore cannot catch this because they compare against a reference. Hallucination detection compares against the source document the answer should be grounded in." },
    { type: "p", content: "In Veritas I implemented retrieval based hallucination detection. The flow is simple. Give the model a source document. Ask it a question about that document. Convert both the model's answer and the source document into embeddings. Measure cosine similarity. If the answer is semantically far from the source, the model probably made something up." },
    { type: "p", content: "To make this fully automatic I integrated Tavily, a web search API built for AI applications. Now when a user submits a prompt with no source document, Veritas automatically searches the web for relevant content and uses it as the source. Hallucination detection runs on every evaluation with zero manual input." },
    {
      type: "code",
      content: `from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity

model = SentenceTransformer('all-MiniLM-L6-v2')

def detect_hallucination(hypothesis: str, source: str, threshold: float = 0.5):
    embeddings = model.encode([hypothesis, source])
    similarity = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    return {
        "score": round(float(similarity), 4),
        "hallucination_detected": similarity < threshold,
        "passed": similarity >= threshold
    }`,
    },
    { type: "h2", content: "The full picture: what Veritas actually runs" },
    { type: "p", content: "After building Veritas I landed on five metrics that together give a complete picture of LLM output quality. BLEU and ROUGE for word level overlap when you care about exact phrasing. BERTScore and Cosine Similarity for semantic accuracy when paraphrasing is acceptable. And hallucination detection for factual grounding regardless of whether a reference exists." },
    { type: "callout", variant: "tip", label: "Key Takeaway", content: "No single metric tells the full story. BLEU catches word level issues. BERTScore catches meaning level issues. Hallucination detection catches factual grounding issues. You need all three layers to evaluate an LLM properly." },
    { type: "h2", content: "What I would do differently" },
    { type: "p", content: "I would add LLM as Judge scoring from day one. Having a second model evaluate the first model across dimensions like helpfulness, relevance, and correctness catches things that no mathematical metric can. Metrics measure surface properties. A judge model reads the response the way a human would." },
    { type: "p", content: "I would also version my evaluation datasets. The prompts you evaluate against are as important as the metrics you use. If you change your prompt set between runs you are not measuring model improvement, you are measuring dataset shift." },
  ],
};