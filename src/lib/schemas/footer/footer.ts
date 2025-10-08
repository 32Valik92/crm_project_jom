// src/lib/schemas/footer/footer.ts
import { z } from "zod";

const link = z.object({
    label: z.string().min(1, "Обов'язково"),
    href: z.string().min(1, "Обов'язково"),
});
const column = z.object({ links: z.array(link).min(1, "Мінімум одне посилання") });

export const footer_schema = z.object({
    tagline: z.string().min(1, "Обов'язково"),
    columns: z.array(column).min(1, "Мінімум одна колонка"),
    bottom: z.object({
        copyright: z.string().min(1, "Обов'язково"),
    }),
});
export type FooterData = z.infer<typeof footer_schema>;
