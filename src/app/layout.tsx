import "../styles/globals.css";
import { fontCabin, fontOutfit, fontNickainley } from "@/lib/fonts";
import { metadata } from "@/config/site";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/components/layout/providers";

export const generateMetadata = () => metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontOutfit.variable} ${fontCabin.variable} ${fontNickainley.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
