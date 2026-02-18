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
  name: requiredString.min(1, "Name is required"),
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

export const addressSchema = z.object({
  fullName: requiredString
    .min(2, "Full name must be at least 2 characters")
    .max(255, "Full name is too long"),

  phone: requiredString.min(10, "Phone number is required"),

  addressLine1: requiredString
    .min(5, "Address line 1 is required")
    .max(500, "Address line 1 is too long"),

  addressLine2: requiredString
    .max(500, "Address line 2 is too long")
    .optional()
    .or(z.literal("")),

  city: requiredString
    .min(2, "City is required")
    .max(100, "City name is too long"),

  state: requiredString
    .min(2, "State is required")
    .max(100, "State name is too long"),

  postalCode: requiredString.regex(/^[1-9][0-9]{5}$/, "Invalid PIN code"),

  country: requiredString
    .min(2, "Country is required")
    .max(100, "Country name is too long"),

  isDefault: z.boolean().optional(),

  label: z.string().max(50, "Label is too long").optional().or(z.literal("")),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export const cartItemSchema = z.object({
  cartItemId: z.string(),
  variantId: z.string().optional(),
  product: z
    .object({
      _id: z.string(),
      priceData: z.object({
        price: z.number(),
        discountedPrice: z.number(),
      }),
    })
    .passthrough(),
  quantity: z.number().int().min(1),
  selectedOptions: z.record(z.string(), z.string()).optional(),
});

export const cartSyncSchema = z.object({
  localItems: z.array(cartItemSchema),
});

export const cartRefreshSchema = z.object({
  items: z.array(cartItemSchema),
});

export const addToCartSchema = z.object({
  productId: z.string().uuid(),
  variantId: z.string().uuid(),
  quantity: z.number().int().min(1),
});

// export type AddToCartValues = z.infer<typeof addToCartSchema>;

export const updateCartItemSchema = z.object({
  itemId: z.string().uuid(),
  newQuantity: z.number().int().min(1),
});

export type UpdateCartItemQuantityValues = z.infer<typeof updateCartItemSchema>;
