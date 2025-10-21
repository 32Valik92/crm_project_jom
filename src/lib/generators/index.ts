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
export { indexForSportsbook } from "./sportsbook";
export { indexForSportsbookBasketball } from "./sportsbook_basketball";
export { indexForSportsbookFootball } from "./sportsbook_football";
export { indexForHome } from "./home";


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
 * @param hasHome - "home"
 * @param hasResponsibleGame - "ResponsibleGame"
 * @param hasSlots - "slots"
 * @param hasSlotsAviator - "slots_aviator"
 * @param hasSlotsBookOfDead - "slots__bookOfDead"
 * @param hasSlotsBookOfRaDeluxe - "Slots_BookOfRaDeluxe"
 * @param hasSlotsChickenRoad - "Slots_ChickenRoad"
 * @param hasSlotsFruitCocktail - "Slots_FruitCocktail"
 * @param hasSlotsPlinko - "Slots_Plinko"
 * @param hasSlotsPopular - "Slots_Popular"
 * @param hasSportsbook - "Sportsbook"
 * @param hasSportsbookBasketball - "Sportsbook_Basketball"
 * @param hasSportsbookFootball - "Sportsbook_Football"
 * @param hasSeo - "Seo"
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
    hasHome: boolean,
    hasResponsibleGame: boolean,
    hasSlots: boolean,
    hasSlotsAviator: boolean,
    hasSlotsBookOfDead: boolean,
    hasSlotsBookOfRaDeluxe: boolean,
    hasSlotsChickenRoad: boolean,
    hasSlotsFruitCocktail: boolean,
    hasSlotsPlinko: boolean,
    hasSlotsPopular: boolean,
    hasSportsbook: boolean,
    hasSportsbookBasketball: boolean,
    hasSportsbookFootball: boolean,
    hasSeo: boolean
) {
    const imports: string[] = [];
    const spreads: string[] = [];

    const add = (flag: boolean, name: string, path?: string) => {
        if (flag) {
            const importPath = path || `./${name}`;
            imports.push(`import ${name} from "${importPath}";`);
            spreads.push(`    ...${name},`);
        }
    };

    add(hasAbout, "about");
    add(hasApp, "app");
    add(hasBonus, "bonus");
    add(hasBonusCashback, "bonus_cashback");
    add(hasBonusDeposit, "bonus_deposit");
    add(hasBonusFreebet, "bonus_freebet");
    add(hasBonusFreespin, "bonus_freespin");
    add(hasBonusPromocode, "bonus_promocode");
    add(hasContacts, "contacts");
    add(hasFaq, "faq");
    add(hasFooter, "footer");
    add(hasHeader, "header");
    add(hasHome, "home");
    add(hasResponsibleGame, "responsiblegame");
    add(hasSlots, "slots");
    add(hasSlotsAviator, "slots_aviator");
    add(hasSlotsBookOfDead, "slots_bookofdead");
    add(hasSlotsBookOfRaDeluxe, "slots_bookofradeluxe");
    add(hasSlotsChickenRoad, "slots_chickenroad");
    add(hasSlotsFruitCocktail, "slots_fruitcocktail");
    add(hasSlotsPlinko, "slots_plinko");
    add(hasSlotsPopular, "slots_popular");
    add(hasSportsbook, "sportsbook");
    add(hasSportsbookBasketball, "sportsbook_basketball");
    add(hasSportsbookFootball, "sportsbook_football");
    add(hasSeo, "seo", "./seo.json");

    if (imports.length === 0) return "";

    return (
        imports.join("\n") +
        "\n\n" +
        "export default {\n" +
        spreads.join("\n") +
        "\n} as const;\n"
    );
}
