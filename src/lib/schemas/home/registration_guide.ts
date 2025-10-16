// src/lib/schemas/home/registration_guide.ts
import { z } from "zod";

export const home_registration_guide_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    steps: z.array(
        z.object({
            id: z.number().int().min(1, "Має бути ≥ 1"),
            text: z.string().min(1, "Обов’язково"),
        })
    ).min(1, "Мінімум 1 крок"),
});

export type HomeRegistrationGuide = z.infer<typeof home_registration_guide_schema>;
