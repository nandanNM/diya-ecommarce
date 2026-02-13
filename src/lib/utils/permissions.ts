import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  product: ["create", "read", "update", "delete"],
  order: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  coupon: ["create", "read", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

// Can browse the store and manage their own shopping activity
export const customer = ac.newRole({
  product: ["read"], // Can view products
  category: ["read"], // Can view categories
  order: ["create", "read"], // Can place and view orders
  coupon: ["read"], // Can see/apply coupons
});

// Has full power over every part of the system
export const superAdmin = ac.newRole({
  product: ["create", "read", "update", "delete"],
  order: ["create", "read", "update", "delete"],
  category: ["create", "read", "update", "delete"],
  coupon: ["create", "read", "update", "delete"],
  ...adminAc.statements,
});
