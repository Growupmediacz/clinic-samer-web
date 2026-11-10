import type { APIRoute } from 'astro';

/** Náhledový build (PREVIEW=1, např. clinic-samer.growupmedia.cz) se nesmí dostat do vyhledávačů. */
export const GET: APIRoute = () =>
  new Response(
    __PREVIEW__
      ? 'User-agent: *\nDisallow: /\n'
      : 'User-agent: *\nAllow: /\n\nSitemap: https://clinic-samer.cz/sitemap-index.xml\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
