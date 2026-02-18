import {
  boolean,
  decimal,
  foreignKey,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// ENUMS
export const roleEnum = pgEnum("role", ["customer", "admin", "manager"]);
export const orderStatusEnum = pgEnum("orderStatus", [
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);
export const paymentStatusEnum = pgEnum("paymentStatus", [
  "pending",
  "authorized",
  "paid",
  "failed",
  "refunded",
]);
export const mediaTypeEnum = pgEnum("mediaType", ["image", "video"]);
export const mediaRefTypeEnum = pgEnum("mediaRefType", [
  "product",
  "variant",
  "review",
  "category",
  "collection",
]);
import { baseSchema, user } from "./auth-schema";

export const address = pgTable("address", {
  ...baseSchema,
  userId: uuid("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  fullName: varchar("fullName", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  addressLine1: varchar("addressLine1", { length: 500 }).notNull(),
  addressLine2: varchar("addressLine2", { length: 500 }),
  city: varchar("city", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }).notNull(),
  postalCode: varchar("postalCode", { length: 20 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  isDefault: boolean("isDefault").default(false).notNull(),
  label: varchar("label", { length: 50 }),
});

// UNIFIED MEDIA
export const media = pgTable(
  "media",
  {
    ...baseSchema,
    url: varchar("url", { length: 1000 }).notNull(),
    thumbnailUrl: varchar("thumbnailUrl", { length: 1000 }),
    altText: varchar("altText", { length: 255 }),
    mediaType: mediaTypeEnum("mediaType").default("image").notNull(),
    refId: uuid("refId").notNull(),
    refType: mediaRefTypeEnum("refType").notNull(),
    position: integer("position").default(0).notNull(),
  },
  (table) => ({
    refIdx: index("refIdIdx").on(table.refId),
    refTypeIdx: index("refTypeIdx").on(table.refType),
  })
);

// PRODUCT CATALOG
export const category = pgTable(
  "category",
  {
    ...baseSchema,
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description"),
    parentId: uuid("parentId"),
    position: integer("position").default(0),
    isActive: boolean("isActive").default(true),
  },
  (table) => ({
    // parentIdx: index("parent_id_idx").on(table.parentId),
    parentFk: foreignKey({
      columns: [table.parentId],
      foreignColumns: [table.id],
    }).onDelete("set null"),
  })
);

export const product = pgTable("product", {
  ...baseSchema,
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  additionalInfoSections: jsonb("additionalInfoSections").$type<
    {
      title: string;
      description: string;
    }[]
  >(),
  productOptions: jsonb("productOptions").$type<
    {
      name: string;
      optionType: string;
      choices: {
        value: string;
        description: string;
        inStock: boolean;
        visible: boolean;
      }[];
    }[]
  >(),
  discount: jsonb("discount").$type<{
    type: "percent" | "amount" | "none";
    value: number;
  }>(),
  basePrice: decimal("basePrice", { precision: 12, scale: 2 }).notNull(),
  salePrice: decimal("salePrice", { precision: 12, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("INR"),
  sku: varchar("sku", { length: 100 }).unique(),
  brand: varchar("brand", { length: 100 }),
  ribbon: varchar("ribbon", { length: 50 }),
  isActive: boolean("isActive").default(true),
  isFeatured: boolean("isFeatured").default(false),
  categoryId: uuid("categoryId").references(() => category.id, {
    onDelete: "set null",
  }),
});

export const productVariant = pgTable("productVariant", {
  ...baseSchema,
  productId: uuid("productId")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  costPrice: decimal("costPrice", { precision: 12, scale: 2 }).default("0.00"),
  trackInventory: boolean("trackInventory").default(true).notNull(),
  sku: varchar("sku", { length: 100 }).notNull().unique(),
  price: decimal("price", { precision: 12, scale: 2 }),
  stockQuantity: integer("stockQuantity").default(0).notNull(),
  optionValues: jsonb("optionValues").$type<Record<string, string>>().notNull(),
});

// CART
export const cart = pgTable("cart", {
  ...baseSchema,
  userId: uuid("userId").references(() => user.id, { onDelete: "cascade" }),
  sessionId: varchar("sessionId", { length: 255 }),
  expiresAt: timestamp("expiresAt"),
});

export const cartItem = pgTable("cartItem", {
  ...baseSchema,
  cartId: uuid("cartId")
    .notNull()
    .references(() => cart.id, { onDelete: "cascade" }),
  productId: uuid("productId")
    .notNull()
    .references(() => product.id),
  variantId: uuid("variantId").references(() => productVariant.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  snapshot: jsonb("snapshot").notNull(),
});

// ORDERS
export const order = pgTable("order", {
  ...baseSchema,
  orderNumber: varchar("orderNumber", { length: 50 }).notNull().unique(),
  userId: uuid("userId").references(() => user.id, { onDelete: "set null" }),
  status: orderStatusEnum("status").default("pending").notNull(),
  paymentStatus: paymentStatusEnum("paymentStatus")
    .default("pending")
    .notNull(),
  total: decimal("total", { precision: 12, scale: 2 }).notNull(),
  shippingAddressId: uuid("shippingAddressId").references(() => address.id, {
    onDelete: "set null",
  }),
  billingAddressId: uuid("billingAddressId").references(() => address.id, {
    onDelete: "set null",
  }),
});

export const orderItem = pgTable("orderItem", {
  ...baseSchema,
  orderId: uuid("orderId")
    .notNull()
    .references(() => order.id, { onDelete: "cascade" }),
  productId: uuid("productId")
    .notNull()
    .references(() => product.id),
  variantId: uuid("variantId").references(() => productVariant.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 12, scale: 2 }).notNull(),
  snapshot: jsonb("snapshot").notNull(),
});
