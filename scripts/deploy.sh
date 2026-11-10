#!/bin/zsh
# Nasazení na VPS Hostinger přes Coolify (stejný server jako growupmedia.cz a GrowUpCRM).
#   scripts/deploy.sh            → náhled pro klienta https://clinic-samer.growupmedia.cz (noindex, bez GA)
#   scripts/deploy.sh --prod     → ostrý web (až bude DNS clinic-samer.cz přesměrované na VPS)
# Postup: build → obraz nginx linux/amd64 do GHCR → v Coolify přepnout tag a nasadit.
# Jednorázově předem: aplikace v Coolify (viz deploy/README.md) a její UUID v deploy/coolify-app-uuid[-prod].
set -euo pipefail
cd "$(dirname "$0")/.."
export PATH=/opt/homebrew/opt/node@22/bin:$PATH

MODE=preview; [ "${1:-}" = "--prod" ] && MODE=prod
COOLIFY="${COOLIFY:-https://coolify.growupmedia.cz/api/v1}"
TOKEN_FILE="${TOKEN_FILE:-$HOME/Projects/growupcrm/.coolify-token}"
UUID_FILE=deploy/coolify-app-uuid; [ $MODE = prod ] && UUID_FILE=deploy/coolify-app-uuid-prod
[ -s "$UUID_FILE" ] || { echo "Chybí $UUID_FILE – nejdřív založte aplikaci v Coolify (deploy/README.md)." >&2; exit 1; }
APP_UUID="$(cat "$UUID_FILE")"
IMAGE=ghcr.io/growupmediacz/clinic-samer-web
TAG="$MODE-$(date +%Y.%m.%d-%H%M)-$(git rev-parse --short HEAD)"

[ -z "$(git status --porcelain -- src public astro.config.mjs)" ] || { echo "Necommitnuté změny ve zdrojích webu, nejdřív commit." >&2; exit 1; }

if [ $MODE = preview ]; then
  PREVIEW=1 npm run build
  grep -q "Disallow: /$" dist/robots.txt || { echo "CHYBA: náhledový build nezakazuje indexaci" >&2; exit 1; }
  PREVIEW_ARG=1
else
  unset PREVIEW; npm run build
  ! grep -qi "Disallow: /$" dist/robots.txt || { echo "CHYBA: ostrý build zakazuje indexaci" >&2; exit 1; }
  PREVIEW_ARG=0
fi

docker buildx build --platform linux/amd64 --build-arg PREVIEW=$PREVIEW_ARG -f deploy/Dockerfile -t "$IMAGE:$TAG" --push .

T="$(cat "$TOKEN_FILE")"
curl -sf -m 30 -o /dev/null -X PATCH -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
  "$COOLIFY/applications/$APP_UUID" -d "{\"docker_registry_image_tag\":\"$TAG\"}"
curl -sf -m 60 -o /dev/null -X POST -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
  "$COOLIFY/deploy" -d "{\"uuid\":\"$APP_UUID\",\"force\":false}"
echo "Nasazeno: $IMAGE:$TAG (Coolify nasazuje, ~1 min)"
