import { en, type Dict, type UI } from './en';
import { de } from './de';
import { it } from './it';
import { ar } from './ar';
import { csUi } from './cs';
import type { Lang, IntlLang } from '../data/site';

/** Kompletní slovníky cizojazyčných verzí (Home, Services, About, Contact). */
export const dict: Record<IntlLang, Dict> = { en, de, it, ar };
/** Texty rozhraní (hlavička, patička, cookie lišta, CTA) pro všech 5 jazyků. */
export const ui: Record<Lang, UI> = { cs: csUi, en: en.ui, de: de.ui, it: it.ui, ar: ar.ui };
export type { Dict, UI };
