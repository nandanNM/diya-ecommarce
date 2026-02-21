CREATE TYPE "public"."discountType" AS ENUM('percentage', 'fixed_amount');--> statement-breakpoint
CREATE TYPE "public"."fulfillmentStatus" AS ENUM('unfulfilled', 'partially_fulfilled', 'fulfilled', 'returned', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."shipmentStatus" AS ENUM('pending', 'ordered', 'shipped', 'out_for_delivery', 'delivered', 'failed');--> statement-breakpoint
CREATE TABLE "coupon" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"code" varchar(50) NOT NULL,
	"description" text,
	"discountType" "discountType" NOT NULL,
	"discountValue" numeric(12, 2) NOT NULL,
	"minPurchaseAmount" numeric(12, 2) DEFAULT '0.00',
	"maxDiscountAmount" numeric(12, 2),
	"usageLimit" integer,
	"usageCount" integer DEFAULT 0,
	"startDate" timestamp,
	"endDate" timestamp,
	"isActive" boolean DEFAULT true,
	CONSTRAINT "coupon_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "couponUsage" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"couponId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"orderId" uuid NOT NULL,
	"discountAmount" numeric(12, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"orderId" uuid NOT NULL,
	"userId" uuid,
	"gateway" varchar(50) NOT NULL,
	"gatewayTransactionId" varchar(255),
	"amount" numeric(12, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'INR',
	"status" "paymentStatus" DEFAULT 'pending',
	"paymentMethod" varchar(50),
	"metadata" jsonb
);
--> statement-breakpoint
CREATE TABLE "shipment" (
	"id" uuid PRIMARY KEY NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"orderId" uuid NOT NULL,
	"addressId" uuid,
	"carrier" varchar(100),
	"trackingNumber" varchar(255),
	"trackingUrl" varchar(1000),
	"status" "shipmentStatus" DEFAULT 'pending',
	"shippedAt" timestamp,
	"deliveredAt" timestamp,
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "fulfillmentStatus" "fulfillmentStatus" DEFAULT 'unfulfilled';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "subtotal" numeric(12, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "tax" numeric(12, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "shippingCost" numeric(12, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "order" ADD COLUMN "discount" numeric(12, 2) DEFAULT '0.00';--> statement-breakpoint
ALTER TABLE "couponUsage" ADD CONSTRAINT "couponUsage_couponId_coupon_id_fk" FOREIGN KEY ("couponId") REFERENCES "public"."coupon"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "couponUsage" ADD CONSTRAINT "couponUsage_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "couponUsage" ADD CONSTRAINT "couponUsage_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment" ADD CONSTRAINT "shipment_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipment" ADD CONSTRAINT "shipment_addressId_address_id_fk" FOREIGN KEY ("addressId") REFERENCES "public"."address"("id") ON DELETE set null ON UPDATE no action;