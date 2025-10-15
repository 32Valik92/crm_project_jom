// src/lib/schemas/slots_aviator/about_primary.ts
import { z } from "zod";

const imageVariant = z.object({ src: z.string().min(1), height: z.number().int().nonnegative() });

const block_title = z.object({
    kind: z.literal("title"),
    h: z.coerce.number().pipe(z.union([z.literal(2), z.literal(3)])),
    text: z.string().min(1),
});

const block_paragraph = z.object({
    kind: z.literal("paragraph"),
    lines: z.array(z.string().min(1)).min(1),
});

const block_image = z.object({
    kind: z.literal("image"),
    alt: z.string().min(1),
    desktop: imageVariant,
    mobile: imageVariant,
});

const block_cta = z.object({
    kind: z.literal("cta"),
    label: z.string().min(1),
    href: z.string().min(1),
});

const block_unordered = z.object({
    kind: z.literal("unordered"),
    intro: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
});

const block_ordered = z.object({
    kind: z.literal("ordered"),
    intro: z.string().min(1),
    items: z.array(z.string().min(1)).min(1),
});

export const slots_fruitcocktail_about_primary_schema = z.object({
    blocks: z.array(
        z.discriminatedUnion("kind", [
            block_title,
            block_paragraph,
            block_image,
            block_cta,
            block_unordered,
            block_ordered,
        ])
    ).min(1),
});

export type SlotsFruitCocktailAboutPrimary = z.infer<typeof slots_fruitcocktail_about_primary_schema>;