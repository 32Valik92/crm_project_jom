// src/lib/schemas/bonus_cashback/about_primary.ts
import { z } from "zod";

const block = z.object({
    title: z.string().min(1, "Обов'язково"),
    imageHero: z.string().optional(),
    intro: z.string().min(1, "Обов'язково"),
});

export const bonus_cashback_about_primary_schema = z.object({
    blocks: z.array(block).min(1, "Мінімум один блок"),
});

export type BonusCashbackAboutPrimary = z.infer<typeof bonus_cashback_about_primary_schema>;
