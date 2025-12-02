import { z } from "zod";

export const home_verification_schema = z.object({
    title: z.string().min(1, "Обов’язково"),
    text: z.string().min(1, "Обов’язково"),
});

export type HomeVerification = z.infer<typeof home_verification_schema>;
