import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, openAPI } from "better-auth/plugins";
import { v7 } from "uuid";

import db from "@/db";
import { ac, customer, superAdmin } from "@/lib/utils/permissions";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    debugLogs: false,
    camelCase: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 24 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  advanced: {
    cookiePrefix: "better-auth", //TODO: change to diya
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    // Disable origin check in development to allow requests without Origin header
    disableOriginCheck: process.env.NODE_ENV === "development",
    database: {
      generateId: (options) => {
        if (options.model === "user" || options.model === "users") {
          return false;
        }
        return v7();
      },
    },
  },
  user: {
    additionalFields: {
      phoneNumber: {
        type: "number",
        required: false,
        input: true,
      },
      isActive: {
        type: "boolean",
        required: false,
        defaultValue: true,
        input: false, // Don't allow users to set this - use default value
      },
    },
  },
  plugins: [
    nextCookies(),
    openAPI(),
    admin({
      ac,
      defaultRole: "customer",
      adminRoles: ["superAdmin"],
      roles: {
        superAdmin,
        customer,
      },
    }),
  ],
});
