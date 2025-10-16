// src/lib/schemas/home/faq.ts
import { z } from "zod";

export const home_faq_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    items: z.array(
        z.object({
            id: z.string().min(1, "Обов’язково"),
            question: z.string().min(1, "Обов’язково"),
            answer: z.string().min(1, "Обов’язково"),
        })
    ).min(1, "Мінімум 1 пункт"),
});

export type HomeFaq = z.infer<typeof home_faq_schema>;
