ALTER TABLE "account" ADD COLUMN "accountId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "providerId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "scope" text;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "impersonatedBy" text;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "provider";--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN "providerAccountId";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_accountId_unique" UNIQUE("accountId");