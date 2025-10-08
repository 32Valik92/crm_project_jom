// src/lib/schemas/faq/about_primary.ts
import { z } from "zod";

const block = z.object({
    title: z.string().min(1, "Обов'язкове поле").or(z.literal("")),
    imageHero: z.string().optional(),
    intro: z.string().min(1, "Обов'язкове поле").or(z.literal("")),
    steps: z.array(z.string().min(1, "Обов'язкове поле")).optional(),
    note: z.string().optional(),
});

export const faq_about_primary_schema = z.object({
    blocks: z.array(block).min(1, "Мінімум один блок"),
});

export type FaqAboutPrimary = z.infer<typeof faq_about_primary_schema>;
