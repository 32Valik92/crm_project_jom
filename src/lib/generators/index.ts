// lib/generators/index.ts
// Експортуємо генератори для index.ts файлів кожного розділу локалі
export {indexForAbout} from "./about";
export {indexForApp} from "./app";
export {indexForBonus} from "./bonus";
export {indexForBonusCashback} from "./bonus_cashback";
export {indexForBonusDeposit} from "./bonus_deposit";
export {indexForBonusFreespin} from "./bonus_freespin";
export {indexForBonusPromocode} from "./bonus_promocode";
export {indexForResponsibleGame} from "./responsiblegame";
export { indexForSlots } from "./slots";
export {indexForSlotsAviator} from "./slots_aviator";
export { indexForSlotsBookOfDead } from "./slots_bookofdead";
export { indexForSlotsBookOfRaDeluxe } from "./slots_bookofradeluxe";
export { indexForSlotsChickenRoad } from "./slots_chickenroad";
export { indexForSlotsFruitCocktail } from "./slots_fruitcocktail";
export { indexForSlotsPlinko } from "./slots_plinko";
export { indexForSlotsPopular } from "./slots_popular";

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
 * @param hasResponsibleGame - "ResponsibleGame"
 * @param hasSlots - "slots"
 * @param hasSlotsAviator - "slots_aviator"
 * @param hasSlotsBookOfDead - "slots__bookOfDead"
 * @param hasSlotsBookOfRaDeluxe - "Slots_BookOfRaDeluxe"
 * @param hasSlotsChickenRoad - "Slots_ChickenRoad"
 * @param hasSlotsFruitCocktail - "Slots_FruitCocktail"
 * @param hasSlotsPlinko - "Slots_Plinko"
 * @param hasSlotsPopular - "Slots_Popular"
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
    hasHeader: boolean,
    hasResponsibleGame: boolean,
    hasSlots: boolean,
    hasSlotsAviator: boolean,
    hasSlotsBookOfDead: boolean,
    hasSlotsBookOfRaDeluxe: boolean,
    hasSlotsChickenRoad: boolean,
    hasSlotsFruitCocktail: boolean,
    hasSlotsPlinko: boolean,
    hasSlotsPopular: boolean,
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

    if (hasResponsibleGame) lines.push("export { default as responsiblegame } from './responsiblegame';");

    if (hasSlots) lines.push("export { default as slots } from './slots';");

    if (hasSlotsAviator) lines.push("export { default as slots_aviator } from './slots_aviator';");

    if (hasSlotsBookOfDead) lines.push("export { default as slots_bookofdead } from './slots_bookofdead';");

    if (hasSlotsBookOfRaDeluxe) lines.push("export { default as slots_bookofradeluxe } from './slots_bookofradeluxe';");

    if (hasSlotsChickenRoad) lines.push("export { default as slots_chickenroad } from './slots_chickenroad';");

    if (hasSlotsFruitCocktail) lines.push("export { default as slots_fruitcocktail } from './slots_fruitcocktail';");

    if (hasSlotsPlinko) lines.push("export { default as slots_plinko } from './slots_plinko';");

    if (hasSlotsPopular) lines.push("export { default as slots_popular } from './slots_popular';");

    // Об’єднуємо рядки у єдиний текст, додаючи перенос рядка між ними
    // Якщо масив порожній — повертаємо пустий рядок
    return lines.join("\n") + (lines.length ? "\n" : "");
}
