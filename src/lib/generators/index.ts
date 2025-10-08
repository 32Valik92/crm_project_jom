// lib/generators/index.ts
// Експортуємо генератори для index.ts файлів кожного розділу локалі
export { indexForAbout } from "./about";
export { indexForApp } from "./app";
export { indexForBonus } from "./bonus";
export { indexForBonusCashback } from "./bonus_cashback";
export { indexForBonusDeposit } from "./bonus_deposit";
export { indexForBonusFreespin } from "./bonus_freespin";
export { indexForBonusPromocode } from "./bonus_promocode";

/**
 * Генератор головного файлу index.ts у кореневій папці локалі.
 *
 * @param hasAbout - чи є згенеровані дані для сторінки "about"
 * @param hasApp - чи є згенеровані дані для сторінки "app"
 * @param hasBonus - чи є згенеровані дані для сторінки "bonus"
 * @param hasBonusCashback - "bonus_cashback"
 * @param hasBonusDeposit - "bonus_deposit"
 * @param hasBonusFreebet - "bonus_freebet"
 * @param hasBonusFreespin - "bonus_freespin"
 * @param hasBonusPromocode - "bonus_promocode"
 * @param hasContacts - "contacts"
 * @param hasFaq - "faq"
 * @param hasFooter - "footer"
 * @param hasHeader - "header"
 * @returns Вміст текстового файлу index.ts як рядок
 *
 * Приклад результату, якщо є обидва розділи:
 *   export { default as about } from './about';
 *   export { default as app } from './app';
 */
export function rootIndex(
    hasAbout: boolean,
    hasApp: boolean,
    hasBonus: boolean,
    hasBonusCashback: boolean,
    hasBonusDeposit: boolean,
    hasBonusFreebet: boolean,
    hasBonusFreespin: boolean,
    hasBonusPromocode: boolean,
    hasContacts: boolean,
    hasFaq: boolean,
    hasFooter: boolean,
    hasHeader: boolean



) {
    // Створюємо масив рядків для майбутнього вмісту index.ts
    const lines: string[] = [];

    // Якщо є about — додаємо рядок для експорту папки "about"
    if (hasAbout) lines.push("export { default as about } from './about';");

    // Якщо є app — додаємо рядок для експорту папки "app"
    if (hasApp) lines.push("export { default as app } from './app';");

    if (hasBonus) lines.push("export { default as bonus } from './bonus';");

    if (hasBonusCashback) lines.push("export { default as bonus_cashback } from './bonus_cashback';");

    if (hasBonusDeposit) lines.push("export { default as bonus_deposit } from './bonus_deposit';");

    if (hasBonusFreebet) lines.push("export { default as bonus_freebet } from './bonus_freebet';");

    if (hasBonusFreespin) lines.push("export { default as bonus_freespin } from './bonus_freespin';");

    if (hasBonusPromocode) lines.push("export { default as bonus_promocode } from './bonus_promocode';");

    if (hasContacts) lines.push("export { default as contacts } from './contacts';");

    if (hasFaq) lines.push("export { default as faq } from './faq';");

    if (hasFooter) lines.push("export { default as footer } from './footer';");

    if (hasHeader) lines.push("export { default as header } from './header';");

    // Об’єднуємо рядки у єдиний текст, додаючи перенос рядка між ними
    // Якщо масив порожній — повертаємо пустий рядок
    return lines.join("\n") + (lines.length ? "\n" : "");
}
