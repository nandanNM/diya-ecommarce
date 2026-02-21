import type { Metadata } from "next";
import Link from "next/link";

import SignUpForm from "@/components/forms/sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="max-h-160w-full flex h-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to Diya</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find a
              Candale.
            </p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
