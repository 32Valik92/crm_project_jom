// src/lib/schemas/home/feature_cards.ts
import { z } from "zod";

export const home_feature_cards_schema = z.object({
    items: z.array(
        z.object({
            icon: z.string().min(1, "Обов’язково"),
            title: z.string().min(1, "Обов’язково"),
            subtitle: z.string().min(1, "Обов’язково"),
        })
    ).min(1, "Мінімум 1 картка"),
});

export type HomeFeatureCards = z.infer<typeof home_feature_cards_schema>;
