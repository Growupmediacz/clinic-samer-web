# Nasazení

Web běží jako kontejner nginx se statickým `dist/` na VPS Hostinger (Coolify, `coolify.growupmedia.cz`),
stejně jako growupmedia.cz. Obraz je v GHCR `ghcr.io/growupmediacz/clinic-samer-web`.

## Náhled pro klienta

Běžný náhled je na GitHub Pages (https://growupmediacz.github.io/clinic-samer-web/), nasazuje ho
`.github/workflows/deploy.yml` při každém pushi do `main`. Varianta níže (subdoména na VPS) je volitelná.

### Volitelně na subdoméně – https://clinic-samer.growupmedia.cz

Jednorázově:

1. **DNS (WEDOS):** A záznam `clinic-samer` → `187.126.2.180` v zóně growupmedia.cz.
2. **Coolify:** nová aplikace typu *Docker Image* v projektu pro klientské weby,
   obraz `ghcr.io/growupmediacz/clinic-samer-web`, port 80, doména `https://clinic-samer.growupmedia.cz`.
   Její UUID uložit do `deploy/coolify-app-uuid`.

Pak každé nasazení: `scripts/deploy.sh` (vyžaduje běžící Docker a přihlášení k GHCR přes `gh`).

Náhledový build (`PREVIEW=1`) má `robots.txt` s `Disallow: /`, meta `noindex`, hlavičku `X-Robots-Tag`
a nenačítá Google Analytics – klientský náhled se nedostane do Googlu ani do statistik.

## Ostrý web – https://clinic-samer.cz

Až klient schválí: druhá aplikace v Coolify s doménou `clinic-samer.cz` (+ `www`), UUID do
`deploy/coolify-app-uuid-prod`, přesměrovat DNS domény na `187.126.2.180` a `scripts/deploy.sh --prod`.

`public/.htaccess` zůstává pro případ sdíleného hostingu Hostinger (Apache); na VPS řeší přesměrování `deploy/nginx.conf`.
