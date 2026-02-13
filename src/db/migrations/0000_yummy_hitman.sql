CREATE TYPE "public"."discountType" AS ENUM('percentage', 'fixed_amount');--> statement-breakpoint
CREATE TYPE "public"."fulfillmentStatus" AS ENUM('unfulfilled', 'partially_fulfilled', 'fulfilled', 'returned');--> statement-breakpoint
CREATE TYPE "public"."mediaRefType" AS ENUM('product', 'variant', 'review', 'category', 'collection');--> statement-breakpoint
CREATE TYPE "public"."mediaType" AS ENUM('image', 'video');--> statement-breakpoint
CREATE TYPE "public"."orderStatus" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."paymentStatus" AS ENUM('pending', 'authorized', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('customer', 'admin', 'manager');--> statement-breakpoint
CREATE TABLE "address" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"phone" varchar(20),
	"addressLine1" varchar(500) NOT NULL,
	"addressLine2" varchar(500),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"postalCode" varchar(20) NOT NULL,
	"country" varchar(100) NOT NULL,
	"isDefault" boolean DEFAULT false NOT NULL,
	"label" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "cart" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid,
	"sessionId" varchar(255),
	"expiresAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "cartItem" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"cartId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"variantId" uuid,
	"quantity" integer NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"snapshot" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"parentId" uuid,
	"position" integer DEFAULT 0,
	"isActive" boolean DEFAULT true,
	CONSTRAINT "category_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "media" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"url" varchar(1000) NOT NULL,
	"thumbnailUrl" varchar(1000),
	"altText" varchar(255),
	"mediaType" "mediaType" DEFAULT 'image' NOT NULL,
	"refId" uuid NOT NULL,
	"refType" "mediaRefType" NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"orderNumber" varchar(50) NOT NULL,
	"userId" uuid,
	"status" "orderStatus" DEFAULT 'pending' NOT NULL,
	"paymentStatus" "paymentStatus" DEFAULT 'pending' NOT NULL,
	"total" numeric(12, 2) NOT NULL,
	"shippingAddressId" uuid,
	"billingAddressId" uuid,
	CONSTRAINT "order_orderNumber_unique" UNIQUE("orderNumber")
);
--> statement-breakpoint
CREATE TABLE "orderItem" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"orderId" uuid NOT NULL,
	"productId" uuid NOT NULL,
	"variantId" uuid,
	"quantity" integer NOT NULL,
	"price" numeric(12, 2) NOT NULL,
	"snapshot" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" varchar(255) NOT NULL,
	"slug" varchar(255) NOT NULL,
	"description" text,
	"basePrice" numeric(12, 2) NOT NULL,
	"salePrice" numeric(12, 2),
	"currency" varchar(3) DEFAULT 'USD',
	"sku" varchar(100),
	"brand" varchar(100),
	"ribbon" varchar(50),
	"isActive" boolean DEFAULT true,
	"isFeatured" boolean DEFAULT false,
	"categoryId" uuid,
	CONSTRAINT "product_slug_unique" UNIQUE("slug"),
	CONSTRAINT "product_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "productVariant" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"productId" uuid NOT NULL,
	"sku" varchar(100) NOT NULL,
	"price" numeric(12, 2),
	"stockQuantity" integer DEFAULT 0 NOT NULL,
	"optionValues" jsonb NOT NULL,
	CONSTRAINT "productVariant_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"userId" uuid NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"password" text,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" timestamp,
	"refreshTokenExpiresAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"token" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"userId" uuid NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phoneNumber" bigint,
	"image" text,
	"role" text,
	"isActive" boolean DEFAULT true,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phoneNumber_unique" UNIQUE("phoneNumber")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cart" ADD CONSTRAINT "cart_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_cartId_cart_id_fk" FOREIGN KEY ("cartId") REFERENCES "public"."cart"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_variantId_productVariant_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "category" ADD CONSTRAINT "category_parentId_category_id_fk" FOREIGN KEY ("parentId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_shippingAddressId_address_id_fk" FOREIGN KEY ("shippingAddressId") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_billingAddressId_address_id_fk" FOREIGN KEY ("billingAddressId") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_variantId_productVariant_id_fk" FOREIGN KEY ("variantId") REFERENCES "public"."productVariant"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariant" ADD CONSTRAINT "productVariant_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "refIdIdx" ON "media" USING btree ("refId");--> statement-breakpoint
CREATE INDEX "refTypeIdx" ON "media" USING btree ("refType");--> statement-breakpoint
CREATE INDEX "accountUserIdIdx" ON "account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "sessionUserIdIdx" ON "session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "verificationIdentifierIdx" ON "verification" USING btree ("identifier");