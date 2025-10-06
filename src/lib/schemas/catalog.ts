// --- Єдина точка правди (Single Source of Truth) ---
// Тут визначено всі сторінки сайту, їхні блоки та метадані для генерації JSON.

// --- Тип для ключів сторінок ---
export type PageKey = "about" | "app"; // Список доступних сторінок у системі

// --- Тип для ключів блоків контенту ---
export type BlockKey =
    | "about_primary"
    | "app_about_primary"
    | "mobile_app";

// --- Реєстр сторінок та пов’язаних із ними блоків ---
export const PAGES: Record<PageKey, { label: string; blocks: BlockKey[] }> = {
    // Сторінка "About" містить лише один блок — about_primary
    about: {
        label: "About page",
        blocks: ["about_primary"]
    },

    // Сторінка "App" має два блоки — основний та секцію мобільного застосунку
    app: {
        label: "App page",
        blocks: ["app_about_primary", "mobile_app"]
    },
};

// --- Метадані для кожного блоку ---
// Використовується для відображення назв у UI та для генерації назв JSON-файлів
export const BLOCK_META: Record<BlockKey, { label: string; file: string }> = {
    about_primary: {
        label: "About / Primary",
        file: "about_primary.json",
    },
    app_about_primary: {
        label: "App / Primary",
        file: "about_primary.json",
    },
    mobile_app: {
        label: "App / Mobile App",
        file: "mobile_app.json",
    },
};
