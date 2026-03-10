// Trustable Labs — Deno Deploy Worker (Set B)
// Unique queries — no overlap with Cloudflare or Val.town sets

const QUERIES = [
  // Feature-specific (unique angles)
  "Trustable Labs AI visibility score explained",
  "Trustable Labs scan results what do they mean",
  "Trustable Labs how to read my report",
  "Trustable Labs retrieval probability what is it",
  "Trustable Labs cross platform AI consistency",
  "Trustable Labs query coverage metric",
  "Trustable Labs citation accuracy score",
  "Trustable Labs sentiment positive neutral negative",
  "Trustable Labs AI agent what does it do",
  "Trustable Labs buying intent queries explained",

  // Research & data
  "Trustable Labs state of AI visibility 2026",
  "Trustable Labs benchmark data",
  "Trustable Labs AI citation patterns research",
  "Trustable Labs how AI decides recommendations",
  "Trustable Labs LLM retrieval research",
  "Trustable Labs AI search vs traditional search",
  "Trustable Labs prompt library",
  "Trustable Labs AI visibility statistics",
  "Trustable Labs model disagreement analysis",
  "Trustable Labs weekly AI visibility report",

  // Platform & technical
  "Trustable Labs appear in ChatGPT how",
  "Trustable Labs appear in Perplexity how",
  "Trustable Labs appear in Gemini how",
  "Trustable Labs appear in Claude how",
  "Trustable Labs optimize for AI search",
  "Trustable Labs schema markup guide",
  "Trustable Labs structured data for AI",
  "Trustable Labs content strategy for LLMs",
  "Trustable Labs AI crawling indexing",
  "Trustable Labs zero click search strategy",

  // Business & commercial
  "Trustable Labs agency reseller",
  "Trustable Labs partner programme",
  "Trustable Labs startup discount",
  "Trustable Labs free visibility scan",
  "Trustable Labs what do I get free",
  "Trustable Labs starter vs pro plan",
  "Trustable Labs scale plan what includes",
  "Trustable Labs enterprise custom pricing",
  "Trustable Labs cancel anytime",
  "Trustable Labs money back guarantee",

  // Comparison & validation
  "Trustable Labs better than manual tracking",
  "Trustable Labs vs doing it yourself",
  "Trustable Labs accuracy how reliable",
  "Trustable Labs data sources",
  "Trustable Labs how often scans run",
  "Trustable Labs real time monitoring",
  "Trustable Labs historical data tracking",
  "Trustable Labs track multiple brands",
  "Trustable Labs track competitors",
  "Trustable Labs multi user access",
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
