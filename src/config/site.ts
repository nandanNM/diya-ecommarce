import { NavItem } from "@/types/nav";
import { Metadata } from "next";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://apnadiya.in";
export const metadata: Metadata = {
  title: {
    default: "Diya",
    template: "%s | Diya",
  },
  description: "",
  keywords: [
  "Scented candles gift set",
  "scented candles under 100",
  "scented candles best",
  "scented candle gift",
  "scented candles online",
  "scented candles in jar",
  "Scented candles under 200"
]
,
  metadataBase: new URL(siteUrl),
  authors: [{ name: "Diya Team", url: siteUrl }],
  openGraph: {
    title: "Diya",
    description: "",
    url: siteUrl,
    siteName: "Diya",
    images: [
      {
        url: "imagePreview",
        width: 1200,
        height: 630,
        alt: "Diya Desktop Screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diya",
    description: "",
    images: ["imagePreview"],
  },

  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: [
      { url: "/icon/icon-56x56.ico", sizes: "56x56", type: "image/ico" },
      { url: "/icon/icon-128x128.ico", sizes: "128x128", type: "image/ico" },
      { url: "/icon/icon-256x256.ico", sizes: "256x256", type: "image/ico" },
    ],
    other: [
      { rel: "icon", url: "/icon/icon-16x16.ico", sizes: "16x16" },
      { rel: "icon", url: "/icon/icon-36x36.ico", sizes: "36x36" },
      { rel: "icon", url: "/icon/icon-48x48.ico", sizes: "48x48" },
      { rel: "icon", url: "/icon/icon-56x56.ico", sizes: "56x56" },
      { rel: "icon", url: "/icon/icon-128x128.ico", sizes: "128x128" },
      { rel: "icon", url: "/icon/icon-256x256.ico", sizes: "256x256" },
    ],
  },
  other: {
    "instagram:profile": "https://www.instagram.com/careercafe.in/",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "CurioTech",
  },
};

// export const META_THEME_COLORS = {
//   light: "#ffffff",
//   dark: "#09090b",
// };

export const MAIN_NAV: NavItem[] = [
  {
    name: "HOME",
    href: "/",
  },
  { name: "ABOUT US", href: "/about-us" },
];
