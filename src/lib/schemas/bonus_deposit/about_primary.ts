// src/lib/schemas/bonus_deposit/about_primary.ts
import { z } from "zod";

const block = z.object({
    title: z.string().min(1, "Обов'язкове поле").or(z.literal("")),
    imageHero: z.string().optional(),
    intro: z.string().min(1, "Обов'язкове поле").or(z.literal("")),
    items: z.array(z.string().min(1, "Обов'язкове поле")).optional(),
});

export const bonus_deposit_about_primary_schema = z.object({
    blocks: z.array(block).min(1, "Мінімум один блок"),
});

export type BonusDepositAboutPrimary = z.infer<typeof bonus_deposit_about_primary_schema>;
