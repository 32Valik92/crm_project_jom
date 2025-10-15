// src/lib/schemas/slots/casino.ts
import { z } from "zod";

export const slots_casino_schema = z.object({
    title: z.string().min(1),
    subtitle: z.string().min(1),
    cards: z.array(
        z.object({
            title: z.string().min(1),
            image: z.object({
                src: z.string().min(1),
                alt: z.string().min(1),
            }),
        })
    ).min(1),
});

export type SlotsCasino = z.infer<typeof slots_casino_schema>;
