import type { APIRoute } from 'astro';

/**
 * AI vyhledávače a asistenti – výslovně povolení, aby web mohli procházet, citovat a doporučovat
 * (ChatGPT, Claude, Perplexity, Gemini, Apple Intelligence, Copilot, Meta AI, Mistral, DuckDuckGo…).
 */
const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'GoogleOther',
  'Applebot', 'Applebot-Extended',
  'bingbot', 'meta-externalagent', 'meta-externalfetcher', 'FacebookBot',
  'MistralAI-User', 'DuckAssistBot', 'Amazonbot', 'cohere-ai', 'YouBot', 'CCBot',
];

const production = [
  'User-agent: *',
  'Allow: /',
  '',
  ...AI_BOTS.map((b) => `User-agent: ${b}`),
  'Allow: /',
  '',
  'Sitemap: https://clinic-samer.cz/sitemap-index.xml',
  '',
].join('\n');

/** Náhledový build (PREVIEW=1, např. clinic-samer.growupmedia.cz) se nesmí dostat do vyhledávačů. */
export const GET: APIRoute = () =>
  new Response(__PREVIEW__ ? 'User-agent: *\nDisallow: /\n' : production, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
