import z from "zod";

export const CreateReceiptValidator = z.object({
    imageId: z.nullable(z.string()),
    date: z.number(),
    total: z.number(),
    categoryId: z.number(),
    tagId: z.number()
});

