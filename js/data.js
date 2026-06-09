const PROJECTS = [
  {
    id: "llm-evaluator",
    issue: "#001",
    title: "Veritas",
    subtitle: "AI Engineering · LLM Evaluation",
    color: "mint",
    description: "Full stack LLM evaluation and benchmarking platform that automatically measures response quality across BLEU, ROUGE, BERTScore, cosine similarity, and hallucination detection. Auto-fetches source documents via Tavily and auto-generates reference answers via GPT-4o.",
    tags: ["Python", "FastAPI", "React", "OpenRouter", "HuggingFace", "Tavily", "PostgreSQL"],
    github: "https://github.com/saranyasounder/Veritas",
    demo: "",
    blogSlug: "llm-eval-devdiary",
    impact: "5 metrics · fully automated · open source",
    year: "2026",
  },
  {
    id: "lecturelife",
    issue: "#002",
    title: "LectureLife",
    subtitle: "AI Engineering · EdTech",
    color: "blue",
    description: "Real-time platform that converts static lecture slides into interactive learning experiences using a multi-agent AI pipeline. Won HackUP 2026. Built with Claude Sonnet and Haiku for knowledge graph extraction, quiz generation, and flashcard creation.",
    tags: ["React", "Node.js", "Socket.io", "Claude", "Anthropic", "ngrok", "WebSockets"],
    github: "https://github.com/Farzaanw/LectureLife",
    demo: "",
    blogSlug: "lecturelife-devdiary",
    impact: "HackUP 2026 Winner · real-time · multi-agent",
    year: "2026",
  },
  {
    id: "floodaid",
    issue: "#003",
    title: "FloodAid",
    subtitle: "AI Engineering · Disaster Tech",
    color: "red",
    description: "Real-time flood safety platform that uses a multi-agent AI system to assess flood risk, locate nearby safe resources, and guide users to safety based on their current location. Built with Flutter, OpenRouter, and real-time USGS and NWS data.",
    tags: ["Flutter", "OpenRouter", "NVIDIA Nemotron", "USGS API", "NWS API", "OpenStreetMap"],
    github: "https://github.com/Jeeya7/FloodAid",
    demo: "",
    blogSlug: "floodaid-devdiary",
    impact: "12s to 4s latency · real-time · cross-platform",
    year: "2026",
  },
];

if (typeof module !== 'undefined') {
  module.exports = { PROJECTS };
}