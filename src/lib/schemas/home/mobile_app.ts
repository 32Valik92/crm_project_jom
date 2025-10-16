import { z } from "zod";

export const home_mobile_app_schema = z.object({
    title: z.object({
        brand: z.string().min(1, "Обов'язкове поле"),
        tail: z.string().min(1, "Обов'язкове поле"),
    }),

    lead: z.string().min(1, "Обов'язкове поле"),
    // --- Масив карток із кроками інструкції або переваг ---
    cards: z
        .array(
            z.object({
                title: z.string().min(1, "Обов'язкове поле"),
                steps: z.array(z.string().min(1, "Обов'язкове поле")).min(1, "Мінімум один крок"),
            })
        )
        .min(1, "Мінімум одна картка"),

    compare: z.object({
        title: z.string().min(1, "Обов'язкове поле"),
        rows: z
            .array(
                z.object({
                    label: z.string().min(1, "Обов'язкове поле"),
                    items: z.array(z.string().min(1, "Обов'язкове поле")).min(1, "Мінімум один пункт"),
                })
            )
            .min(1, "Мінімум один рядок"),
    }),

    cta: z.string().min(1, "Обов'язкове поле"),
});

export type HomeMobileApp = z.infer<typeof home_mobile_app_schema >;
