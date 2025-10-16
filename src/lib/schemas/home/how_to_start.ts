// src/lib/schemas/home/how_to_start.ts
import { z } from "zod";

export const home_how_to_start_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    steps: z.array(
        z.object({
            id: z.string().min(1, "Обов’язково"),
            text: z.string().min(1, "Обов’язково"),
            highlight: z.boolean().optional(),
        })
    ).min(1, "Мінімум 1 крок"),
});

export type HomeHowToStart = z.infer<typeof home_how_to_start_schema>;
