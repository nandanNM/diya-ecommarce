import Image from "next/image";
import Link from "next/link";

import loginImage from "@/assets/login-candle.webp";
import SignUpForm from "@/components/forms/sign-up-form";

export default function SignupPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-180 w-full max-w-280 overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Left – Image */}
        <div className="relative hidden w-1/2 md:block">
          <Image
            src={loginImage}
            alt="Diya candles"
            className="h-full w-full object-cover"
            fill
          />
        </div>

        {/* Right – Form */}
        <div className="flex w-full flex-col justify-center overflow-y-auto px-12 py-14 md:w-1/2">
          <div className="mb-10 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase">
              Get started with
            </span>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-foreground">
              Diya
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              A place where even you can find a Candle.
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
            <SignUpForm />

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs tracking-wider text-muted-foreground uppercase">
                or
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Link
              href="/login"
              className="block text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Already have an account?{" "}
              <span className="font-semibold text-foreground underline underline-offset-4">
                Log in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
