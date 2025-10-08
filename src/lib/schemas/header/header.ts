// src/lib/schemas/header/header.ts
import { z } from "zod";

const child = z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    redirect: z.boolean().optional(),
});
const navItem = z.object({
    id: z.string().min(1),
    label: z.string().min(1),
    redirect: z.boolean().optional(),
    children: z.array(child).optional(),
});

export const header_schema = z.object({
    brand: z.string().min(1),
    actions: z.object({
        login: z.string().min(1),
        signup: z.string().min(1),
        support: z.string().min(1),
        language: z.string().min(1),
    }),
    mobile: z.object({
        featured: z.array(z.string().min(1)).min(1),
    }),
    nav: z.array(navItem).min(1),
});

export type HeaderData = z.infer<typeof header_schema>;
