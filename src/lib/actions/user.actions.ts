"use server";

import { APIError } from "better-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

import { auth } from "../auth";
import type { LoginValues, SignUpValues } from "../validations";
import { loginSchema, signUpSchema } from "../validations";

export async function signUp(
  credentials: SignUpValues
): Promise<{ error: string }> {
  try {
    const { email, name, phoneNumber, password } =
      signUpSchema.parse(credentials);
    auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
        phoneNumber: Number(phoneNumber),
        // isActive is now handled by default value in auth config
      },
    });

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof APIError) return { error: error.message };
    return { error: "Something went wrong. Please try again later." };
  }
}
export async function login(
  credentials: LoginValues
): Promise<{ error: string }> {
  try {
    const { email, password } = loginSchema.parse(credentials);

    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)) throw error;
    if (error instanceof APIError) {
      return { error: error.message };
    }
    return { error: "Something went wrong. Please try again later." };
  }
}

// export async function logout(): Promise<{ error: string }> {
//   const { session } = await validateRequest();
//   if (!session) {
//     return {
//       error: "Unauthorized",
//     };
//   }

//   await lucia.invalidateSession(session.id);

//   const sessionCookie = lucia.createBlankSessionCookie();

//   cookies().set(
//     sessionCookie.name,
//     sessionCookie.value,
//     sessionCookie.attributes,
//   );
//   await prisma.subscription.deleteMany({
//     where: {
//       userId: session.userId,
//     },
//   });
//   return redirect("/login");
// }

// export async function updateUserProfile(values: UpdateUserProfileValues) {
//   const validatedValues = updateUserProfileSchema.parse(values);

//   const { user } = await validateRequest();

//   if (!user) throw new Error("Unauthorized");

//   const updatedUser = await prisma.$transaction(async (tx) => {
//     const updatedUser = await tx.user.update({
//       where: { id: user.id },
//       data: validatedValues,
//       select: getUserDataSelect(user.id),
//     });
//     await streamServerClient.partialUpdateUser({
//       id: user.id,
//       set: {
//         name: validatedValues.displayName,
//       },
//     });
//     return updatedUser;
//   });

//   return updatedUser;
// }
