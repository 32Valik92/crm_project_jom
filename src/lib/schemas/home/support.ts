import { z } from "zod";

export const home_support_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    items: z.array(
        z.object({
            icon: z.string().min(1, "Обов’язково"),
            label: z.string().min(1, "Обов’язково"),
            value: z.string().min(1, "Обов’язково"),
            badge: z.string().optional(),
        })
    ).min(1, "Мінімум 1 пункт"),
});

export type HomeSupport = z.infer<typeof home_support_schema>;
