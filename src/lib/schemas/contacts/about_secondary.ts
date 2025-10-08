// src/lib/schemas/contacts/about_secondary.ts
import { z } from "zod";

const imageVariant = z.object({ src: z.string().min(1), height: z.number().int().nonnegative() });
const base = z.object({
    kind: z.enum(["ordered", "unordered"]),
    title: z.string().min(1),
    intro: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
});
export const contacts_about_secondary_schema = z.object({
    image: z.object({
        alt: z.string().min(1),
        desktop: imageVariant,
        mobile: imageVariant,
    }),
    sections: z.array(base).min(1),
});
export type ContactsAboutSecondary = z.infer<typeof contacts_about_secondary_schema>;
