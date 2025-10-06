import { z } from "zod";

/* ================= ABOUT ================= */
export const about_primary_schema = z.object({
    title: z.string().min(1, "Обов'язково"),
    imageHero: z.string().min(1, "Обов'язково"),
    intro: z.string().min(1, "Обов'язково"),
    miniGame: z.object({
        title: z.string().min(1, "Обов'язково"),
        text: z.string().min(1, "Обов'язково"),
        note: z.string().min(1, "Обов'язково"),
    }),
});
export type AboutPrimary = z.infer<typeof about_primary_schema>;

/* ================= APP ================= */
export const app_about_primary_schema = z.object({
    image1: z.string().min(1),
    pIntro: z.string().min(1),
    uiTitle: z.string().min(1),
    pUI: z.string().min(1),
    image2: z.string().min(1),
    pHome: z.string().min(1),
    gamesTitle: z.string().min(1),
    pGames: z.string().min(1),
});
export type AppAboutPrimary = z.infer<typeof app_about_primary_schema>;

export const app_mobile_app_schema = z.object({
    title: z.object({ brand: z.string().min(1), tail: z.string().min(1) }),
    lead: z.string().min(1),
    cards: z
        .array(
            z.object({
                title: z.string().min(1),
                steps: z.array(z.string().min(1)).min(1),
            })
        )
        .min(1),
    compare: z.object({
        title: z.string().min(1),
        rows: z
            .array(
                z.object({
                    label: z.string().min(1),
                    items: z.array(z.string().min(1)).min(1),
                })
            )
            .min(1),
    }),
    cta: z.string().min(1),
});
export type AppMobileApp = z.infer<typeof app_mobile_app_schema>;

/* ======= Каталог сторінок/блоків ======= */
export type PageKey = "about" | "app";
export type BlockKey =
    | "about_primary" // /about
    | "app_about_primary" // /app
    | "mobile_app"; // /app

export const PAGES: Record<PageKey, { label: string; blocks: BlockKey[] }> = {
    about: { label: "About page", blocks: ["about_primary"] },
    app: { label: "App page", blocks: ["app_about_primary", "mobile_app"] },
};

export const BLOCK_META: Record<BlockKey, { label: string; file: string }> = {
    about_primary: { label: "About / Primary", file: "about_primary.json" },
    app_about_primary: { label: "App / Primary", file: "about_primary.json" },
    mobile_app: { label: "App / Mobile App", file: "mobile_app.json" },
};

export const BLOCK_SCHEMAS = {
    about_primary: about_primary_schema,
    app_about_primary: app_about_primary_schema,
    mobile_app: app_mobile_app_schema,
} as const;

export type AnyBlockValue =
    | AboutPrimary
    | AppAboutPrimary
    | AppMobileApp;
