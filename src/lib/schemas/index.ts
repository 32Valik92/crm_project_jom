// --- Barrel файл для зручних імпортів ---
// Цей файл об’єднує всі схеми, типи та метадані блоків у єдину точку доступу.
// Таким чином, інші частини проєкту можуть імпортувати все з "@/lib/schemas"
// замість кількох окремих файлів.

// --- Основні реєстри сторінок і блоків ---
export { PAGES, BLOCK_META } from "./catalog";
export type { PageKey, BlockKey } from "./catalog";

// --- Схеми та типи для сторінки /about ---
export { about_primary_schema } from "./about/about_primary";
export type { AboutPrimary } from "./about/about_primary";

// --- Схеми та типи для сторінки /app ---
export { app_about_primary_schema } from "./app/about_primary";
export type { AppAboutPrimary } from "./app/about_primary";

export { app_mobile_app_schema } from "./app/mobile_app";
export type { AppMobileApp } from "./app/mobile_app";

// --- Збірка всіх схем у єдину мапу ---
// Використовується у формі BlockFormDialog, щоб визначити потрібну Zod-схему за ключем блоку.
//
// Тут використовується `await import()` — це динамічні імпорти,
// які дозволяють завантажити схему лише коли вона реально потрібна (on-demand).
// Завдяки цьому зменшується розмір початкового бандла.
export const BLOCK_SCHEMAS = {
    about_primary: (await import("./about/about_primary")).about_primary_schema,
    app_about_primary: (await import("./app/about_primary")).app_about_primary_schema,
    mobile_app: (await import("./app/mobile_app")).app_mobile_app_schema,
} as const;

// --- Допоміжний union-тип для збереження у стані ---
// Описує усі можливі структури даних блоків (будь-який із трьох типів).
// Використовується у ValidatorPage для state `data`.
export type AnyBlockValue =
    | import("./about/about_primary").AboutPrimary
    | import("./app/about_primary").AppAboutPrimary
    | import("./app/mobile_app").AppMobileApp;
