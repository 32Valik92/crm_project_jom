// lib/schemas/bonus/hero.ts
import { z } from "zod";

export const bonus_hero_schema = z.object({
    badge: z.string().min(1, "Обов'язково"),
    title: z.string().min(1, "Обов'язково"),
    cta: z.string().min(1, "Обов'язково"),
    description: z.string().min(1, "Обов'язково"),
});

export type BonusHero = z.infer<typeof bonus_hero_schema>;
