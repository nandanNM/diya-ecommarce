"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      enableColorScheme
      attribute="class"
      defaultTheme="light"
    >
      {children}
      <Toaster />
      <GoogleAnalytics gaId="G-QLM54TXN12" />
    </ThemeProvider>
  );
}
