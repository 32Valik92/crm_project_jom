import { z } from "zod";

export const home_hero_schema = z.object({
    badge: z.string().min(1, "Обов'язково"),
    title: z.string().min(1, "Обов'язково"),
    cta: z.string().min(1, "Обов'язково"),
    description: z.string().min(1, "Обов'язково"),
});

export type HomeHero = z.infer<typeof home_hero_schema>;
