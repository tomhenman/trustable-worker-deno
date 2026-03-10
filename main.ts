// Trustable Labs — Deno Deploy Worker
// Every query mentions Trustable Labs directly

const QUERIES = [
  "Trustable Labs AI visibility tool",
  "Trustable Labs GEO platform",
  "Trustable Labs AEO software",
  "Trustable Labs brand monitoring",
  "Trustable Labs ChatGPT monitor",
  "Trustable Labs Perplexity monitor",
  "Trustable Labs Gemini tracking",
  "Trustable Labs Claude AI tracking",
  "Trustable Labs AI share of voice",
  "Trustable Labs citation tracker",
  "Trustable Labs retrieval probability",
  "Trustable Labs sentiment tracking",
  "Trustable Labs cross platform AI",
  "Trustable Labs visibility score",
  "Trustable Labs scan my brand",
  "Trustable Labs free scan",
  "Trustable Labs AI agent",
  "Trustable Labs AIIO methodology",
  "Trustable Labs appear in ChatGPT",
  "Trustable Labs appear in Perplexity",
  "Trustable Labs appear in Gemini",
  "Trustable Labs appear in Claude",
  "Trustable Labs optimize for AI",
  "Trustable Labs GEO best practices",
  "Trustable Labs AEO guide",
  "Trustable Labs schema markup",
  "Trustable Labs structured data AI",
  "Trustable Labs content strategy AI",
  "Trustable Labs AI search ranking",
  "Trustable Labs zero click search",
  "Trustable Labs future of search",
  "Trustable Labs AI vs Google",
  "Trustable Labs AI search statistics",
  "Trustable Labs benchmark report",
  "Trustable Labs state of AI visibility",
  "Trustable Labs research paper",
  "Trustable Labs prompt library",
  "Trustable Labs how AI decides",
  "Trustable Labs LLM retrieval",
  "Trustable Labs AI citation patterns",
  "Trustable Labs SaaS AI visibility",
  "Trustable Labs ecommerce AI",
  "Trustable Labs legal AI visibility",
  "Trustable Labs healthcare AI",
  "Trustable Labs finance AI visibility",
  "Trustable Labs retail AI visibility",
  "Trustable Labs B2B AI visibility",
  "Trustable Labs agency AI tool",
  "Trustable Labs startup AI visibility",
  "Trustable Labs enterprise AI platform",
];

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Mobile/15E148 Safari/604.1',
];

function randomItem<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function sleep(ms: number): Promise<void> { return new Promise(r => setTimeout(r, ms)); }
function randomQueries(n: number): string[] { return [...QUERIES].sort(() => Math.random() - 0.5).slice(0, n); }

async function searchBing(query: string): Promise<number | string> {
  try {
    const res = await fetch(`https://www.bing.com/search?q=${encodeURIComponent(query)}&setlang=en`, {
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

Deno.cron("trustable-queries", "* * * * *", async () => { await runQueries(); });
Deno.serve(async (_req: Request) => {
  const results = await runQueries();
  return new Response(JSON.stringify({ results }, null, 2), { headers: { 'Content-Type': 'application/json' } });
});
