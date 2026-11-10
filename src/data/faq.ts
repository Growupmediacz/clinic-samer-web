/** Časté dotazy – převzato ze starého webu, rozděleno do 4 skupin. */
export interface FaqItem { q: string; a: string }
export interface FaqGroup { id: string; title: string; items: FaqItem[] }

export const faqGroups: FaqGroup[] = [
  {
    id: 'objednani',
    title: 'Objednání a návštěva',
    items: [
      { q: 'Přijímáte nové pacientky?', a: 'Ano, aktuálně přijímáme nové pacientky. Objednat se můžete online nebo telefonicky. Při objednání nám stručně napište, s čím přicházíte, abychom pro vás mohli vybrat vhodný typ návštěvy.' },
      { q: 'Mohu se objednat, i když nejsem registrovanou pacientkou?', a: 'Ano, podle typu požadované péče a aktuální kapacity ordinace. Při objednání nám napište, zda hledáte nového gynekologa, jednorázovou konzultaci nebo specializované vyšetření.' },
      { q: 'Potřebuji doporučení od praktického lékaře?', a: 'Na běžné gynekologické vyšetření doporučení praktického lékaře zpravidla nepotřebujete. Pokud by bylo doporučení nutné pro konkrétní specializované vyšetření, informujeme vás při objednání.' },
      { q: 'Jak dlouho návštěva trvá?', a: 'Délka závisí na typu návštěvy. Preventivní prohlídka obvykle trvá přibližně 30 minut, vstupní konzultace při problémech s početím přibližně 45 minut.' },
      { q: 'Mohu přijít na konzultaci nebo vyšetření s partnerem?', a: 'Ano. Partner je při konzultacích a vybraných vyšetřeních vítán, pokud si jeho přítomnost přejete a charakter daného vyšetření to umožňuje.' },
      { q: 'V jakých jazycích se lze v ordinaci domluvit?', a: 'V ordinaci se domluvíte česky, anglicky, francouzsky, italsky a arabsky.' },
      { q: 'Kde ordinace sídlí?', a: 'Ordinace se nachází na adrese Branická 479/21, 147 00 Praha 4 – Braník.' },
    ],
  },
  {
    id: 'neplodnost',
    title: 'Plánování těhotenství a neplodnost',
    items: [
      { q: 'Jak probíhá první návštěva při plánování těhotenství?', a: 'Nejprve probereme váš zdravotní stav, menstruační cyklus, předchozí těhotenství a případné obtíže. Pan doktor následně doporučí vhodné vyšetření a vysvětlí, jaké další kroky mohou být ve vaší situaci užitečné.' },
      { q: 'Kdy bychom měli začít řešit, že se nám nedaří otěhotnět?', a: 'Vhodný okamžik závisí na věku, zdravotním stavu a dosavadním průběhu snažení. Objednat se můžete i tehdy, když si pouze nejste jistí, zda je vše v pořádku. Pan doktor vaši situaci posoudí a doporučí další postup.' },
      { q: 'Vyšetřujete při problémech s početím také partnera?', a: 'Ano. Příčiny neplodnosti mohou být na straně ženy, muže nebo obou partnerů. Proto se při diagnostice vždy díváme na situaci páru jako na celek a podle potřeby doporučíme také vyšetření partnera.' },
    ],
  },
  {
    id: 'tehotenstvi',
    title: 'Těhotenství',
    items: [
      { q: 'Pečujete také o těhotné pacientky?', a: 'Ano. Poskytujeme pravidelné kontroly a gynekologickou péči během těhotenství. Průběh péče a jednotlivá vyšetření s vámi pan doktor vždy předem probere.' },
      { q: 'Může se mnou na ultrazvuk partner?', a: 'Ano, na kontroly a ultrazvuková vyšetření vás může doprovodit.' },
    ],
  },
  {
    id: 'platby',
    title: 'Platby a pojišťovny',
    items: [
      { q: 'Co hradí zdravotní pojišťovna?', a: 'Běžná gynekologická péče je u smluvních pojišťoven hrazena z veřejného zdravotního pojištění. Některá specializovaná vyšetření a zákroky jsou samoplátecké. O případné ceně vás vždy informujeme předem.' },
      { q: 'Se kterými pojišťovnami máte smlouvu?', a: 'VZP (111), VoZP (201), ČPZP (205), OZP (207), ZP Škoda (209), ZPMV (211) a RBP (213). Ošetřujeme také cizinky pojištěné u PVZP a UNIQA.' },
    ],
  },
];

/** 5 nejčastějších otázek na homepage. */
export const homeFaq: FaqItem[] = [
  faqGroups[0].items[0],
  faqGroups[0].items[4],
  faqGroups[3].items[0],
  faqGroups[1].items[1],
  faqGroups[0].items[5],
];

export const firstVisitSteps = [
  { title: 'Napište nám, s čím přicházíte', text: 'Vyberte důvod návštěvy a objednejte se online nebo telefonicky.' },
  { title: 'Domluvíme vhodný termín', text: 'Potvrdíme vám termín a řekneme, zda si máte přinést předchozí výsledky nebo jinou dokumentaci.' },
  { title: 'V klidu vše probereme', text: 'Pan doktor se seznámí s vaším zdravotním stavem, vyslechne vaše obavy a srozumitelně vysvětlí možnosti péče.' },
  { title: 'Navážeme další péčí', text: 'Podle výsledků společně stanovíme další postup, doporučíme vhodná vyšetření a domluvíme případné kontroly.' },
];

/** Ceník samoplátců – známé položky (web + ZnámýLékař). K potvrzení klientem. */
export const priceList = [
  { item: 'Roční poplatek', note: 'materiál a neomezené konzultace', price: '500 Kč' },
  { item: 'Vstupní konzultace při potížích s početím', note: 'přibližně 45 minut, pro ženy i páry', price: 'od 2 500 Kč' },
  { item: 'Prenatální balíček', note: 'genetické testy a 4D ultrazvuk', price: '2 500 Kč' },
  { item: 'Kryoterapie', note: 'ošetření děložního čípku', price: '1 000 Kč' },
  { item: 'CO₂ laserová gynekologie', note: 'balíček 3 procedur', price: '7 000 Kč' },
  { item: 'Online videokonzultace', note: 'přes ZnámýLékař', price: '1 500 Kč' },
  { item: 'Nitroděložní tělísko – konzultace a zavedení', note: 'hormonální i nehormonální', price: 'dle typu tělíska' },
];

export const covered = [
  'Preventivní gynekologická prohlídka včetně cytologie',
  'Běžná gynekologická vyšetření a léčba obtíží',
  'Pravidelné kontroly v těhotenské poradně',
  'Vyšetření při hormonálních potížích v rozsahu úhrady pojišťovny',
];
