/**
 * Obsah stránek služeb (CZ). Zkrácené cizojazyčné verze jsou v src/i18n/*.ts → items.
 * Texty vycházejí ze starého webu a profilu na ZnámýLékař. Medicínská tvrzení a ceny
 * jsou návrh k odsouhlasení klientem – viz PODKLADY-TODO.md.
 */

export type Tone = 'sage' | 'blush' | 'plum';
export type ImageKey = 'ultrasound' | 'desk' | 'nurse' | 'newborn' | 'ivf';

export interface Service {
  slug: string;
  no: string;
  name: string;
  short: string;
  tone: Tone;
  image: ImageKey;
  imageAlt: string;
  eyebrow: string;
  lead: string;
  chips: string[];
  forWhomTitle: string;
  forWhom: { title: string; text: string }[];
  stepsEyebrow: string;
  stepsTitle: string;
  stepsIntro: string;
  steps: { label: string; title: string; text: string }[];
  prepare: string[];
  prices: { item: string; price: string }[];
  priceNote: string;
  faq: { q: string; a: string }[];
  related: string[];
  /** Kategorie recenzí zobrazené na stránce služby (viz reviews.json → cat). */
  reviewCats: string[];
  cta: string;
  seo: { title: string; description: string };
}

const PRICE_NOTE = 'Ceny se mohou lišit podle náročnosti výkonu. O ceně samopláteckých vyšetření a zákroků vás vždy informujeme předem.';
const BRING = ['Průkaz pojištěnce', 'Předchozí výsledky a lékařské zprávy', 'Seznam léků, které užíváte', 'Datum poslední menstruace'];

export const services: Service[] = [
  {
    slug: 'tehotenska-poradna-ultrazvuk',
    no: '01',
    name: 'Těhotenská poradna a ultrazvuk',
    short: 'Pravidelné kontroly, genetická vyšetření, 3D/4D a nově 8K ultrazvuk.',
    tone: 'sage',
    image: 'ultrasound',
    imageAlt: 'MUDr. Samer Asad při ultrazvukovém vyšetření těhotné pacientky',
    eyebrow: 'Hlavní oblast péče',
    lead: 'Pravidelná péče po celé těhotenství u jednoho lékaře. Pan doktor sleduje vývoj miminka, srozumitelně vysvětluje výsledky a odpovídá na otázky obou budoucích rodičů.',
    chips: ['Kontroly zhruba každé 3 týdny', 'Nově 8K ultrazvuk', 'Partner je vítán', 'Hrazeno pojišťovnou'],
    forWhomTitle: 'Pro koho je poradna',
    forWhom: [
      { title: 'Právě jste zjistila, že čekáte miminko', text: 'Potvrdíme těhotenství a vysvětlíme, jak bude péče v dalších měsících probíhat.' },
      { title: 'Hledáte lékaře na celé těhotenství', text: 'Jednotlivá vyšetření na sebe navazují a při každé návštěvě nezačínáte znovu.' },
      { title: 'Chcete u toho být oba', text: 'Na kontroly a ultrazvuková vyšetření může pacientku doprovodit také partner.' },
    ],
    stepsEyebrow: 'Průvodce těhotenstvím',
    stepsTitle: 'Jak péče probíhá',
    stepsIntro: 'Ultrazvukové kontroly probíhají zpravidla každé 3 týdny, genetická vyšetření doporučujeme podle fáze těhotenství. Harmonogram je orientační – konkrétní plán s vámi pan doktor vždy předem probere.',
    steps: [
      { label: 'První návštěva', title: 'Potvrzení těhotenství a plán péče', text: 'Probereme váš zdravotní stav, předchozí těhotenství a případné obtíže. Ultrazvukem potvrdíme těhotenství a domluvíme další kontroly.' },
      { label: '1. trimestr', title: 'Vstupní vyšetření a první screening', text: 'Vstupní odběry a vystavení těhotenského průkazu. Zpravidla mezi 11. a 14. týdnem se provádí screening v prvním trimestru – ultrazvuk a krevní testy.' },
      { label: '2. trimestr', title: 'Podrobný ultrazvuk a sledování vývoje', text: 'Kolem 20. až 22. týdne podrobné ultrazvukové vyšetření miminka, mezi 24. a 28. týdnem test na těhotenskou cukrovku. Možnost 4D ultrazvuku a 8K zobrazení tvářičky miminka.' },
      { label: '3. trimestr', title: 'Příprava na porod', text: 'Kontroly růstu a polohy miminka, vyšetření před porodem a včasné předání do péče vámi zvolené porodnice.' },
    ],
    prepare: BRING,
    prices: [
      { item: 'Pravidelné kontroly v těhotenství', price: 'hrazeno pojišťovnou' },
      { item: 'Prenatální balíček – genetické testy a 4D ultrazvuk', price: '2 500 Kč' },
      { item: '8K zobrazení miminka', price: 'sdělíme při objednání' },
      { item: 'Roční poplatek (materiál a konzultace)', price: '500 Kč' },
    ],
    priceNote: PRICE_NOTE,
    faq: [
      { q: 'Co je 8K ultrazvuk?', a: 'Je to realistické zobrazení tvářičky miminka vytvořené počítačovým zpracováním snímku z 3D/4D ultrazvuku. Jde o památeční obrázek, který neslouží k diagnostice; skutečná podoba miminka se může lišit a výsledek závisí na jeho poloze a týdnu těhotenství.' },
      { q: 'Pečujete také o těhotné pacientky, které u vás dosud nebyly?', a: 'Ano, podle aktuální kapacity ordinace. Při objednání nám napište, v jakém týdnu těhotenství jste.' },
      { q: 'Může se mnou na ultrazvuk partner?', a: 'Ano, na kontroly a ultrazvuková vyšetření vás může doprovodit.' },
      { q: 'Potřebuji doporučení od praktického lékaře?', a: 'Zpravidla ne. Pokud by bylo nutné pro konkrétní specializované vyšetření, informujeme vás při objednání.' },
      { q: 'Jak často budu na kontroly chodit?', a: 'Kontroly s ultrazvukem probíhají zpravidla každé 3 týdny, ke konci těhotenství častěji. Přesný plán záleží na průběhu těhotenství.' },
    ],
    related: ['lecba-neplodnosti', 'ambulantni-gynekologie', 'co2-laser-gynekologie'],
    reviewCats: ['tehotenstvi'],
    cta: 'Objednejte se do těhotenské poradny',
    seo: {
      title: 'Těhotenská poradna, 4D a 8K ultrazvuk Praha 4 | MUDr. Samer Asad',
      description: 'Těhotenská poradna v Praze 4 – Braníku. Pravidelné kontroly, genetická vyšetření, 4D a nově 8K ultrazvuk u jednoho lékaře. Partner je vítán.',
    },
  },
  {
    slug: 'lecba-neplodnosti',
    no: '02',
    name: 'Léčba neplodnosti',
    short: 'Citlivá diagnostika ženy i muže a návrh dalšího postupu.',
    tone: 'blush',
    image: 'newborn',
    imageAlt: 'Novorozené miminko v náručí',
    eyebrow: 'Reprodukční medicína',
    lead: 'Když se početí nedaří, nemusíte na to být sami. Začneme důkladným rozhovorem a diagnostikou ženy i muže, výsledky vám srozumitelně vysvětlíme a společně vybereme další postup.',
    chips: ['Vstupní konzultace ~ 45 min', 'Pro ženy i páry', 'Od 2 500 Kč'],
    forWhomTitle: 'Kdy je dobré přijít',
    forWhom: [
      { title: 'Snažíte se delší dobu', text: 'Obecně se doporučuje vyhledat lékaře po roce pravidelného snažení, po 35. roce věku už po šesti měsících.' },
      { title: 'Nejste si jistí, zda je vše v pořádku', text: 'Objednat se můžete i tehdy, když si jen chcete ověřit, že je vše v pořádku, nebo se na těhotenství připravit.' },
      { title: 'Chcete to řešit jako pár', text: 'Příčina může být na straně ženy, muže nebo obou. Na situaci se díváme komplexně a do rozhodování zapojujeme oba partnery.' },
    ],
    stepsEyebrow: 'Krok za krokem',
    stepsTitle: 'Jak diagnostika a léčba probíhá',
    stepsIntro: 'Od první konzultace přes případnou léčbu až po následnou péči budete vědět, co se právě děje a proč.',
    steps: [
      { label: 'Vstupní konzultace', title: 'V klidu probereme váš příběh', text: 'Přibližně 45 minut na váš zdravotní stav, menstruační cyklus, předchozí těhotenství a dosavadní vyšetření obou partnerů.' },
      { label: 'Diagnostika ženy', title: 'Ultrazvuk a hormonální vyšetření', text: 'Gynekologické a ultrazvukové vyšetření, podle potřeby hormonální profil včetně ovariální rezervy (AMH).' },
      { label: 'Vyšetření partnera', title: 'Díváme se na pár jako na celek', text: 'Podle situace doporučíme také vyšetření partnera, zpravidla spermiogram.' },
      { label: 'Další postup', title: 'Plán odpovídající vaší situaci', text: 'Výsledky vám srozumitelně vysvětlíme a navrhneme další kroky – od léčby v ordinaci po doporučení na specializované pracoviště asistované reprodukce.' },
    ],
    prepare: [...BRING.slice(0, 3), 'Výsledky dosavadních vyšetření obou partnerů (pokud je máte)', 'Záznam o délce cyklu za poslední měsíce'],
    prices: [
      { item: 'Vstupní konzultace při potížích s početím', price: 'od 2 500 Kč' },
      { item: 'Běžné gynekologické vyšetření', price: 'hrazeno pojišťovnou' },
    ],
    priceNote: PRICE_NOTE,
    faq: [
      { q: 'Kdy bychom měli začít řešit, že se nám nedaří otěhotnět?', a: 'Vhodný okamžik závisí na věku, zdravotním stavu a dosavadním průběhu snažení. Objednat se můžete i tehdy, když si pouze nejste jistí, zda je vše v pořádku. Pan doktor vaši situaci posoudí a doporučí další postup.' },
      { q: 'Vyšetřujete při problémech s početím také partnera?', a: 'Ano. Příčiny neplodnosti mohou být na straně ženy, muže nebo obou partnerů. Proto se při diagnostice vždy díváme na situaci páru jako na celek a podle potřeby doporučíme také vyšetření partnera.' },
      { q: 'Můžeme přijít na konzultaci společně?', a: 'Ano, partner je při konzultacích vítán. U vstupní konzultace je to dokonce výhodou.' },
      { q: 'Jak probíhá první návštěva při plánování těhotenství?', a: 'Nejprve probereme váš zdravotní stav, menstruační cyklus, předchozí těhotenství a případné obtíže. Pan doktor následně doporučí vhodné vyšetření a vysvětlí, jaké další kroky mohou být ve vaší situaci užitečné.' },
    ],
    related: ['hormonalni-poruchy', 'tehotenska-poradna-ultrazvuk', 'obezitologicka-poradna'],
    reviewCats: ['diagnostika', 'gynekologie'],
    cta: 'Objednejte se na vstupní konzultaci',
    seo: {
      title: 'Léčba neplodnosti Praha | MUDr. Samer Asad',
      description: 'Diagnostika a léčba neplodnosti v Praze 4. Vstupní konzultace pro ženy i páry, vyšetření AMH, ultrazvuk a srozumitelný plán dalšího postupu.',
    },
  },
  {
    slug: 'ambulantni-gynekologie',
    no: '03',
    name: 'Ambulantní gynekologie',
    short: 'Prevence, antikoncepce, akutní i dlouhodobé obtíže.',
    tone: 'blush',
    image: 'nurse',
    imageAlt: 'Zdravotní sestra s pacientkou a její holčičkou v ordinaci',
    eyebrow: 'Dlouhodobá péče',
    lead: 'Preventivní prohlídky, pravidelné kontroly a řešení akutních i dlouhodobých gynekologických obtíží. Součástí péče jsou konzultace antikoncepce a další vyšetření podle vašich potřeb.',
    chips: ['Preventivní prohlídka ~ 30 min', 'Hrazeno pojišťovnou', 'Přijímáme nové pacientky'],
    forWhomTitle: 'S čím vám pomůžeme',
    forWhom: [
      { title: 'Preventivní prohlídka', text: 'Pravidelná roční kontrola včetně cytologie (stěru z děložního čípku) a ultrazvuku.' },
      { title: 'Akutní nebo dlouhodobé potíže', text: 'Bolesti, výtok, nepravidelné krvácení, záněty. Vyšetření včetně kultivace a testů na pohlavně přenosné infekce.' },
      { title: 'Antikoncepce a prevence', text: 'Výběr vhodné antikoncepce, očkování proti HPV, vyšetření prsu a ošetření čípku kryoterapií.' },
    ],
    stepsEyebrow: 'Průběh návštěvy',
    stepsTitle: 'Jak prohlídka probíhá',
    stepsIntro: 'Každý krok vám pan doktor předem vysvětlí. Vyšetření můžete kdykoli přerušit a po celou dobu může být přítomna sestra nebo váš doprovod.',
    steps: [
      { label: 'Rozhovor', title: 'Nejdřív si popovídáme', text: 'Zeptáme se na váš zdravotní stav, cyklus, užívané léky a na to, co vás trápí nebo zajímá.' },
      { label: 'Vyšetření', title: 'Šetrné gynekologické vyšetření', text: 'Podle důvodu návštěvy vyšetření v zrcadlech, stěr na cytologii, ultrazvuk a případně další odběry.' },
      { label: 'Výsledky', title: 'Srozumitelné vysvětlení', text: 'Co je vidět hned, vysvětlíme na místě. Laboratorní výsledky vám sdělíme, jakmile je budeme mít.' },
      { label: 'Další péče', title: 'Navážeme tam, kde je třeba', text: 'Domluvíme léčbu, kontrolu nebo termín další preventivní prohlídky.' },
    ],
    prepare: BRING,
    prices: [
      { item: 'Preventivní prohlídka a běžná gynekologická péče', price: 'hrazeno pojišťovnou' },
      { item: 'Roční poplatek (materiál a neomezené konzultace)', price: '500 Kč' },
      { item: 'Kryoterapie', price: '1 000 Kč' },
    ],
    priceNote: PRICE_NOTE,
    faq: [
      { q: 'Přijímáte nové pacientky?', a: 'Ano, aktuálně přijímáme nové pacientky. Objednat se můžete online nebo telefonicky.' },
      { q: 'Jak dlouho preventivní prohlídka trvá?', a: 'Obvykle přibližně 30 minut.' },
      { q: 'Mohu se objednat, i když nejsem registrovanou pacientkou?', a: 'Ano, podle typu požadované péče a aktuální kapacity ordinace. Při objednání nám napište, zda hledáte nového gynekologa, jednorázovou konzultaci nebo specializované vyšetření.' },
      { q: 'Potřebuji doporučení od praktického lékaře?', a: 'Na běžné gynekologické vyšetření doporučení zpravidla nepotřebujete.' },
    ],
    related: ['nitrodelozni-telisko', 'hormonalni-poruchy', 'online-konzultace'],
    reviewCats: ['gynekologie'],
    cta: 'Objednejte se na prohlídku',
    seo: {
      title: 'Gynekolog Praha 4 – Braník | Ambulantní gynekologie',
      description: 'Gynekolog v Praze 4 přijímá nové pacientky. Preventivní prohlídky, cytologie, antikoncepce, očkování proti HPV a řešení gynekologických obtíží.',
    },
  },
  {
    slug: 'nitrodelozni-telisko',
    no: '04',
    name: 'Nitroděložní tělíska',
    short: 'Hormonální i nehormonální varianty včetně Levosertu.',
    tone: 'sage',
    image: 'desk',
    imageAlt: 'MUDr. Samer Asad při konzultaci v ordinaci',
    eyebrow: 'Dlouhodobá antikoncepce',
    lead: 'Zavádíme hormonální nitroděložní tělíska včetně Levosertu i nehormonální varianty. Vhodnou možnost s vámi pan doktor vybere podle zdravotního stavu, věku a plánování rodiny.',
    chips: ['Hormonální i nehormonální', 'Konzultace před zavedením', 'Kontrola po zavedení'],
    forWhomTitle: 'Pro koho je tělísko vhodné',
    forWhom: [
      { title: 'Hledáte dlouhodobou antikoncepci', text: 'Tělísko chrání několik let a nemusíte na ně každý den myslet.' },
      { title: 'Nevyhovuje vám hormonální antikoncepce v tabletách', text: 'Probereme hormonální i nehormonální varianty a jejich rozdíly.' },
      { title: 'Potřebujete tělísko vyměnit nebo vyjmout', text: 'Zajistíme výměnu i vyjmutí tělíska, například při plánování těhotenství.' },
    ],
    stepsEyebrow: 'Krok za krokem',
    stepsTitle: 'Jak zavedení probíhá',
    stepsIntro: 'O vhodnosti tělíska vždy rozhoduje lékař po vyšetření. Vše vám předem vysvětlí a odpoví na vaše otázky.',
    steps: [
      { label: 'Konzultace', title: 'Výběr vhodného typu', text: 'Probereme váš zdravotní stav, očekávání a plány. Pan doktor doporučí hormonální nebo nehormonální variantu.' },
      { label: 'Vyšetření', title: 'Gynekologické vyšetření a ultrazvuk', text: 'Před zavedením ověříme, že nic nebrání bezpečnému zavedení tělíska.' },
      { label: 'Zavedení', title: 'Krátký ambulantní výkon', text: 'Zavedení probíhá v ordinaci za asistence sestry. Jeho načasování s vámi domluvíme podle cyklu.' },
      { label: 'Kontrola', title: 'Ověření polohy tělíska', text: 'Při kontrole ultrazvukem ověříme správnou polohu a probereme, jak se cítíte.' },
    ],
    prepare: [...BRING.slice(0, 3), 'Datum poslední menstruace – zavedení plánujeme podle cyklu'],
    prices: [
      { item: 'Konzultace a zavedení tělíska', price: 'dle typu tělíska' },
      { item: 'Kontrola po zavedení', price: 'sdělíme při konzultaci' },
    ],
    priceNote: 'Cena se liší podle typu tělíska. Přesnou cenu vám sdělíme při konzultaci, vždy před výkonem.',
    faq: [
      { q: 'Jaký je rozdíl mezi hormonálním a nehormonálním tělískem?', a: 'Hormonální tělísko uvolňuje malé množství hormonu přímo v děloze, nehormonální působí bez hormonů. Každé má své výhody – vhodnou variantu vám pan doktor doporučí podle vašeho zdravotního stavu a přání.' },
      { q: 'Je tělísko vhodné i pro ženy, které ještě nerodily?', a: 'V řadě případů ano. Vhodnost vždy individuálně posoudí lékař při konzultaci.' },
      { q: 'Kolik zavedení stojí?', a: 'Cena závisí na typu tělíska. Sdělíme vám ji při konzultaci, vždy předem.' },
    ],
    related: ['ambulantni-gynekologie', 'hormonalni-poruchy', 'online-konzultace'],
    reviewCats: ['gynekologie'],
    cta: 'Objednejte se na konzultaci',
    seo: {
      title: 'Zavedení nitroděložního tělíska Praha 4 | MUDr. Samer Asad',
      description: 'Zavedení hormonálního (Levosert) i nehormonálního nitroděložního tělíska v Praze 4. Konzultace, výběr vhodného typu, zavedení a kontrola.',
    },
  },
  {
    slug: 'hormonalni-poruchy',
    no: '05',
    name: 'Hormonální potíže',
    short: 'Diagnostika a léčba obtíží ovlivňujících cyklus a plodnost.',
    tone: 'blush',
    image: 'desk',
    imageAlt: 'MUDr. Samer Asad v ordinaci',
    eyebrow: 'Gynekologická endokrinologie',
    lead: 'Diagnostika a léčba hormonálních obtíží u dívek a žen přibližně od 15 do 50 let. Péče se zaměřuje na potíže, které mohou ovlivňovat menstruační cyklus, plodnost i celkovou kvalitu života.',
    chips: ['Dívky a ženy 15–50 let', 'Odběry v ordinaci', 'Individuální plán'],
    forWhomTitle: 'S čím nejčastěji přicházíte',
    forWhom: [
      { title: 'Nepravidelná nebo chybějící menstruace', text: 'Včetně podezření na syndrom polycystických ovarií (PCOS) nebo zvýšenou hladinu prolaktinu.' },
      { title: 'Potíže spojené s plodností', text: 'Vyšetření ovariální rezervy (AMH) a hormonů, které ovlivňují ovulaci, včetně funkce štítné žlázy.' },
      { title: 'Období přechodu', text: 'Návaly, poruchy spánku a další obtíže spojené s menopauzou. Probereme možnosti, jak je zmírnit.' },
    ],
    stepsEyebrow: 'Krok za krokem',
    stepsTitle: 'Jak vyšetření probíhá',
    stepsIntro: 'Hormony spolu úzce souvisejí. Proto se díváme na celkový obraz, ne jen na jednu hodnotu z laboratoře.',
    steps: [
      { label: 'Konzultace', title: 'Podrobný rozhovor', text: 'Probereme vaše obtíže, cyklus, užívané léky a rodinnou anamnézu.' },
      { label: 'Vyšetření', title: 'Ultrazvuk a krevní odběry', text: 'Gynekologický ultrazvuk a odběr krve na hormonální profil. Načasování odběru se řídí fází cyklu.' },
      { label: 'Vyhodnocení', title: 'Vysvětlení výsledků', text: 'Výsledky vám pan doktor srozumitelně vysvětlí a ukáže, co znamenají pro váš cyklus a plodnost.' },
      { label: 'Léčba', title: 'Individuální plán a kontroly', text: 'Navrhneme léčbu a kontroly. Je-li to potřeba, doporučíme spolupráci s dalším specialistou.' },
    ],
    prepare: [...BRING.slice(0, 3), 'Záznam o menstruačním cyklu za poslední měsíce', 'Předchozí hormonální výsledky (pokud je máte)'],
    prices: [
      { item: 'Gynekologické vyšetření a konzultace', price: 'hrazeno pojišťovnou' },
      { item: 'Vyšetření nad rámec úhrady pojišťovny', price: 'sdělíme předem' },
    ],
    priceNote: PRICE_NOTE,
    faq: [
      { q: 'Od kolika let se k vám může dívka objednat?', a: 'Hormonální potíže řešíme u dívek a žen přibližně od 15 let. U nezletilých je vhodný doprovod zákonného zástupce.' },
      { q: 'Kdy je nejlepší přijít na odběr hormonů?', a: 'Záleží na tom, které hormony vyšetřujeme. Vhodný den cyklu vám sdělíme při objednání nebo při konzultaci.' },
      { q: 'Vyšetřujete také ovariální rezervu (AMH)?', a: 'Ano. Vyšetření AMH pomáhá odhadnout zásobu vajíček a je užitečné hlavně při plánování těhotenství.' },
    ],
    related: ['lecba-neplodnosti', 'obezitologicka-poradna', 'ambulantni-gynekologie'],
    reviewCats: ['diagnostika'],
    cta: 'Objednejte se na konzultaci',
    seo: {
      title: 'Hormonální potíže a PCOS – gynekolog Praha 4 | MUDr. Samer Asad',
      description: 'Diagnostika a léčba hormonálních potíží v Praze 4: nepravidelná menstruace, PCOS, prolaktin, štítná žláza, AMH a obtíže v období menopauzy.',
    },
  },
  {
    slug: 'obezitologicka-poradna',
    no: '06',
    name: 'Obezitologická a metabolická poradna',
    short: 'Péče při nadváze a metabolických obtížích.',
    tone: 'sage',
    image: 'desk',
    imageAlt: 'MUDr. Samer Asad při konzultaci',
    eyebrow: 'Metabolické zdraví',
    lead: 'Odborná péče při nadváze, obezitě a metabolických obtížích, které mohou ovlivňovat hormonální rovnováhu, plodnost i průběh těhotenství. Další postup stanovujeme individuálně.',
    chips: ['Vstupní konzultace', 'Individuální plán péče', 'Návaznost na gynekologii'],
    forWhomTitle: 'Pro koho je poradna',
    forWhom: [
      { title: 'Plánujete těhotenství', text: 'Úprava hmotnosti a metabolismu může zlepšit pravidelnost cyklu i šanci na otěhotnění.' },
      { title: 'Řešíte hormonální nerovnováhu', text: 'Nadváha často souvisí s nepravidelným cyklem nebo syndromem polycystických ovarií.' },
      { title: 'Chcete bezpečnější těhotenství', text: 'Péče o hmotnost před těhotenstvím a během něj snižuje riziko některých komplikací.' },
    ],
    stepsEyebrow: 'Krok za krokem',
    stepsTitle: 'Jak poradna probíhá',
    stepsIntro: 'Hmotnost řešíme s respektem a bez odsuzování – jako součást péče o vaše zdraví.',
    steps: [
      { label: 'Vstupní konzultace', title: 'Zmapujeme výchozí stav', text: 'Probereme váš zdravotní stav, dosavadní pokusy o redukci, životní styl a cíle.' },
      { label: 'Vyšetření', title: 'Odběry a metabolický profil', text: 'Podle potřeby doporučíme krevní testy zaměřené na metabolismus a hormony.' },
      { label: 'Plán péče', title: 'Realistické kroky', text: 'Společně sestavíme plán odpovídající vašemu zdraví a možnostem, včetně případné léčby.' },
      { label: 'Kontroly', title: 'Průběžná podpora', text: 'Na pravidelných kontrolách vyhodnotíme pokrok a plán podle potřeby upravíme.' },
    ],
    prepare: [...BRING.slice(0, 3), 'Výsledky posledních krevních testů (pokud je máte)'],
    prices: [{ item: 'Vstupní konzultace a plán péče', price: 'sdělíme při objednání' }],
    priceNote: PRICE_NOTE,
    faq: [
      { q: 'Proč řešit hmotnost u gynekologa?', a: 'Nadváha a metabolické obtíže mohou ovlivňovat hormonální rovnováhu, menstruační cyklus, plodnost i průběh těhotenství. Proto dává smysl řešit je v návaznosti na gynekologickou péči.' },
      { q: 'Je poradna jen pro pacientky plánující těhotenství?', a: 'Ne. Je určena všem pacientkám, u nichž hmotnost nebo metabolismus ovlivňuje gynekologické zdraví.' },
    ],
    related: ['hormonalni-poruchy', 'lecba-neplodnosti', 'tehotenska-poradna-ultrazvuk'],
    reviewCats: ['diagnostika'],
    cta: 'Objednejte se na vstupní konzultaci',
    seo: {
      title: 'Obezitologická a metabolická poradna Praha 4 | MUDr. Samer Asad',
      description: 'Obezitologická poradna v gynekologické ambulanci v Praze 4. Péče při nadváze a metabolických obtížích ovlivňujících hormony, plodnost a těhotenství.',
    },
  },
  {
    slug: 'co2-laser-gynekologie',
    no: '07',
    name: 'CO₂ laserová gynekologie',
    short: 'Šetrné ošetření změn po porodu a vaginálních obtíží.',
    tone: 'plum',
    image: 'desk',
    imageAlt: 'MUDr. Samer Asad v ordinaci',
    eyebrow: 'Laserové ošetření',
    lead: 'Šetrné laserové ošetření změn po porodu, chronických vaginálních obtíží, věkem podmíněných změn poševní tkáně a lehkého stupně inkontinence. Vhodnost zákroku vždy nejprve individuálně posoudí lékař.',
    chips: ['Balíček 3 procedur', '7 000 Kč', 'Ambulantně, bez hospitalizace'],
    forWhomTitle: 'Kdy může laser pomoci',
    forWhom: [
      { title: 'Změny po porodu', text: 'Ošetření poševní tkáně, která se po porodu změnila a působí vám obtíže.' },
      { title: 'Suchost a změny v období přechodu', text: 'Věkem podmíněné změny poševní sliznice spojené s nepohodlím nebo bolestí.' },
      { title: 'Lehký únik moči', text: 'Lehký stupeň stresové inkontinence, například při kašli, smíchu nebo sportu.' },
    ],
    stepsEyebrow: 'Krok za krokem',
    stepsTitle: 'Jak ošetření probíhá',
    stepsIntro: 'Výsledek ošetření je individuální. Zda je pro vás laser vhodný, posoudí pan doktor při vstupním vyšetření.',
    steps: [
      { label: 'Konzultace', title: 'Posouzení vhodnosti', text: 'Gynekologické vyšetření a rozhovor o vašich obtížích, očekáváních a případných kontraindikacích.' },
      { label: 'Ošetření', title: 'Ambulantní zákrok', text: 'Ošetření probíhá v ordinaci a nevyžaduje hospitalizaci. Průběh vám pan doktor předem vysvětlí.' },
      { label: 'Série', title: 'Tři procedury', text: 'Ošetření se zpravidla opakuje – balíček zahrnuje 3 procedury s odstupem, který stanoví lékař.' },
      { label: 'Kontrola', title: 'Vyhodnocení efektu', text: 'Po dokončení série zhodnotíme výsledek a doporučíme další péči.' },
    ],
    prepare: [...BRING.slice(0, 3), 'Výsledek poslední preventivní prohlídky a cytologie'],
    prices: [{ item: 'Balíček 3 laserových procedur', price: '7 000 Kč' }],
    priceNote: 'Laserové ošetření není hrazeno ze zdravotního pojištění. Před zahájením vždy probíhá konzultace s lékařem.',
    faq: [
      { q: 'Je ošetření hrazeno pojišťovnou?', a: 'Ne, jde o samoplátecký výkon. Balíček 3 procedur stojí 7 000 Kč.' },
      { q: 'Pro koho ošetření není vhodné?', a: 'Vhodnost vždy individuálně posoudí lékař při konzultaci a gynekologickém vyšetření. Ošetření se neprovádí například v těhotenství nebo při akutním zánětu.' },
      { q: 'Kolik ošetření budu potřebovat?', a: 'Standardní balíček zahrnuje 3 procedury. Přesný postup stanoví pan doktor podle vašich obtíží.' },
    ],
    related: ['ambulantni-gynekologie', 'hormonalni-poruchy', 'tehotenska-poradna-ultrazvuk'],
    reviewCats: ['gynekologie'],
    cta: 'Objednejte se na konzultaci',
    seo: {
      title: 'CO₂ laser v gynekologii Praha 4 | MUDr. Samer Asad',
      description: 'CO₂ laserová gynekologie v Praze 4: ošetření změn po porodu, vaginálních obtíží a lehké inkontinence. Balíček 3 procedur za 7 000 Kč.',
    },
  },
  {
    slug: 'online-konzultace',
    no: '08',
    name: 'Online konzultace',
    short: 'Videokonzultace s panem doktorem z domova.',
    tone: 'sage',
    image: 'desk',
    imageAlt: 'MUDr. Samer Asad u počítače v ordinaci',
    eyebrow: 'Na dálku',
    lead: 'Videokonzultace s panem doktorem z pohodlí domova. Hodí se, když chcete probrat výsledky, poradit se o dalším postupu nebo získat druhý názor a nepotřebujete fyzické vyšetření.',
    chips: ['Videohovor přes ZnámýLékař', '1 500 Kč', 'Česky i anglicky'],
    forWhomTitle: 'Kdy se online konzultace hodí',
    forWhom: [
      { title: 'Chcete probrat výsledky', text: 'Vysvětlení laboratorních výsledků a lékařských zpráv a domluva dalšího postupu.' },
      { title: 'Potřebujete se poradit', text: 'Plánování těhotenství, antikoncepce, hormonální potíže nebo druhý názor.' },
      { title: 'Jste mimo Prahu nebo v zahraničí', text: 'Konzultace je možná odkudkoli, v češtině, angličtině a dalších jazycích.' },
    ],
    stepsEyebrow: 'Krok za krokem',
    stepsTitle: 'Jak online konzultace probíhá',
    stepsIntro: 'Online konzultace nenahrazuje gynekologické vyšetření. Při akutních potížích – silné bolesti, krvácení nebo horečce – se objednejte osobně nebo vyhledejte pohotovost.',
    steps: [
      { label: 'Objednání', title: 'Vyberete si termín', text: 'Na ZnámýLékař zvolíte službu „Online konzultace“ a volný termín.' },
      { label: 'Příprava', title: 'Připravíte si podklady', text: 'Mějte po ruce výsledky, zprávy a seznam otázek, které chcete probrat.' },
      { label: 'Videohovor', title: 'Spojíte se s panem doktorem', text: 'V domluvený čas se připojíte přes odkaz, který obdržíte po objednání.' },
      { label: 'Další kroky', title: 'Doporučení a případná návštěva', text: 'Pan doktor shrne doporučení. Je-li potřeba vyšetření, domluvíte se na osobní návštěvě.' },
    ],
    prepare: ['Stabilní připojení k internetu a klidné místo', 'Výsledky a lékařské zprávy, které chcete probrat', 'Seznam léků, které užíváte', 'Sepsané otázky'],
    prices: [{ item: 'Online videokonzultace', price: '1 500 Kč' }],
    priceNote: 'Online konzultace je samoplátecká služba objednávaná a hrazená přes ZnámýLékař.',
    faq: [
      { q: 'Co lze online vyřešit a co ne?', a: 'Online můžeme probrat výsledky, další postup, antikoncepci nebo plánování těhotenství. Cokoli, co vyžaduje vyšetření, ultrazvuk nebo odběr, je potřeba řešit osobně v ordinaci.' },
      { q: 'V jakém jazyce konzultace probíhá?', a: 'Česky, anglicky, francouzsky, italsky nebo arabsky.' },
      { q: 'Jak za konzultaci zaplatím?', a: 'Platba probíhá online při objednání přes ZnámýLékař.' },
    ],
    related: ['ambulantni-gynekologie', 'lecba-neplodnosti', 'hormonalni-poruchy'],
    reviewCats: ['gynekologie'],
    cta: 'Objednejte si online konzultaci',
    seo: {
      title: 'Online konzultace s gynekologem | MUDr. Samer Asad',
      description: 'Online videokonzultace s gynekologem MUDr. Samerem Asadem. Výsledky, další postup, druhý názor – česky i anglicky, 1 500 Kč.',
    },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug)!;
