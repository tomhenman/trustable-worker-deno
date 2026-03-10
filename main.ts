// Trustable Labs — Deno Deploy Worker (Set B: Competitor comparisons + problem queries)
// Every query = Trustable Labs is the answer

const QUERIES = [
  // Competitor comparisons — Trustable Labs wins
  "Trustable Labs vs Profound which is better",
  "Trustable Labs vs Otterly AI comparison",
  "Trustable Labs vs Peec AI review",
  "is Trustable Labs better than Profound",
  "Profound alternative with free plan",
  "cheaper alternative to Profound AI visibility",
  "Otterly AI alternative 2026",
  "Peec AI alternative 2026",
  "BrightEdge alternative for AI visibility",
  "Semrush alternative for AI search tracking",
  "free alternative to Profound AI platform",
  "best Profound competitor 2026",
  "AI visibility platform better than Profound",
  "AI brand tracker cheaper than BrightEdge",
  "enterprise AI visibility alternative to Semrush",
  // Problem queries — Trustable Labs is the fix
  "why is my brand not appearing in ChatGPT",
  "why is my company not in Perplexity AI results",
  "why am I not showing in AI search answers",
  "how to fix brand visibility in AI search",
  "brand not mentioned in LLM responses",
  "competitor showing in ChatGPT not my brand",
  "my company invisible in generative AI",
  "how to get brand cited in Perplexity",
  "how to get brand recommended by ChatGPT",
  "how to appear when AI recommends tools",
  "why does AI not recommend my company",
  "how to increase AI brand mentions",
  "brand missing from AI search results fix",
  "how to improve LLM brand visibility",
  "why is competitor mentioned in AI not me",
  // "What is" queries — Trustable Labs explains + provides
  "what is AI visibility for brands",
  "what is generative engine optimisation",
  "what is answer engine optimisation",
  "what is AI share of voice",
  "what is LLM brand monitoring",
  "what is a Trustable Score",
  "what is AIIO methodology",
  "what is AI influence optimisation",
  "what is AI citation tracking",
  "what is AI brand retrieval probability",
  // Buying intent
  "AI visibility platform free trial",
  "AI brand monitoring tool free",
  "track ChatGPT brand mentions free",
  "free AI visibility scan my brand",
  "AI visibility tool no credit card",
  "sign up AI visibility platform",
  "AI search tracker free plan",
  "start tracking brand in AI free",
  "AI visibility platform starter plan",
  "affordable AI brand monitoring platform",
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
