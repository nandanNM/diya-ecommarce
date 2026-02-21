CREATE TABLE "orderShippingAddress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"orderId" uuid NOT NULL,
	"fullName" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"addressLine1" varchar(500) NOT NULL,
	"addressLine2" varchar(500),
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"postalCode" varchar(20) NOT NULL,
	"country" varchar(100) NOT NULL,
	CONSTRAINT "orderShippingAddress_orderId_unique" UNIQUE("orderId")
);
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_shippingAddressId_address_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_billingAddressId_address_id_fk";
--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "guestOrderToken" uuid;--> statement-breakpoint
ALTER TABLE "orderShippingAddress" ADD CONSTRAINT "orderShippingAddress_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "orderShippingAddressOrderIdx" ON "orderShippingAddress" USING btree ("orderId");--> statement-breakpoint
CREATE INDEX "orderGuestTokenIdx" ON "order" USING btree ("guestOrderToken");--> statement-breakpoint
CREATE INDEX "orderUserIdx" ON "order" USING btree ("userId");--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "shippingAddressId";--> statement-breakpoint
ALTER TABLE "order" DROP COLUMN "billingAddressId";--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_guestOrderToken_unique" UNIQUE("guestOrderToken");