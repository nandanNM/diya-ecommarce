import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { baseSchema } from "./schema";

export const roleEnumUser = pgEnum("userRole", ["customer", "admin"]);

export const user = pgTable("user", {
  ...baseSchema,
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phoneNumber: bigint("phoneNumber", { mode: "number" }).unique(),
  image: text("image"),
  role: roleEnumUser("userRole").default("customer"),
  isActive: boolean("isActive").default(true),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(), // Keep it text only because drizzle doesn't support uuid for session id
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: uuid("userId") //use uuid type for foreign key references
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("sessionUserIdIdx").on(table.userId)]
);

export const account = pgTable(
  "account",
  {
    ...baseSchema,
    userId: uuid("userId")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    password: text("password"),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    idToken: text("idToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  },
  (table) => [index("accountUserIdIdx").on(table.userId)]
);
export const verification = pgTable(
  "verification",
  {
    ...baseSchema,
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
  },
  (table) => [index("verificationIdentifierIdx").on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));
