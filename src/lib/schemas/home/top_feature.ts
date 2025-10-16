// src/lib/schemas/home/top_feature.ts
import { z } from "zod";

export const home_top_feature_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    cards: z.array(
        z.object({
            srcImg: z.string().min(1, "Обов’язково"),
            altImg: z.string().min(1, "Обов’язково"),
            title: z.string().min(1, "Обов’язково"),
            description: z.string().min(1, "Обов’язково"),
        })
    ).min(1, "Мінімум 1 картка"),
});

export type HomeTopFeature = z.infer<typeof home_top_feature_schema>;
