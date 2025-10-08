// src/lib/schemas/contacts/about_primary.ts
import { z } from "zod";

const imageVariant = z.object({ src: z.string().min(1), height: z.number().int().nonnegative() });
export const contacts_about_primary_schema = z.object({
    title: z.string().min(1),
    lead: z.array(z.string().min(1)).min(1),
    image: z.object({
        alt: z.string().min(1),
        desktop: imageVariant,
        mobile: imageVariant,
    }),
    sections: z.array(
        z.object({
            kind: z.enum(["paragraphs"]),
            title: z.string().min(1),
            items: z.array(z.string().min(1)).min(1),
            cta: z.object({ label: z.string().min(1), href: z.string().min(1) }).optional(),
        })
    ).min(1),
});
export type ContactsAboutPrimary = z.infer<typeof contacts_about_primary_schema>;
