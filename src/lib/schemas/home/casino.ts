// src/lib/schemas/slots/casino.ts
import { z } from "zod";

export const home_casino_schema = z.object({
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

export type HomeCasino = z.infer<typeof home_casino_schema>;
