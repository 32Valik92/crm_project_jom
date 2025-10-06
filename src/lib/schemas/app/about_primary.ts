import { z } from "zod";

/** /app -> about_primary */
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
