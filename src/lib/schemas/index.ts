// Barrel для зручних імпортів
export { PAGES, BLOCK_META } from "./catalog";
export type { PageKey, BlockKey } from "./catalog";

export { about_primary_schema } from "./about/about_primary";
export type { AboutPrimary } from "./about/about_primary";

export { app_about_primary_schema } from "./app/about_primary";
export type { AppAboutPrimary } from "./app/about_primary";

export { app_mobile_app_schema } from "./app/mobile_app";
export type { AppMobileApp } from "./app/mobile_app";

// Збірка схем у вигляді мапи
export const BLOCK_SCHEMAS = {
    about_primary: (await import("./about/about_primary")).about_primary_schema,
    app_about_primary: (await import("./app/about_primary")).app_about_primary_schema,
    mobile_app: (await import("./app/mobile_app")).app_mobile_app_schema,
} as const;

// Допоміжний union для збереження у стані
export type AnyBlockValue =
    | import("./about/about_primary").AboutPrimary
    | import("./app/about_primary").AppAboutPrimary
    | import("./app/mobile_app").AppMobileApp;
