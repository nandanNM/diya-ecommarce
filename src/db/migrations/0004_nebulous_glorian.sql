ALTER TABLE "order" DROP CONSTRAINT "order_shippingAddressId_address_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_billingAddressId_address_id_fk";
--> statement-breakpoint
ALTER TABLE "product" ALTER COLUMN "currency" SET DEFAULT 'INR';--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "productOptions" jsonb;--> statement-breakpoint
ALTER TABLE "product" ADD COLUMN "discount" jsonb;--> statement-breakpoint
ALTER TABLE "productVariant" ADD COLUMN "costPrice" numeric(12, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "productVariant" ADD COLUMN "trackInventory" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_shippingAddressId_address_id_fk" FOREIGN KEY ("shippingAddressId") REFERENCES "public"."address"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_billingAddressId_address_id_fk" FOREIGN KEY ("billingAddressId") REFERENCES "public"."address"("id") ON DELETE set null ON UPDATE no action;