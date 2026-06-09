const FLOODAID_POST = {
  slug: "floodaid-devdiary",
  projectId: "floodaid",
  projectTitle: "FloodAid",
  title: "How I Cut LLM Response Time by 60% and Why Autonomous Agents Almost Broke Everything",
  date: "May 2026",
  readTime: "8 min read",
  tags: ["Flutter", "Multi-Agent AI", "Disaster Tech", "Latency", "USGS"],
  excerpt: "FloodAid started with a 12 second response time and an autonomous agent loop that kept running until it hit the token limit. Here is how I fixed both and what I learned about building AI systems for high stakes situations.",
  sections: [
    { type: "h2", content: "Why I built this" },
    { type: "p", content: "Floods are the most common and costly natural disaster in the world causing 388 billion dollars in annual losses. But the statistic that hit me hardest was this: a 20 year US study found over 22,000 deaths in the year after floods due to heart attacks, respiratory issues, stress, mold, and disrupted care. That is 21 times higher than official flood death counts." },
    { type: "p", content: "The burden is not equal either. Adults over 65 and Black and Hispanic communities face significantly higher mortality rates. Floods do not just damage homes. They expose systemic vulnerabilities. FloodAid exists to bridge that gap. In a flood people do not need more alerts. They need clear actionable guidance: where to go, how to get there, and reassurance they are not alone." },
    { type: "h2", content: "The 12 second problem" },
    { type: "callout", variant: "struggle", label: "The Problem", content: "First version: user inputs location, app calls USGS for streamflow data, calls NWS for flood alerts, calls OpenStreetMap for nearby resources, feeds everything to an LLM, waits for response. Total time: 12 seconds. In an emergency that is unacceptable." },
    { type: "p", content: "The original architecture was sequential. Each API call waited for the previous one to complete before starting. The LLM then had to process all that data and respond. By the time the user got guidance they could have already made a decision based on instinct." },
    { type: "h2", content: "Fix one: parallelize everything" },
    { type: "p", content: "The first fix was obvious once I saw it. The USGS call, the NWS call, and the OpenStreetMap call have no dependency on each other. They can all run simultaneously. I refactored the data pipeline to use Future.wait() in Flutter, firing all three requests in parallel and waiting for all three to complete before passing the unified result to the AI pipeline." },
    {
      type: "code",
      content: `// Before: sequential — 12 seconds
final usgs = await fetchUSGSData(location);
final nws = await fetchNWSAlerts(location);
final resources = await fetchNearbyResources(location);

// After: parallel — 4 seconds
final results = await Future.wait([
  fetchUSGSData(location),
  fetchNWSAlerts(location),
  fetchNearbyResources(location),
]);`,
    },
    { type: "h2", content: "Fix two: kill the autonomous agent loop" },
    { type: "callout", variant: "struggle", label: "The Bigger Problem", content: "The original AI system used autonomous agents that could call tools, reason about the results, and call more tools. In testing it worked. In production it ran until it hit the token limit and returned nothing. Every single time." },
    { type: "p", content: "Autonomous agents sound impressive but they introduce non-determinism into a system where non-determinism is dangerous. In a flood emergency a user cannot afford to wait while an agent decides whether it needs more data. And they definitely cannot get a blank response because the agent exhausted its context window." },
    { type: "p", content: "I replaced the autonomous loop with a deterministic pipeline. Two specialist agents with fixed inputs and structured JSON outputs. The Risk Agent receives weather and hydrological data and outputs a risk score with reasoning. The Resource Agent receives location and safety heuristics and outputs a ranked list of nearby hospitals, shelters, and food banks. No loops. No tool calling. Predictable inputs, predictable outputs, every time." },
    { type: "callout", variant: "victory", label: "The Result", content: "Response time dropped from 12 seconds to 4 seconds. Token exhaustion went to zero. Output reliability went to 100 percent. The system became testable, debuggable, and safe to ship." },
    { type: "h2", content: "The honest demo decision" },
    { type: "p", content: "Corvallis, Oregon where Oregon State is located has almost no real flood risk data. Early demos looked impressive but were completely fabricated. I switched the demo location to Newport, Oregon which sits on the coast and has genuine USGS streamflow monitoring, real NWS flood alert history, and verifiable risk data." },
    { type: "p", content: "The demo became less flashy. Newport does not always have active flood alerts. But every data point in the demo is real and verifiable. That decision built more trust with the judges than inflated demo data ever would have." },
    { type: "h2", content: "What I mastered" },
    { type: "callout", variant: "tip", label: "Key Takeaway", content: "In high stakes systems deterministic pipelines beat autonomous agents every time. Faster, cheaper, more predictable, and actually debuggable. Autonomous agents are powerful in low stakes exploration. They are dangerous in production systems where reliability is the product." },
    { type: "h2", content: "What is next" },
    { type: "p", content: "The most important next feature is multi-language support. The communities most vulnerable to flood mortality — elderly residents, Black and Hispanic communities — are also the communities most likely to face language barriers in an emergency. Adding Spanish, Vietnamese, Haitian Creole, and Tagalog is not a nice-to-have. It is the whole point." },
  ],
};