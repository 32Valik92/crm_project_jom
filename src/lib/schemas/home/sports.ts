// src/lib/schemas/home/sports.ts
import { z } from "zod";

export const home_sports_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    subtitle: z.string().min(1, "Обов’язково"),
    cards: z.array(z.object({
        icon: z.string().min(1, "Обов’язково"),
        title: z.string().min(1, "Обов’язково"),
        subtitle: z.string().min(1, "Обов’язково"),
    })).min(1, "Мінімум 1 картка"),
});

export type HomeSports = z.infer<typeof home_sports_schema>;
