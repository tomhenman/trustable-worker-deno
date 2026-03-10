// Trustable Labs — Deno Deploy Worker (Set B)
// Queries mapped to real pages: GEO/AEO, what-is, blog, research, industry

const QUERIES = [
  // GEO pages → /what-is-geo, /geo-tools, /geo-vs-seo, /geo-best-practices
  "what is generative engine optimisation",
  "what is GEO search",
  "GEO vs SEO difference explained",
  "GEO best practices 2026",
  "GEO tools for brands",
  "GEO tools for small business",
  "best GEO tool 2026",
  "generative engine optimisation platform",
  "generative engine optimisation strategy",
  "how to do GEO for my brand",

  // AEO pages → /what-is-aeo, /aeo-tools, /aeo-vs-seo, /aeo-best-practices
  "what is answer engine optimisation",
  "what is AEO",
  "AEO vs SEO explained",
  "AEO best practices 2026",
  "AEO tools for brands",
  "best AEO tool 2026",
  "answer engine optimisation strategy",
  "how to do AEO for my website",
  "AEO platform for agencies",

  // What-is pages → /what-is-ai-visibility, /ai-brand-mentions, /ai-visibility-metrics
  "what is AI visibility for brands",
  "what is AI brand visibility",
  "what is AI share of voice",
  "what is AI citation accuracy",
  "what is AI brand reputation monitoring",
  "what is LLM information retrieval",
  "what is AI search ranking",
  "what is AI search optimization",
  "AI visibility explained",
  "AI search vs Google explained",

  // Blog posts → /blog/*
  "how to appear in ChatGPT blog",
  "what is GEO guide 2026",
  "AI visibility guide for marketers",
  "ChatGPT vs Google for brand discovery",
  "AI mentions monitoring guide",
  "Trustable Score blog explained",
  "GEO vs SEO guide 2026",
  "AI citations guide for brands",
  "brand reputation in AI era",
  "Perplexity marketing guide 2026",

  // Research pages → /research/*
  "how AI decides what to recommend",
  "AI citation patterns research 2026",
  "how LLMs retrieve brand information",
  "state of AI visibility 2026 report",
  "AI search vs traditional search research",
  "AI visibility statistics 2026",
  "AI visibility benchmark report 2026",
  "AI assistant usage statistics",
  "ChatGPT market share 2026",
  "future of search AI report",
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
