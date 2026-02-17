import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import loginImage from "@/assets/login-candle.webp";
import LoginForm from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-180 w-full max-w-280 overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Left – Form */}
        <div className="flex w-full flex-col justify-center overflow-y-auto px-12 py-14 md:w-1/2">
          {/* Brand */}
          <div className="mb-10 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Welcome back to
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
              Diya
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <div className="space-y-6">
            {/* <GoogleSignInButton /> */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-wider text-muted-foreground uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <LoginForm />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-wider text-muted-foreground uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Link
              href="/signup"
              className="block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Don&apos;t have an account?{" "}
              <span className="font-semibold text-foreground underline underline-offset-4">
                Sign up
              </span>
            </Link>
          </div>
        </div>

        {/* Right – Image */}
        <div className="relative hidden w-1/2 md:block">
          <Image
            src={loginImage}
            alt="Diya candles"
            className="h-full w-full object-cover"
            fill
          />
        </div>
      </div>
    </main>
  );
}
