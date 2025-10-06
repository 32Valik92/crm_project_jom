import {z} from "zod";

export const about_primary_schema = z.object({
    title: z.string().min(1, "Обов'язково"),
    imageHero: z.string().min(1, "Обов'язково"),
    intro: z.string().min(1, "Обов'язково"),
    miniGame: z.object({
        title: z.string().min(1, "Обов'язково"),
        text: z.string().min(1, "Обов'язково"),
        note: z.string().min(1, "Обов'язково"),
    }),
});

export type AboutPrimary = z.infer<typeof about_primary_schema>;
