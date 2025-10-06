// Єдина точка правди для реєстру сторінок/блоків
export type PageKey = "about" | "app";

export type BlockKey =
    | "about_primary"      // /about
    | "app_about_primary"  // /app
    | "mobile_app";        // /app

export const PAGES: Record<PageKey, { label: string; blocks: BlockKey[] }> = {
    about: { label: "About page", blocks: ["about_primary"] },
    app: { label: "App page", blocks: ["app_about_primary", "mobile_app"] },
};

export const BLOCK_META: Record<BlockKey, { label: string; file: string }> = {
    about_primary: { label: "About / Primary", file: "about_primary.json" },
    app_about_primary: { label: "App / Primary", file: "about_primary.json" },
    mobile_app: { label: "App / Mobile App", file: "mobile_app.json" },
};
