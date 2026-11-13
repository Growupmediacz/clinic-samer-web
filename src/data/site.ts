/** Základní údaje o ordinaci – jediné místo, kde se mění kontakt, hodiny a odkazy. */

export const LANGS = ['cs', 'en', 'de', 'it', 'ar'] as const;
export type Lang = (typeof LANGS)[number];
export type IntlLang = Exclude<Lang, 'cs'>;
export const INTL: IntlLang[] = ['en', 'de', 'it', 'ar'];

/** Stránky, které existují ve více jazycích (pro přepínač jazyků a hreflang). */
export type PageKey = 'home' | 'services' | 'about' | 'contact' | 'privacy' | 'cookies';
const CS_PATHS: Record<PageKey, string> = { home: '/', services: '/sluzby', about: '/o-nas', contact: '/kontakt', privacy: '/ochrana-osobnich-udaju', cookies: '/cookies' };
/** Právní stránky jsou jen česky a anglicky – ostatní jazyky odkazují na anglickou verzi. */
export const isLegal = (key: PageKey) => key === 'privacy' || key === 'cookies';
export const pagePath = (key: PageKey, lang: Lang) =>
  lang === 'cs' ? CS_PATHS[key] : key === 'home' ? `/${lang}` : isLegal(key) ? `/en/${key}` : `/${lang}/${key}`;

const ZL_PROFILE = 'https://www.znamylekar.cz/profil/samer-asad';

/** Odkaz na objednání přes ZnámýLékař s UTM (content = odkud / s čím pacientka přichází). */
export const bookingUrl = (content = 'web') =>
  `${ZL_PROFILE}?utm_source=clinic-samer.cz&utm_medium=referral&utm_campaign=objednani&utm_content=${encodeURIComponent(content)}`;

export type DayHours = [open: string, close: string] | null;

export const site = {
  name: 'Clinic Samer',
  legalName: 'MUDr. Samer Asad – Gynekologická ambulance',
  company: 'Gyn Por Ivf MUDr. Samer Asad s.r.o.',
  url: 'https://clinic-samer.cz',
  phone: '+420 734 421 860',
  phoneHref: 'tel:+420734421860',
  email: 'dr.samer@seznam.cz',
  street: 'Branická 479/21',
  zip: '147 00',
  city: 'Praha 4 – Braník',
  geo: { lat: 50.0393512, lng: 14.4113958 },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Branick%C3%A1+479%2F21%2C+147+00+Praha+4',
  mapsEmbed: 'https://www.google.com/maps?q=Branick%C3%A1+479%2F21%2C+147+00+Praha+4&z=16&output=embed',
  zlProfile: ZL_PROFILE,
  /** Profil firmy na Googlu (Google vede jméno jako „MUDr. Samer Assaad“). */
  googleProfile: 'https://www.google.com/search?kgmid=/g/11w9j015n9',
  languages: { cs: ['česky', 'anglicky', 'francouzsky', 'italsky', 'arabsky'] },
  /**
   * Ordinační hodiny – záměrně null: hodiny se často mění a aktuální jsou vždy na ZnámýLékař,
   * web proto odkazuje na online kalendář. Po případném doplnění se automaticky zobrazí na webu
   * včetně stavu „Právě otevřeno“. Formát: po–ne, ['08:00', '16:00'] nebo null = zavřeno.
   * Příklad: { mo: ['08:00','16:00'], tu: ['08:00','18:00'], we: null, ... }
   */
  hours: null as null | Record<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su', DayHours>,
  /** GA4 měřicí ID. Načítá se až po souhlasu s analytickými cookies. */
  gaId: 'G-6EEV74WT48',
  stats: { years: 20, reviews: 700, rating: 4.9, awards: 4 },
};

export const insurers = [
  { code: '111', short: 'VZP', name: 'Všeobecná zdravotní pojišťovna' },
  { code: '201', short: 'VoZP', name: 'Vojenská zdravotní pojišťovna', logo: '/pojistovny/vozp.svg' },
  { code: '205', short: 'ČPZP', name: 'Česká průmyslová zdravotní pojišťovna' },
  { code: '207', short: 'OZP', name: 'Oborová zdravotní pojišťovna', logo: '/pojistovny/ozp.svg' },
  { code: '209', short: 'ZP Škoda', name: 'Zaměstnanecká pojišťovna Škoda' },
  { code: '211', short: 'ZPMV', name: 'Zdravotní pojišťovna ministerstva vnitra', logo: '/pojistovny/zpmv.svg' },
  { code: '213', short: 'RBP', name: 'RBP, zdravotní pojišťovna', logo: '/pojistovny/rbp.svg' },
  { code: '', short: 'PVZP / UNIQA', name: 'Pojištění cizinců (PVZP, UNIQA)' },
];

export const dayNames: Record<Lang, Record<string, string>> = {
  cs: { mo: 'Pondělí', tu: 'Úterý', we: 'Středa', th: 'Čtvrtek', fr: 'Pátek', sa: 'Sobota', su: 'Neděle' },
  en: { mo: 'Monday', tu: 'Tuesday', we: 'Wednesday', th: 'Thursday', fr: 'Friday', sa: 'Saturday', su: 'Sunday' },
  de: { mo: 'Montag', tu: 'Dienstag', we: 'Mittwoch', th: 'Donnerstag', fr: 'Freitag', sa: 'Samstag', su: 'Sonntag' },
  it: { mo: 'Lunedì', tu: 'Martedì', we: 'Mercoledì', th: 'Giovedì', fr: 'Venerdì', sa: 'Sabato', su: 'Domenica' },
  ar: { mo: 'الاثنين', tu: 'الثلاثاء', we: 'الأربعاء', th: 'الخميس', fr: 'الجمعة', sa: 'السبت', su: 'الأحد' },
};

/** Položky české navigace (cizojazyčné verze mají jen Services / About / Contact). */
export const navCs = {
  items: [
    { label: 'O nás', href: '/o-nas' },
    { label: 'Ceník', href: '/cenik' },
    { label: 'Recenze', href: '/recenze' },
    { label: 'Kontakt', href: '/kontakt' },
  ],
  more: [
    { label: 'První návštěva', href: '/prvni-navsteva' },
    { label: 'Příběhy', href: '/pribehy' },
    { label: 'Časté dotazy', href: '/caste-dotazy' },
  ],
};
