"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ShoppingCartButton from "@/features/cart/shopping-cart-button";

const NAV_ITEMS = [
  { name: "HOME", href: "/" },
  {
    name: "SHOP",
    href: "/shop",
    submenu: [
      "SHOP ALL",
      "PLANTERS",
      "DINING",
      "STORAGE",
      "LAMPS",
      "BAGS",
      "CANDLES",
    ],
  },
  { name: "GIFTING COLLECTION", href: "/gifting-collection" },
  {
    name: "SHOP BY MATERIAL",
    href: "/shop-by-material",
    submenu: ["CANE", "WATER HYACINTH", "BAMBOO", "KAUNA", "RATTAN-WOOD"],
  },
  { name: "BULK ORDER", href: "/bulk-order" },
  { name: "ABOUT US", href: "/about-us" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="font-outfit flex w-full flex-col">
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="w-full overflow-hidden border-b border-primary bg-primary py-2 whitespace-nowrap select-none lg:py-2.5">
        <div className="animate-marquee inline-block">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="mx-6 text-[10px] font-medium tracking-[0.15em] text-primary-foreground/95 lg:mx-12 lg:text-[11px] lg:tracking-[0.2em]"
            >
              Best Deals At Checkout &nbsp; • &nbsp; Cod Available
            </span>
          ))}
        </div>
      </div>

      <header className="w-full">
        <div className="container mx-auto px-4 lg:px-10">
          {/* 2. TOP SECTION (Exact Mobile Layout) */}
          <div className="flex h-14 items-center justify-between lg:h-18">
            {/* LEFT: Hamburger (Mobile) / Search (Desktop) */}
            <div className="flex flex-1 items-center justify-start">
              {/* Mobile Toggle */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-auto w-auto p-0 transition-transform hover:scale-110 lg:hidden"
                  >
                    <Menu className="h-6 w-6 stroke-[1.5] text-foreground" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-70 border-r-border bg-background p-0"
                >
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <nav className="mt-12 flex flex-col">
                    {NAV_ITEMS.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="border-b border-border/40 px-8 py-4 text-[12px] font-bold tracking-[0.15em] text-muted-foreground"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Desktop Search */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden p-0 text-foreground transition-transform hover:scale-110 lg:flex"
              >
                <Search className="h-5.5 w-5.5 stroke-[1.2]" />
              </Button>
            </div>

            {/* CENTER: Logo (Centered on all screens) */}
            <Link
              href="/"
              className="group flex flex-col items-center no-underline"
            >
              <div className="mb-1 hidden text-primary transition-transform duration-500 group-hover:scale-105 lg:block">
                {/* <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M20 5L35 12.5V27.5L20 35L5 27.5V12.5L20 5Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="20" cy="20" r="3.5" fill="currentColor" />
                </svg> */}
              </div>
              <span className="lg:text-5.5 text-[15px] leading-none font-medium tracking-[0.25em] text-foreground uppercase lg:tracking-[0.3em]">
                FLICKERS & FLAME
              </span>
            </Link>

            {/* RIGHT: Search + Cart (Mobile) / User + Cart (Desktop) */}
            <div className="flex flex-1 items-center justify-end gap-3 lg:gap-6">
              {/* Mobile Search Icon next to Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="p-0 text-foreground transition-transform hover:scale-110 lg:hidden"
              >
                <Search className="h-5 w-5 stroke-[1.5]" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hidden p-0 text-foreground transition-transform hover:scale-110 lg:flex"
              >
                <User className="h-5.5 w-5.5 stroke-[1.2]" />
              </Button>

              <ShoppingCartButton
                initialData={null}
                className="p-0 text-foreground transition-transform hover:scale-110"
              />
            </div>
          </div>

          {/* 3. DESKTOP NAVIGATION (Hidden on Mobile) */}
          <nav className="hidden justify-center py-2 lg:flex">
            <ul className="flex items-center gap-14">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name} className="group relative">
                    <Link
                      href={item.href}
                      className={cn(
                        "relative py-1 text-[11px] font-bold tracking-[0.25em] transition-colors duration-300",
                        isActive
                          ? "text-black"
                          : "text-muted-foreground hover:text-primary"
                      )}
                    >
                      {item.name}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-[1.2px] bg-primary transition-all duration-300 ease-in-out",
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </Link>

                    {/* Submenu Dropdown */}
                    {item.submenu && (
                      <ul className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                        <div className="min-w-50 border border-border bg-popover py-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                          {item.submenu.map((sub) => (
                            <li key={sub}>
                              <Link
                                href="#"
                                className="block px-6 py-2.5 text-[10px] font-semibold tracking-[0.2em] text-foreground transition-colors hover:bg-accent hover:text-primary"
                              >
                                {sub}
                              </Link>
                            </li>
                          ))}
                        </div>
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
