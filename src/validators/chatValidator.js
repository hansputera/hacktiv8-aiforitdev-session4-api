import z from "zod";

export const chatValidator = z.object({
    message: z.string().min(3),
});
