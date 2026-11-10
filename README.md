# clinic-samer-web

Nový web gynekologické ambulance **MUDr. Samera Asada** (Praha 4 – Braník) – https://clinic-samer.cz

Astro 5 · Tailwind CSS 4 · TypeScript · statický build

## Spuštění

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # typová kontrola
npm run build    # výstup v dist/
```

## Stránky

| URL | Obsah |
| --- | --- |
| `/` | Homepage |
| `/sluzby` + 8× `/sluzby/[slug]` | Přehled a detail služeb |
| `/o-nas` | Lékař, sestra, ordinace |
| `/prvni-navsteva` | Postup, průběh vyšetření, práva pacientky |
| `/cenik` | Hrazeno pojišťovnou vs. samoplátce |
| `/recenze` | 34 recenzí s filtrem |
| `/pribehy` | Galerie rodin s lightboxem |
| `/caste-dotazy` | FAQ s vyhledáváním |
| `/kontakt` | Kontakt, mapa, formulář |
| `/objednat` | Průvodce objednáním |
| `/ochrana-osobnich-udaju`, `/cookies` | Právní stránky |
| `/{en,de,it,ar}`, `…/services`, `…/about`, `…/contact` | Anglická, německá, italská a arabská verze (texty v `src/i18n/`) |
| `/en/privacy`, `/en/cookies` | Právní stránky anglicky |

## Úpravy obsahu

Většina obsahu je v `src/data/` – viz [CLAUDE.md](CLAUDE.md). Náhled pro klienta: https://growupmediacz.github.io/clinic-samer-web/

## Nasazení

Každý push do `main` nasadí náhled (noindex, bez Google Analytics) na GitHub Pages:
https://growupmediacz.github.io/clinic-samer-web/

Finální web na clinic-samer.cz se nasadí na VPS Hostinger přes Coolify – viz [deploy/README.md](deploy/README.md).
