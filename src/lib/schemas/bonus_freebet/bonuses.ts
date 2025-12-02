import { z } from "zod";

const itemSchema = z.object({
    label: z.string().min(1, "Обов'язково"),
    value: z.string().min(1, "Обов'язково"),
});

const cardSchema = z.object({
    title: z.string().min(1, "Обов'язково"),
    subtitle: z.string().optional().default(""),
    items: z.array(itemSchema).min(1, "Мінімум один пункт"),
    ctaLabel: z.string().min(1, "Обов'язково"),
});

export const bonus_freebet_bonuses_schema = z.object({
    title: z.string().min(1, "Обов'язково"),
    tabs: z.array(z.string().min(1, "Обов'язково")).min(1, "Мінімум один таб"),
    cards: z.array(cardSchema).min(1, "Мінімум одна картка"),
    promocode: z.object({
        label: z.string().min(1, "Обов'язково"),
        code: z.string().min(1, "Обов'язково"),
        cta: z.string().min(1, "Обов'язково"),
        copied: z.string().min(1, "Обов'язково"),
        ariaCopy: z.string().min(1, "Обов'язково"),
    }),
});

export type BonusFreebetBonuses = z.infer<typeof bonus_freebet_bonuses_schema>;
