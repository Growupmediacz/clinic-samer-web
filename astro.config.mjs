// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

// PREVIEW=1 → náhled pro klienta (GitHub Pages): noindex, bez Google Analytics
const PREVIEW = process.env.PREVIEW === '1';
// BASE_PATH=/clinic-samer-web → web běží v podsložce (GitHub Pages). Ostrý web běží v kořeni domény.
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');

/**
 * Odkazy v kódu jsou psané od kořene (/sluzby); při běhu v podsložce jim po buildu doplní BASE.
 * @param {string} base
 * @returns {import('astro').AstroIntegration}
 */
function rebase(base) {
  const attr = /(\s(?:href|src|action|data-full|poster)=")\/(?!\/)/g;
  /** @type {(dir: string) => Promise<string[]>} */
  const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true })).map((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : e.name.endsWith('.html') ? [join(dir, e.name)] : []))).flat();
  return {
    name: 'rebase',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for (const f of await walk(fileURLToPath(dir))) {
          const html = await readFile(f, 'utf8');
          const out = html.replace(attr, (m, a, i, s) => (s.startsWith(base + '/', i + a.length) || s.startsWith(base + '"', i + a.length) ? m : `${a}${base}/`));
          if (out !== html) await writeFile(f, out);
        }
      },
    },
  };
}

export default defineConfig({
  site: 'https://clinic-samer.cz',
  base: BASE || undefined,
  trailingSlash: 'ignore',
  // Astro 7 změnilo výchozí hodnotu na 'jsx' (zahazuje mezery mezi inline prvky) – držíme původní chování.
  compressHTML: true,
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'cs', locales: { cs: 'cs-CZ', en: 'en', de: 'de', it: 'it', ar: 'ar' } },
      filter: (page) => !/\/cz\/?$/.test(page) && !/\/(de|it|ar)\/(datenschutz|privacy|cookies)\/?$/.test(page),
      // URL bez koncového lomítka – stejně jako canonical a hreflang (server lomítko odstraňuje 301)
      serialize: (item) => {
        /** @param {string} u */
        const strip = (u) => u.replace(/(?<=[^/])\/$/, '').replace(/^(https:\/\/[^/]+)$/, '$1/');
        return { ...item, url: strip(item.url), links: item.links?.map((l) => ({ ...l, url: strip(l.url) })) };
      },
    }),
    ...(BASE ? [rebase(BASE)] : []),
  ],
  // Přetypování: @tailwindcss/vite a Astro mají každý vlastní kopii typů Vite.
  vite: {
    plugins: [/** @type {any} */ (tailwindcss())],
    define: { __PREVIEW__: JSON.stringify(PREVIEW) },
    // Stejná podpora prohlížečů jako dřív (výchozí cíl Vite 6). Vite 8 cílí až na Safari 16.4 a v CSS by
    // přepsal media queries na zápis (width <= 767px) a vynechal -webkit- prefixy → starší iPhony by ztratily layout.
    // CSS minifikuje esbuild jako ve Vite 6; Lightning CSS (výchozí ve Vite 8) by CSS zbytečně přepisoval.
    build: { target: ['edge88', 'firefox78', 'chrome87', 'safari14'], cssMinify: 'esbuild' },
  },
  // Staré jazykové URL z původního webu (statický fallback; na Apache je řeší i public/.htaccess jako 301)
  redirects: {
    '/cz': '/',
    '/de/datenschutz': '/en/privacy',
    '/it/privacy': '/en/privacy',
    '/ar/privacy': '/en/privacy',
    '/de/cookies': '/en/cookies',
    '/it/cookies': '/en/cookies',
    '/ar/cookies': '/en/cookies',
  },
});
