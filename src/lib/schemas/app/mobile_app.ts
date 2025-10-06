import { z } from "zod";

/** /app -> mobile_app */
export const app_mobile_app_schema = z.object({
    title: z.object({ brand: z.string().min(1), tail: z.string().min(1) }),
    lead: z.string().min(1),
    cards: z
        .array(
            z.object({
                title: z.string().min(1),
                steps: z.array(z.string().min(1)).min(1),
            })
        )
        .min(1),
    compare: z.object({
        title: z.string().min(1),
        rows: z
            .array(
                z.object({
                    label: z.string().min(1),
                    items: z.array(z.string().min(1)).min(1),
                })
            )
            .min(1),
    }),
    cta: z.string().min(1),
});

export type AppMobileApp = z.infer<typeof app_mobile_app_schema>;
