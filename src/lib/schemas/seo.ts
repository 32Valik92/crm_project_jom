// src/lib/schemas/seo.ts
import { z } from "zod";

export const seo_schema = z.object({
    seo: z.record(
        z.string(), // ключ — рядок (наприклад "home")
        z.object({
            title: z.string().min(1, "Обов’язково"),
            description: z.string().min(1, "Обов’язково"),
        })
    ),
});

export type SEOJson = z.infer<typeof seo_schema>;
