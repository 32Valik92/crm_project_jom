// lib/schemas/bonus/about_primary.ts
import { z } from "zod";

export const bonus_about_primary_schema = z.object({
    image1: z.string().min(1, "Обов'язково"),
    intro: z.string().min(1, "Обов'язково"),
    welcomeTitle: z.string().min(1, "Обов'язково"),
    image2: z.string().min(1, "Обов'язково"),
    welcomeText: z.string().min(1, "Обов'язково"),
    welcomeBreakdown: z.array(z.string().min(1, "Обов'язково")).min(1, "Мінімум один пункт"),
    highrollerTitle: z.string().min(1, "Обов'язково"),
    highrollerText: z.string().min(1, "Обов'язково"),
    otherTitle: z.string().min(1, "Обов'язково"),
    otherText: z.string().min(1, "Обов'язково"),
    otherList: z.array(z.string().min(1, "Обов'язково")).min(1, "Мінімум один пункт"),
});

export type BonusAboutPrimary = z.infer<typeof bonus_about_primary_schema>;
