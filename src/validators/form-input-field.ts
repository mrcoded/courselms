import z from "zod";

export const titleInputSchema = z.object({
  title: z.string().min(1, {
    message: "title is required",
  }),
});

export const categoryInputSchema = z.object({
  categoryId: z.string().min(1),
});

export const accessSelectSchema = z.object({
  isFree: z.boolean().default(false).optional(),
});

export const descriptionInputSchema = z.object({
  description: z.string().min(1, {
    message: "description is required",
  }),
});

export const priceInputSchema = z.object({
  price: z
    .number()
    .min(1, {
      message: "price is required",
    })
    .nullish(),
});

export const videoInputSchema = z.object({
  videoUrl: z.string().min(1),
});

export const attachmentInputSchema = z.object({
  url: z.string().min(1),
});
