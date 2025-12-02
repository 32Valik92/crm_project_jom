import { z } from "zod";

export const home_about_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    lead: z.array(z.string().min(1, "Обов’язково")).min(1, "Мінімум 1 пункт"),
    info: z.object({
        heading: z.string().min(1, "Обов’язково"),
        rows: z.array(
            z.object({
                label: z.string().min(1, "Обов’язково"),
                value: z.string().min(1, "Обов’язково"),
            })
        ).min(1, "Мінімум 1 рядок"),
    }),
    safety: z.string().min(1, "Обов’язково"),
});

export type HomeAbout = z.infer<typeof home_about_schema>;
