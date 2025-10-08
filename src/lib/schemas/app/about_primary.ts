import { z } from "zod";

export const app_about_primary_schema = z.object({
    image1: z.string().min(1, "Обов'язкове поле"),
    pIntro: z.string().min(1, "Обов'язкове поле"),
    uiTitle: z.string().min(1, "Обов'язкове поле"),
    pUI: z.string().min(1, "Обов'язкове поле"),
    image2: z.string().min(1, "Обов'язкове поле"),
    pHome: z.string().min(1, "Обов'язкове поле"),
    gamesTitle: z.string().min(1, "Обов'язкове поле"),
    pGames: z.string().min(1, "Обов'язкове поле"),
});

export type AppAboutPrimary = z.infer<typeof app_about_primary_schema>;
