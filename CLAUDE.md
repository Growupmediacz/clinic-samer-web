# Clinic Samer – web gynekologické ambulance

Vícestránkový web MUDr. Samera Asada (Praha 4 – Braník). Nahrazuje původní jednostránkový web clinic-samer.cz.
**Repozitář je veřejný** (kvůli náhledu na GitHub Pages). Interní poznámky ke klientovi, zadání ani nic z interní komunikace sem nepatří – otevřené body se vedou mimo git (`PODKLADY-TODO.md` je v `.gitignore`).

## Stack
- Astro 5 (statický build), Tailwind CSS 4 (tokeny v `src/styles/tokens.css`), TypeScript
- Fonty self-hosted přes Fontsource: Newsreader (nadpisy), Plus Jakarta Sans (text), Noto Naskh/Sans Arabic (arabština)
- Žádný UI framework – interaktivita je vanilla TS v `src/scripts/site.ts`
- View Transitions (`<ClientRouter />`) → skripty se inicializují na `astro:page-load`

## Příkazy
- Node.js ≥ 22.23.4 (vyžaduje Astro 7; `brew upgrade node@22`)
- `npm run dev` – vývoj na http://localhost:4321
- `npm run check` – typová kontrola (musí projít bez chyb)
- `npm run build` – build do `dist/`

## Kde co je
- `src/data/site.ts` – kontakt, ordinační hodiny, pojišťovny, navigace, `bookingUrl()` (UTM)
- `src/data/services.ts` – obsah všech 8 služeb (CZ); stránky generuje `src/pages/sluzby/[slug].astro`
- `src/i18n/` – cizojazyčné verze: `en.ts` je vzor (typ `Dict`), `de.ts`, `it.ts`, `ar.ts` musí mít stejný tvar; `cs.ts` jen texty rozhraní
- `src/pages/[lang]/` – Home, Services, About, Contact pro EN/DE/IT/AR (arabština je RTL, viz blok „RTL“ v `global.css`); právní stránky jen CZ + `/en/privacy`, `/en/cookies`
- `src/data/faq.ts` – FAQ, kroky první návštěvy, ceník; `src/data/reviews.json` – 34 recenzí
- `src/data/schema.ts` – JSON-LD (MedicalClinic, Physician, FAQPage)
- `src/styles/global.css` – komponentové třídy (`.btn`, `.card`, `.h1`, `.split`…)
- `src/layouts/Base.astro` – head, SEO, hreflang, sticky CTA, cookie lišta
- `public/.htaccess` – 301 přesměrování starých URL (Apache/Hostinger); `deploy/` – finální nasazení na VPS (Coolify)

## Náhled pro klienta
Každý push do `main` nasadí náhled na https://growupmediacz.github.io/clinic-samer-web/ (`.github/workflows/deploy.yml`).
Náhled se staví s `PREVIEW=1` (noindex, bez GA) a `BASE_PATH=/clinic-samer-web` – web běží v podsložce, proto
odkazy v kódu piš od kořene (`/sluzby`) a integrace `rebase` v `astro.config.mjs` jim podsložku doplní.

## Produkce (clinic-samer.cz)
Web běží na webhostingu Hostinger (Apache/LiteSpeed). Stejný workflow po každém pushi do `main` postaví produkční verzi
(indexovatelná, s GA po souhlasu) a uloží ji do větve `hostinger`; hPanel → Git ji přes webhook stáhne do `public_html`.
Do větve `hostinger` necommituj ručně – při každém buildu se přepíše. URL jsou bez koncového lomítka (`public/.htaccess`).
Starší web klienta byl v Lovable; `deploy/` (Coolify/VPS) se pro tohoto klienta nepoužívá.

## Pravidla obsahu
- Jméno lékaře a sestry se v arabštině nepřepisuje (zůstává latinkou).
- Tón: klidný, empatický, vykání, bez superlativů („nejlepší gynekolog“ jen v citacích recenzí).
- Recenze vždy označit jako „ověřená recenze ze ZnámýLékař“, neupravovat znění.
- Medicínská tvrzení a ceny nevymýšlet – co není potvrzené, patří do lokálního `PODKLADY-TODO.md` (mimo git).
- Zlatá `gold-500` jen pro dekor a velký text; pro běžný text `gold-700` (kontrast AA).
- Animace 300–700 ms, vždy respektovat `prefers-reduced-motion`.
- Všechna CTA „Objednat se“ vedou na `/objednat` (průvodce) nebo přes `bookingUrl()` na ZnámýLékař; mají `data-track="click_book"`.

## Měření
GA4 se načítá až po souhlasu (Consent Mode v2). Události (jeden delegovaný posluchač v `initTracking()` v `src/scripts/site.ts`):
`click_book` (tlačítka „Objednat se“, parametr `destination`: `pruvodce` | `znamylekar`), `zl_redirect` (odchod do kalendáře
ZnámýLékař, parametr `booking_source` = `utm_content`), `click_call` (každý `tel:`), `click_email` (každý `mailto:`), `click_map`. Kontaktní formulář na webu záměrně není (klient ho nechtěl, dokud nebude fungovat odesílání).
