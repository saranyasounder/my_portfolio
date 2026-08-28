const LEETCODE_POST = {
  slug: "leetcode-devdiary",
  title: "The Same Bug Wore Three Different Costumes — Here's What It Taught Me About State",
  date: "August 2026",
  readTime: "6 min read",
  tags: ["DSA", "Python", "Graphs", "Dynamic Programming", "Debugging"],
  excerpt: "Three unrelated graph problems, one recurring root cause. Here's how tracing my own bugs taught me more about correct system design than any editorial ever did.",
  sections: [
    { type: "h2", content: "Why I track this" },
    { type: "p", content: "I run structured tracks — graphs, then DP, then greedy — and write every solution from scratch before touching an editorial. The real skill isn't pattern memorization. It's forcing myself to state, precisely, what each piece of state represents before I write the next line. That habit is the actual transferable engineering skill; the problems are just where I stress-test it." },
    { type: "h2", content: "One root cause, three disguises" },
    { type: "callout", variant: "struggle", label: "The Problem", content: "Number of Islands, Clone Graph, and Pacific Atlantic Water Flow looked unrelated. By the third, I recognized the same failure mode each time: I was vague, even to myself, about what a data structure actually held at a given moment in execution." },
    { type: "p", content: "In Pacific Atlantic, I built a visited set meant to hold coordinates, then wrote a membership check against height values instead — it read fine and only broke at runtime. In Clone Graph, a mixed-up dictionary key silently overwrote my own starting node's clone. Neither was a graph-theory bug. Both were a discipline bug: not defining state precisely before using it." },
    {
      type: "code",
      content: `# Not a clever fix — an explicit one
# Before: implicit assumption about what "ocean" holds
if heights[i][j] in ocean:
    return

# After: state named for what it actually is
if (i, j) in ocean:
    return
ocean.add((i, j))`,
    },
    { type: "p", content: "Once I made it a rule — state what this variable represents right now before the next line — that entire bug class stopped. Simple rule, highest-leverage habit change of the month." },
    { type: "h2", content: "Visited is not one thing" },
    { type: "p", content: "Course Schedule is where this sharpened into something I now apply automatically. My first instinct was a single visited array: mark a node once seen, never revisit. That's correct for connectivity and provably wrong for cycle detection, since a node can be legitimately reached by two separate branches of a valid, acyclic schedule." },
    { type: "callout", variant: "struggle", label: "The Bigger Problem", content: "A single boolean can't distinguish a node I've ever seen from a node still on the active call stack — and only the second signals a cycle. Collapsing those into one flag meant my solution rejected perfectly valid orderings." },
    { type: "p", content: "The correct model needs two states: on the active path, and fully resolved. That's not a one-off fix — it's the general model for cycle detection in any directed graph, and I reach for it by default now." },
    { type: "callout", variant: "victory", label: "The Result", content: "Splitting visited into in-progress vs. done unlocked the most problems of any single idea this month — Course Schedule, Valid Tree, and multiple cycle-detection variants stopped being separate problems and became one problem in different costumes." },
    { type: "h2", content: "Distrusting my own branches" },
    { type: "p", content: "My House Robber solution kept sprouting conditional branches comparing house values, as if the recurrence needed special cases. It didn't — I'd let one example convince me the algorithm was more complex than it was." },
    { type: "p", content: "House Robber II compounded it: my first circular-array attempt recursed on smaller slices, passed small test cases by coincidence, then failed as the array grew. The fix was separating concerns — one linear DP helper called on two slices, a wrapper that only compares results. Generalizable lesson: when a recursive function starts doing two jobs, that's the bug, not a signal to add cleverness." },
    { type: "h2", content: "Greedy is a proof, not a vibe" },
    { type: "p", content: "Boats to Save People was the first problem where my code passed before I could defend it. Pairing lightest with heaviest gave the right answer, but I couldn't yet prove that choice was safe without backtracking." },
    { type: "callout", variant: "tip", label: "Key Takeaway", content: "A greedy algorithm only counts if you can prove the local choice is never dominated by an alternative — otherwise it's a heuristic that happens to pass the given tests. I stopped accepting green checkmarks as proof and started requiring an argument I could say out loud before moving on." },
    { type: "h2", content: "A bug that only exists in one language" },
    { type: "p", content: "Bitwise addition without plus or minus passed every positive case, then hung on a = -1, b = 1. The algorithm was right; the assumption under it wasn't — Python integers don't overflow at 32 bits, so a loop relying on wraparound behavior never terminates on negative input." },
    { type: "p", content: "Masking to 32 bits and reconstructing the signed result at the end fixed it. Bigger takeaway: a solution can be correct in the abstract and still wrong in a specific runtime, because the language's number model is part of the problem — not an implementation detail to reason about later." },
    { type: "h2", content: "What this actually builds" },
    { type: "callout", variant: "victory", label: "The Result", content: "Nearly every real bug this month traced to the same root cause: confidence about what a variable or call represented, without checking. Once I saw the pattern, I stopped debugging problem-by-problem and started debugging the habit — a far better return than memorizing any single solution." },
    { type: "h2", content: "What's next" },
    { type: "p", content: "Backtracking is next, and I'm predicting my own failure mode in advance: forgetting to undo a choice before exploring the next branch — the same state-discipline problem in a new shape. Writing the prediction down now means I can check, in a month, whether I actually learned the lesson or just learned to describe it." },
  ],
};