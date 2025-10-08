// lib/schemas/catalog.ts
// --- Єдина точка правди (Single Source of Truth) ---
// Тут визначено всі сторінки сайту, їхні блоки та метадані для генерації JSON.

// --- Тип для ключів сторінок ---
export type PageKey =
    | "about" | "app"
    | "bonus" | "bonus_cashback" | "bonus_deposit" | "bonus_freebet" | "bonus_freespin" | "bonus_promocode"
    | "contacts" | "faq" | "footer" | "header";

// --- Тип для ключів блоків контенту ---
export type BlockKey =
    | "about_primary" | "app_about_primary" | "mobile_app"
    | "bonus_about_primary" | "bonus_bonuses" | "bonus_hero"
    | "bonus_cashback_about_primary"
    | "bonus_deposit_about_primary" | "bonus_deposit_bonuses"
    | "bonus_freebet_about_primary" | "bonus_freebet_bonuses"
    | "bonus_freespin_about_primary" | "bonus_freespin_bonuses"
    | "bonus_promocode_about_primary" | "bonus_promocode_bonuses"
    | "contacts_about_primary" | "contacts_about_secondary"
    | "faq_about_primary"
    | "footer_footer"
    | "header_header";

// --- Реєстр сторінок та пов’язаних із ними блоків ---
export const PAGES: Record<PageKey, { label: string; blocks: BlockKey[] }> = {
    about: { label: "About page", blocks: ["about_primary"] },
    app: { label: "App page", blocks: ["app_about_primary", "mobile_app"] },
    bonus: { label: "Bonus page", blocks: ["bonus_about_primary", "bonus_bonuses", "bonus_hero"] },
    bonus_cashback: { label: "Bonus Cashback page", blocks: ["bonus_cashback_about_primary"] },
    bonus_deposit: { label: "Bonus Deposit page", blocks: ["bonus_deposit_about_primary", "bonus_deposit_bonuses"] },
    bonus_freebet: { label: "Bonus Freebet page", blocks: ["bonus_freebet_about_primary", "bonus_freebet_bonuses"] },
    bonus_freespin: { label: "Bonus Freespin page", blocks: ["bonus_freespin_about_primary", "bonus_freespin_bonuses"] },
    bonus_promocode: { label: "Bonus Promocode page", blocks: ["bonus_promocode_about_primary", "bonus_promocode_bonuses"] },
    contacts: { label: "Contacts page", blocks: ["contacts_about_primary", "contacts_about_secondary"] },
    faq: { label: "FAQ page", blocks: ["faq_about_primary"] },
    footer: { label: "Footer", blocks: ["footer_footer"] },
    header: { label: "Header", blocks: ["header_header"] },

};

// --- Метадані для кожного блоку ---
// Використовується для відображення назв у UI та для генерації назв JSON-файлів
export const BLOCK_META: Record<BlockKey, { label: string; file: string }> = {
    about_primary: { label: "About / Primary", file: "about_primary.json" },
    app_about_primary: { label: "App / Primary", file: "about_primary.json" },
    mobile_app: { label: "App / Mobile App", file: "mobile_app.json" },
    bonus_about_primary: { label: "Bonus / About Primary", file: "about_primary.json" },
    bonus_bonuses: { label: "Bonus / Bonuses", file: "bonuses.json" },
    bonus_hero: { label: "Bonus / Hero", file: "hero.json" },
    bonus_cashback_about_primary: { label: "Bonus Cashback / About Primary", file: "about_primary.json" },
    bonus_deposit_about_primary: { label: "Bonus Deposit / About Primary", file: "about_primary.json" },
    bonus_deposit_bonuses: { label: "Bonus Deposit / Bonuses", file: "bonuses.json" },
    bonus_freebet_about_primary: { label: "Bonus Freebet / About Primary", file: "about_primary.json" },
    bonus_freebet_bonuses: { label: "Bonus Freebet / Bonuses", file: "bonuses.json" },
    bonus_freespin_about_primary: { label: "Bonus Freespin / About Primary", file: "about_primary.json" },
    bonus_freespin_bonuses: { label: "Bonus Freespin / Bonuses", file: "bonuses.json" },
    bonus_promocode_about_primary: { label: "Bonus Promocode / About Primary", file: "about_primary.json" },
    bonus_promocode_bonuses: { label: "Bonus Promocode / Bonuses", file: "bonuses.json" },
    contacts_about_primary: { label: "Contacts / About Primary", file: "about_primary.json" },
    contacts_about_secondary: { label: "Contacts / About Secondary", file: "about_secondary.json" },
    faq_about_primary: { label: "FAQ / About Primary", file: "about_primary.json" },
    footer_footer: { label: "Footer / Data", file: "footer.json" },
    header_header: { label: "Header / Data", file: "header.json" },

};