/** Veškerá interaktivita webu. Inicializuje se po každé navigaci (View Transitions). */
declare global { interface Window { dataLayer: unknown[]; gtag: (...a: unknown[]) => void; __gaLoaded?: boolean } }

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll<T>(s));
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const CONSENT_KEY = 'clinic-samer-consent';

/* ---------- Souhlas s cookies (Consent Mode v2) ---------- */
type Consent = { analytics: boolean; marketing: boolean; ts: number };
const CONSENT_TTL = 365 * 864e5; // souhlas platí 12 měsíců, pak se ptáme znovu
const readConsent = (): Consent | null => {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as Consent | null;
    return c && typeof c.ts === 'number' && Date.now() - c.ts < CONSENT_TTL ? c : null;
  } catch { return null; }
};
/** Po odvolání souhlasu smaže cookies Google Analytics, které už byly uloženy. */
function clearGaCookies() {
  const host = location.hostname, root = host.split('.').slice(-2).join('.');
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((n) => /^_ga|^_gid$|^_gat/.test(n)).forEach((n) => {
    [host, '.' + host, '.' + root].forEach((d) => { document.cookie = `${n}=; Max-Age=0; path=/; domain=${d}`; });
    document.cookie = `${n}=; Max-Age=0; path=/`;
  });
}
function applyConsent(c: Consent) {
  window.gtag('consent', 'update', {
    analytics_storage: c.analytics ? 'granted' : 'denied',
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
  });
  const id = document.documentElement.dataset.ga;
  if (!c.analytics) clearGaCookies();
  if (c.analytics && id && !window.__gaLoaded) {
    window.__gaLoaded = true;
    const s = document.createElement('script');
    s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(s);
    window.gtag('js', new Date()); window.gtag('config', id);
  }
}
function initCookies() {
  const box = $('[data-cookie]'); if (!box) return;
  const settings = $('[data-cookie-settings]', box)!;
  const stored = readConsent();
  const save = (c: Omit<Consent, 'ts'>) => {
    const full = { ...c, ts: Date.now() };
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify(full)); } catch { /* soukromý režim */ }
    applyConsent(full); box.hidden = true;
  };
  const a = $<HTMLInputElement>('[name=analytics]', box)!, m = $<HTMLInputElement>('[name=marketing]', box)!;
  if (stored) { a.checked = stored.analytics; m.checked = stored.marketing; applyConsent(stored); } else box.hidden = false;
  $('[data-cookie-accept]', box)!.onclick = () => save({ analytics: true, marketing: true });
  $('[data-cookie-reject]', box)!.onclick = () => save({ analytics: false, marketing: false });
  const toggle = $('[data-cookie-toggle]', box)!;
  toggle.onclick = () => { settings.hidden = !settings.hidden; toggle.setAttribute('aria-expanded', String(!settings.hidden)); };
  $('[data-cookie-save]', box)!.onclick = () => save({ analytics: a.checked, marketing: m.checked });
  $$('[data-cookie-open]').forEach((b) => (b.onclick = () => {
    const cur = readConsent(); a.checked = !!cur?.analytics; m.checked = !!cur?.marketing;
    box.hidden = false; settings.hidden = false; toggle.setAttribute('aria-expanded', 'true'); a.focus();
  }));
}

/* ---------- Měření kliků ---------- */
// Jeden delegovaný posluchač pro celý web: pozná odkaz podle href, takže se nevynechá žádný
// telefon ani e-mail a s View Transitions se neregistruje vícekrát. Odkazy fungují beze změny
// (ZnámýLékař se otevírá v novém okně, GA4 posílá události přes sendBeacon).
//   click_book  – klik na „Objednat se“ (data-track="click_book"); destination: pruvodce | znamylekar
//   zl_redirect – odchod do online kalendáře ZnámýLékař (odkazy z bookingUrl(), utm_campaign=objednani)
//   click_call  – klik na tel: odkaz;  click_email – klik na mailto: odkaz
//   ostatní data-track (click_map, click_zl_reviews…) se posílají pod svým názvem
let trackingReady = false;
function initTracking() {
  if (trackingReady) return;
  trackingReady = true;
  document.addEventListener('click', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('a[href], [data-track]');
    if (!el) return;
    const href = el instanceof HTMLAnchorElement ? el.href : '';
    const send = (name: string, params: Record<string, string> = {}) =>
      window.gtag?.('event', name, { link_url: href, page_path: location.pathname, ...params });
    const zl = /^https:\/\/(www\.)?znamylekar\.cz\//.test(href) && href.includes('utm_campaign=objednani');
    const track = el.dataset.track;
    if (href.startsWith('tel:')) send('click_call');
    else if (href.startsWith('mailto:')) send('click_email');
    else if (track === 'click_book') send('click_book', { destination: zl ? 'znamylekar' : 'pruvodce' });
    else if (track) send(track);
    if (zl) send('zl_redirect', { booking_source: new URL(href).searchParams.get('utm_content') ?? '' });
  });
}

/* ---------- Navigace ---------- */
function initNav() {
  const mega = $('[data-mega]');
  if (mega) {
    const btn = $('button', mega)!;
    const set = (open: boolean) => { mega.classList.toggle('open', open); btn.setAttribute('aria-expanded', String(open)); };
    btn.onclick = (e) => { e.stopPropagation(); set(!mega.classList.contains('open')); };
    document.addEventListener('click', (e) => { if (!mega.contains(e.target as Node)) set(false); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { set(false); } });
    mega.addEventListener('mouseleave', () => set(false));
  }
  const lm = $<HTMLDetailsElement>('[data-lang-menu]');
  if (lm) {
    document.addEventListener('click', (e) => { if (!lm.contains(e.target as Node)) lm.open = false; });
    lm.addEventListener('keydown', (e) => { if (e.key === 'Escape') { lm.open = false; $('summary', lm)?.focus(); } });
  }
  const menu = $('[data-menu]'), open = $('[data-menu-open]');
  if (menu && open) {
    const set = (on: boolean) => {
      menu.classList.toggle('open', on); menu.toggleAttribute('inert', !on);
      open.setAttribute('aria-expanded', String(on)); document.documentElement.style.overflow = on ? 'hidden' : '';
      if (on) $('[data-menu-close]', menu)?.focus(); else open.focus({ preventScroll: true });
    };
    open.onclick = () => set(true);
    $('[data-menu-close]', menu)!.onclick = () => set(false);
    menu.addEventListener('keydown', (e) => { if (e.key === 'Escape') set(false); });
    $$('a', menu).forEach((a) => a.addEventListener('click', () => { document.documentElement.style.overflow = ''; }));
  }
}

/* ---------- Animace ---------- */
function initMotion() {
  $$('[data-stagger]').forEach((g) => Array.from(g.children).forEach((c, i) => {
    (c as HTMLElement).dataset.reveal = ''; (c as HTMLElement).style.setProperty('--d', `${i * 80}ms`);
  }));
  $$('.steps').forEach((s) => { s.dataset.reveal = 'line'; Array.from(s.children).forEach((c, i) => (c as HTMLElement).style.setProperty('--i', String(i))); });
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in'); io.unobserve(e.target);
    if ((e.target as HTMLElement).dataset.count) countUp(e.target as HTMLElement);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  $$('[data-reveal], [data-count]').forEach((el) => io.observe(el));

  // Časová osa se vykresluje se scrollem
  const timelines = $$('.timeline');
  const hero = $('[data-parallax]');
  if ((timelines.length || hero) && !reduced()) {
    let ticking = false;
    const update = () => {
      ticking = false;
      timelines.forEach((t) => {
        const r = t.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (innerHeight * 0.75 - r.top) / r.height));
        t.style.setProperty('--progress', p.toFixed(3));
      });
      if (hero && innerWidth > 900) hero.style.transform = `translateY(${Math.min(scrollY * 0.06, 40)}px)`;
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('astro:before-swap', () => removeEventListener('scroll', onScroll), { once: true });
    update();
  }

  // Magnetická tlačítka – jen desktop s myší
  if (matchMedia('(hover: hover) and (pointer: fine)').matches && !reduced()) {
    $$('[data-magnetic]').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 8}px, ${((e.clientY - r.top) / r.height - 0.5) * 6}px)`;
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
  }
}
function countUp(el: HTMLElement) {
  const target = parseFloat(el.dataset.count!), dec = Number(el.dataset.decimals || 0);
  const fmt = (n: number) => (el.dataset.prefix || '') + n.toFixed(dec).replace('.', el.dataset.sep || ',') + (el.dataset.suffix || '');
  if (reduced()) { el.textContent = fmt(target); return; }
  const t0 = performance.now(), dur = 1400;
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(target * e);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ---------- Recenze: filtr ---------- */
function initFilters() {
  const bar = $('[data-filters]'); if (!bar) return;
  const items = $$('[data-cat]'), count = $('[data-filter-count]');
  $$('button', bar).forEach((b) => (b.onclick = () => {
    $$('button', bar).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    const f = b.dataset.filter!; let n = 0;
    items.forEach((i) => { const on = f === 'all' || i.dataset.cat === f || i.dataset.lang === f; i.hidden = !on; if (on) n++; });
    if (count) count.textContent = String(n);
  }));
}

/* ---------- FAQ: vyhledávání ---------- */
function initFaqSearch() {
  const input = $<HTMLInputElement>('[data-faq-search]'); if (!input) return;
  const norm = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const empty = $('[data-faq-empty]');
  input.oninput = () => {
    const q = norm(input.value.trim()); let total = 0;
    $$('[data-faq-group]').forEach((g) => {
      let n = 0;
      $$<HTMLDetailsElement>('details', g).forEach((d) => { const on = !q || norm(d.textContent || '').includes(q); d.hidden = !on; if (on) n++; if (q && on) d.open = n === 1 && total === 0; });
      g.hidden = n === 0; total += n;
    });
    if (empty) empty.hidden = total > 0;
  };
}

/* ---------- Mapa na kliknutí (bez cookies třetích stran předem) ---------- */
function initMaps() {
  $$('[data-map]').forEach((m) => {
    const btn = $('button', m); if (!btn) return;
    btn.onclick = () => {
      const f = document.createElement('iframe');
      f.src = m.dataset.map!; f.title = m.dataset.title || 'Mapa'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade';
      m.replaceChildren(f); window.gtag('event', 'click_map', { page_path: location.pathname });
    };
  });
}

/* ---------- Ordinační hodiny live ---------- */
function initHours() {
  $$('[data-hours]').forEach((el) => {
    const hours = JSON.parse(el.dataset.hours!) as Record<string, [string, string] | null>;
    const en = el.dataset.lang !== 'cs';
    const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Prague' }));
    const keys = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
    const today = keys[now.getDay()], mins = now.getHours() * 60 + now.getMinutes();
    const toMin = (s: string) => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
    const h = hours[today]; let text: string, open = false;
    if (h && mins >= toMin(h[0]) && mins < toMin(h[1])) { open = true; text = en ? `Open now · until ${h[1]}` : `Právě otevřeno · do ${h[1]}`; }
    else if (h && mins < toMin(h[0])) text = en ? `Opens today at ${h[0]}` : `Dnes otevíráme v ${h[0]}`;
    else {
      text = en ? 'Closed now' : 'Nyní zavřeno';
      for (let i = 1; i <= 7; i++) { const k = keys[(now.getDay() + i) % 7]; if (hours[k]) { text += en ? ` · opens ${i === 1 ? 'tomorrow' : ''} at ${hours[k]![0]}` : ` · otevíráme ${i === 1 ? 'zítra ' : ''}v ${hours[k]![0]}`; break; } }
    }
    const status = $('[data-hours-status]', el);
    if (status) { status.hidden = false; status.classList.toggle('chip-sage', open); $('span:last-child', status)!.textContent = text; $('.dot', status)!.classList.toggle('dot-live', open); if (!open) ($('.dot', status) as HTMLElement).style.background = '#B88E55'; }
    $(`[data-day="${today}"]`, el)?.classList.add('today');
  });
}

/* ---------- Galerie: lightbox ---------- */
function initLightbox() {
  const dlg = $<HTMLDialogElement>('dialog.lightbox'); if (!dlg) return;
  const items = $$<HTMLButtonElement>('[data-full]'), image = $<HTMLImageElement>('img', dlg)!, cap = $('[data-lb-count]', dlg)!;
  let i = 0;
  const show = (n: number) => { i = (n + items.length) % items.length; image.src = items[i].dataset.full!; image.alt = items[i].dataset.alt || ''; cap.textContent = `${i + 1} / ${items.length}`; };
  items.forEach((b, n) => (b.onclick = () => { show(n); dlg.showModal(); }));
  $('[data-lb-prev]', dlg)!.onclick = () => show(i - 1);
  $('[data-lb-next]', dlg)!.onclick = () => show(i + 1);
  $('[data-lb-close]', dlg)!.onclick = () => dlg.close();
  dlg.onclick = (e) => { if (e.target === dlg) dlg.close(); };
  dlg.onkeydown = (e) => { if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); };
}

/* ---------- Průvodce objednáním ---------- */
function initWizard() {
  const w = $('[data-wizard]'); if (!w) return;
  const results = $$('[data-result]', w);
  results.forEach((r) => (r.hidden = true));
  $('[data-wizard-hint]', w)?.removeAttribute('hidden');
  const pick = (id: string, scroll = true) => {
    $$('[data-pick]', w).forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.pick === id)));
    results.forEach((r) => (r.hidden = r.dataset.result !== id));
    $('[data-wizard-hint]', w)?.setAttribute('hidden', '');
    const r = results.find((x) => x.dataset.result === id);
    if (r && scroll) { r.scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }); r.focus({ preventScroll: true }); }
  };
  $$('[data-pick]', w).forEach((b) => (b.onclick = () => pick(b.dataset.pick!)));
  const pre = new URLSearchParams(location.search).get('duvod');
  if (pre && results.some((r) => r.dataset.result === pre)) pick(pre, false);
}

/* ---------- Kalkulačka termínu porodu ---------- */
function initDueDate() {
  const f = $<HTMLFormElement>('[data-due]'); if (!f) return;
  const input = $<HTMLInputElement>('input[type=date]', f)!, out = $('[data-due-out]', f)!;
  input.max = new Date().toISOString().slice(0, 10);
  f.onsubmit = (e) => {
    e.preventDefault(); if (!input.value) return;
    const lmp = new Date(input.value + 'T12:00:00'), due = new Date(lmp); due.setDate(due.getDate() + 280);
    const days = Math.floor((Date.now() - lmp.getTime()) / 864e5);
    if (days < 0 || days > 301) { out.hidden = false; out.textContent = 'Zadejte prosím datum v posledních 10 měsících.'; return; }
    const d = due.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
    out.hidden = false;
    out.innerHTML = `<span class="tiny">Předpokládaný termín porodu</span><b class="serif" style="display:block;font-size:32px;font-weight:400;color:var(--color-plum-900)">${d}</b><span class="small muted">Nyní jste přibližně v ${Math.floor(days / 7) + 1}. týdnu těhotenství (${Math.floor(days / 7)}+${days % 7}). Výpočet je orientační – termín upřesní lékař podle ultrazvuku.</span>`;
  };
}

function init() {
  document.documentElement.classList.add('js');
  initCookies(); initTracking(); initNav(); initMotion(); initFilters(); initFaqSearch();
  initMaps(); initHours(); initLightbox(); initWizard(); initDueDate();
}
document.addEventListener('astro:page-load', init);
export {};
