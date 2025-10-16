import { z } from "zod";

export const sportsbook_hero_schema = z.object({
    badge: z.string().min(1, "Обов'язково"),
    title: z.string().min(1, "Обов'язково"),
    cta: z.string().min(1, "Обов'язково"),
    description: z.string().min(1, "Обов'язково"),
});

export type SportsbookHero  = z.infer<typeof sportsbook_hero_schema>;
