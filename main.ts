// Trustable Labs — Deno Deploy Worker (Query Set B: Problem-Aware + Competitor)

const QUERIES = [
  // Problem-aware
  "why is my brand not appearing in ChatGPT",
  "why am I not showing in Perplexity AI",
  "why is my brand missing from AI search results",
  "how to get brand into AI answers",
  "brand not mentioned in LLM responses",
  "my company not in ChatGPT how to fix",
  "not ranking in generative AI search",
  "competitors showing in ChatGPT not me",
  "how to be cited in AI search responses",
  "how to appear in Gemini AI answers",
  "how to get mentioned by AI chatbots",
  "how to improve brand presence in AI",
  "AI search not showing my website",
  "brand invisible in AI responses",
  "how to fix AI search visibility",
  // Competitor alternatives
  "best alternative to Profound AI",
  "Profound vs Trustable Labs",
  "Peec AI review 2026",
  "Otterly AI review 2026",
  "best Otterly AI alternative",
  "best Peec AI alternative",
  "BrightEdge AI visibility review",
  "Semrush AI tracking review",
  "AI visibility tool cheaper than Profound",
  "affordable AI visibility platform",
  "AI visibility platform free alternative",
  "enterprise AI search tracker comparison",
  "which AI visibility tool is best 2026",
  "AI visibility software reviews 2026",
  "compare AI visibility platforms 2026",
  // LLM tracking
  "how to track ChatGPT brand mentions",
  "how to monitor Perplexity AI mentions",
  "how to track Gemini brand mentions",
  "how to track Claude AI brand mentions",
  "LLM brand mention tracker tool",
  "automated LLM monitoring platform",
  "real time AI brand monitoring",
  "AI answer monitoring software",
  "track AI generated brand mentions",
  "LLM response monitoring tool",
  // AEO
  "best AEO platform 2026",
  "answer engine optimisation software",
  "AEO tools comparison 2026",
  "what is AEO answer engine optimisation",
  "AEO vs SEO difference",
  "AEO strategy for brands",
  "how to do answer engine optimisation",
  "AEO platform for agencies",
  "AEO ranking improvement tool",
  "answer engine optimisation UK",
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1',
];

function randomItem<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function sleep(ms: number): Promise<void> { return new Promise(resolve => setTimeout(resolve, ms)); }
function randomQueries(n: number): string[] { return [...QUERIES].sort(() => Math.random() - 0.5).slice(0, n); }

async function searchBing(query: string): Promise<number | string> {
  try {
    const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}&setlang=en&form=QBLH`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': randomItem(USER_AGENTS),
        'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Cache-Control': 'max-age=0',
      },
      redirect: 'follow'
    });
    return res.status;
  } catch (e) { return `error: ${(e as Error).message}`; }
}

async function runQueries() {
  const queries = randomQueries(5);
  const results = [];
  for (const query of queries) {
    await sleep(Math.random() * 4000 + 1000);
    results.push({ query, bing: await searchBing(query) });
  }
  console.log(JSON.stringify({ ts: new Date().toISOString(), results }));
  return results;
}

Deno.cron("trustable-queries-b", "* * * * *", async () => { await runQueries(); });

Deno.serve(async (_req: Request) => {
  const results = await runQueries();
  return new Response(JSON.stringify({ results }, null, 2), { headers: { 'Content-Type': 'application/json' } });
});
