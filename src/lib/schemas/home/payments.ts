import { z } from "zod";

const tableSchema = z.object({
    title: z.string().min(1, "Обов’язково"),
    columns: z.object({
        method: z.string().min(1, "Обов’язково"),
        min: z.string().min(1, "Обов’язково"),
        processing: z.string().min(1, "Обов’язково"),
        fees: z.string().min(1, "Обов’язково"),
    }),
    rows: z.array(
        z.object({
            method: z.string().min(1, "Обов’язково"),
            min: z.string().min(1, "Обов’язково"),
            processing: z.string().min(1, "Обов’язково"),
            fees: z.string().min(1, "Обов’язково"),
        })
    ).min(1, "Мінімум 1 рядок"),
});

export const home_payments_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    subtitle: z.string().min(1, "Обов’язково"),
    deposit: tableSchema,
    withdrawal: tableSchema,
    note: z.string().min(1, "Обов’язково"),
});

export type HomePayments = z.infer<typeof home_payments_schema>;
