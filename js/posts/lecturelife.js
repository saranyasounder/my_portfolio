const LECTURELIFE_POST = {
  slug: "lecturelife-devdiary",
  projectId: "lecturelife",
  projectTitle: "LectureLife",
  title: "How We Won a Hackathon by Treating Claude Like a Team of Specialists",
  date: "April 2026",
  readTime: "6 min read",
  tags: ["Multi-Agent AI", "Claude", "Hackathon", "WebSockets", "EdTech"],
  excerpt: "At HackUP 2026 we had 24 hours to build something that mattered. The insight that won it was realizing that one LLM trying to do everything is worse than two LLMs doing one thing each.",
  sections: [
    { type: "h2", content: "The idea" },
    { type: "p", content: "LectureLife started with a frustration every student knows. You sit through a lecture, the slides go by, and two hours later you remember almost nothing. The information was there. It just was not in a form your brain could hold onto." },
    { type: "p", content: "We wanted to build something that could take any lecture slide deck and instantly turn it into flashcards, quizzes, knowledge graphs, and timelines. Not generic study material. Material extracted from the actual content of that specific lecture." },
    { type: "h2", content: "The multi-agent insight" },
    { type: "callout", variant: "struggle", label: "The Problem", content: "Our first prototype used a single Claude prompt that tried to extract a knowledge graph, generate quiz questions, create flashcards, and build a timeline all at once. The outputs were mediocre across the board. Doing four things at once means doing none of them well." },
    { type: "p", content: "The breakthrough was treating the problem the way a company would. You would not hire one person to be your lawyer, accountant, engineer, and designer simultaneously. You would hire specialists. So we built specialist agents." },
    { type: "p", content: "Claude Sonnet handled the deep structural work — knowledge graph extraction and timeline construction. These tasks required reasoning about relationships between concepts across the whole slide deck. Claude Haiku handled the high volume repetitive work — generating quiz questions and flashcards for each slide. Fast, cheap, and perfectly suited to the task." },
    {
      type: "code",
      content: `// Multi-agent pipeline
const [knowledgeGraph, timeline] = await Promise.all([
  claudeSonnet.extract(slides, 'knowledge-graph'),
  claudeSonnet.extract(slides, 'timeline'),
]);

const [quizzes, flashcards] = await Promise.all([
  claudeHaiku.generate(slides, 'quiz'),
  claudeHaiku.generate(slides, 'flashcards'),
]);`,
    },
    { type: "h2", content: "The real-time challenge" },
    { type: "callout", variant: "struggle", label: "The Hard Part", content: "Students needed to access the generated content on their own devices by scanning a QR code. That meant syncing state across multiple clients in real time, with no shared infrastructure, in under 24 hours." },
    { type: "p", content: "We built the sync layer on Socket.io with WebSocket architecture. When a professor uploads slides and the agent pipeline finishes processing, the results broadcast to all connected student devices simultaneously. The QR code contains the session ID. The student's device joins the WebSocket room and immediately receives the full generated content." },
    { type: "p", content: "We used ngrok to expose the local server during the hackathon demo so judges could scan the QR code from their phones and see it work live. That live demo moment — a judge scanning a code and seeing flashcards appear on their phone from slides they had never seen before — is what won it." },
    { type: "h2", content: "What I mastered" },
    { type: "callout", variant: "tip", label: "Key Takeaway", content: "Multi-agent systems outperform single-agent systems when tasks have different cognitive requirements. Match the model to the task. Sonnet for reasoning. Haiku for volume. Never ask one model to do both at once." },
    { type: "h2", content: "What I would do differently" },
    { type: "p", content: "The QR code session model is fragile — if the server restarts the session dies. In production I would persist session state to a database so students can return to their material. I would also add streaming so the first flashcard appears in seconds rather than waiting for the full pipeline to complete." },
  ],
};