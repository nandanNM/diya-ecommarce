import { z } from "zod";

const requiredString = z.string().trim().min(1, "This field is required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  name: requiredString.regex(/^[a-zA-Z ]+$/, "Only letters allowed"),
  phoneNumber: requiredString.min(10, ""),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

export const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  description: z.string().optional(),
  parentId: z.string().uuid().optional().nullable(),
  position: z.number().int().optional(),
  isActive: z.boolean().optional(),
});
export type CategoryValues = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = createCategorySchema.partial();

export type UpdateCategoryValues = z.infer<typeof updateCategorySchema>;
