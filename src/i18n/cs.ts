import type { UI } from './en';

/** Čeština – jen texty rozhraní; obsah českých stránek je přímo v src/pages a src/data. */
export const csUi: UI = {
  name: 'Čeština', short: 'CZ', dir: 'ltr', ogLocale: 'cs_CZ',
  skip: 'Přeskočit na obsah', navLabel: 'Hlavní navigace', home: 'Úvod',
  services: 'Služby', about: 'O nás', contact: 'Kontakt',
  book: 'Objednat se', call: 'Zavolat', map: 'Mapa', menu: 'Menu', close: 'Zavřít', openMenu: 'Otevřít menu',
  allServices: 'Všechny služby', notSure: 'Nevíte si rady?',
  megaText: 'Řekněte nám, s čím přicházíte, a doporučíme vhodný typ návštěvy.',
  practice: 'Ordinace', insuranceTitle: 'Smluvní pojišťovny', switchLang: 'Jazyk', quick: 'Rychlé akce',
  footerAbout: 'MUDr. Samer Asad – gynekologická ambulance. Osobní péče v Praze 4 se zaměřením na plánování těhotenství, reprodukční medicínu a péči o těhotné.',
  cookiesLabel: 'Cookies', cookieSettings: 'Nastavení cookies', privacy: 'Ochrana osobních údajů',
  verified: 'ověřená recenze ze ZnámýLékař', stars: 'Hodnocení 5 z 5',
  cookie: {
    title: 'Tento web používá cookies',
    text: 'Nezbytné cookies fungují vždy. Analytické a marketingové používáme jen s vaším souhlasem, abychom web mohli zlepšovat.',
    more: 'Více o cookies', necessary: 'Nezbytné – vždy aktivní', stats: 'Statistické (Google Analytics)', marketing: 'Marketingové',
    save: 'Uložit výběr', accept: 'Přijmout vše', reject: 'Odmítnout vše', settings: 'Nastavení',
  },
  cta: {
    title: 'Objednejte se na první návštěvu',
    text: 'Vyberte si termín online, nebo nám zavolejte. Rádi poradíme, jaký typ návštěvy je pro vás vhodný.',
    online: 'Vybrat termín online', call: 'Zavolat',
  },
  card: {
    address: 'Adresa', hours: 'Ordinační hodiny',
    hoursPre: 'Ordinujeme na objednání. Aktuální volné termíny najdete v ', hoursLink: 'online kalendáři', hoursPost: ', nebo nám zavolejte.',
    contact: 'Kontakt', showMap: 'Zobrazit mapu', loadsMap: 'Načte mapu Google', mapTitle: 'Mapa – Branická 479/21, Praha 4', closed: 'zavřeno',
  },
};
