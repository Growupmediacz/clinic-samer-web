# clinic-samer.cz – hotový statický výstup (dist/) za nginx. Sestavuje scripts/deploy.sh.
# PREVIEW=1 (náhled na clinic-samer.growupmedia.cz) přidá hlavičku X-Robots-Tag: noindex.
FROM nginx:1.27-alpine
ARG PREVIEW=0
RUN rm -f /etc/nginx/conf.d/default.conf && mkdir -p /etc/nginx/snippets
COPY deploy/nginx.conf /etc/nginx/conf.d/web.conf
COPY deploy/security-headers.conf /etc/nginx/snippets/security-headers.conf
RUN if [ "$PREVIEW" = "1" ]; then echo 'add_header X-Robots-Tag "noindex, nofollow" always;' > /etc/nginx/snippets/robots.conf; else : > /etc/nginx/snippets/robots.conf; fi
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO /dev/null http://127.0.0.1/ || exit 1
