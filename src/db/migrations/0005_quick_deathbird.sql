DROP TYPE "public"."discountType";--> statement-breakpoint
CREATE TYPE "public"."discountType" AS ENUM('percentage', 'amount');