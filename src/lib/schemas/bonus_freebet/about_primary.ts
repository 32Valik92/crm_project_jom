// src/lib/schemas/bonus_freebet/about_primary.ts
import { z } from "zod";

const block = z.object({
    title: z.string().min(1, "Обов'язкове поле").or(z.literal("")),
    imageHero: z.string().optional(),
    intro: z.string().min(1, "Обов'язкове поле").or(z.literal("")),
    items: z.array(z.string().min(1, "Обов'язкове поле")).optional(),
});

export const bonus_freebet_about_primary_schema = z.object({
    blocks: z.array(block).min(1, "Мінімум один блок"),
});

export type BonusFreebetAboutPrimary = z.infer<typeof bonus_freebet_about_primary_schema>;
