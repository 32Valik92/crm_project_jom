// lib/schemas/catalog.ts
// --- Єдина точка правди (Single Source of Truth) ---
// Тут визначено всі сторінки сайту, їхні блоки та метадані для генерації JSON.

// --- Тип для ключів сторінок ---
export type PageKey = "about" | "app" | "bonus" | "bonus_cashback" | "bonus_deposit" | "bonus_freebet";

// --- Тип для ключів блоків контенту ---
export type BlockKey =
    | "about_primary"
    | "app_about_primary"
    | "mobile_app"
    | "bonus_about_primary"
    | "bonus_bonuses"
    | "bonus_hero"
    | "bonus_cashback_about_primary"
    | "bonus_deposit_about_primary"
    | "bonus_deposit_bonuses"
    | "bonus_freebet_about_primary"
    | "bonus_freebet_bonuses";

// --- Реєстр сторінок та пов’язаних із ними блоків ---
export const PAGES: Record<PageKey, { label: string; blocks: BlockKey[] }> = {
    about: { label: "About page", blocks: ["about_primary"] },
    app: { label: "App page", blocks: ["app_about_primary", "mobile_app"] },
    bonus: { label: "Bonus page", blocks: ["bonus_about_primary", "bonus_bonuses", "bonus_hero"] },
    bonus_cashback: { label: "Bonus Cashback page", blocks: ["bonus_cashback_about_primary"] },
    bonus_deposit: { label: "Bonus Deposit page", blocks: ["bonus_deposit_about_primary", "bonus_deposit_bonuses"] },
    bonus_freebet: { label: "Bonus Freebet page", blocks: ["bonus_freebet_about_primary", "bonus_freebet_bonuses"] },
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
};