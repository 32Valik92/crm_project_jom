import { z } from "zod";

export const slots_hero_schema = z.object({
    badge: z.string().min(1, "Обов'язково"),
    title: z.string().min(1, "Обов'язково"),
    cta: z.string().min(1, "Обов'язково"),
    description: z.string().min(1, "Обов'язково"),
});

export type SlotsHero  = z.infer<typeof slots_hero_schema>;
