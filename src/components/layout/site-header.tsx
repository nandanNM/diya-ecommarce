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
import { MAIN_NAV } from "@/config/site";
// import { ThemeSwitch } from "../theme-switch-button";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col font-outfit">
      {/* 1. ANNOUNCEMENT BAR */}
      <div className="w-full overflow-hidden border-b border-primary bg-primary py-2 whitespace-nowrap select-none lg:py-2.5">
        <div className="animate-marquee inline-block">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className="mx-6 text-[10px] font-medium tracking-[0.15em] text-primary-foreground/95 lg:mx-12 lg:text-[11px] lg:tracking-[0.2em]"
            >
              Best Deals At Checkout &nbsp; • &nbsp; Free Shipping On Orders Above 500 &nbsp; • &nbsp; 30% Off On First Order
            </span>
          ))}
        </div>
      </div>

      <header className="w-full">
        <div className="container mx-auto px-4 lg:px-10">
          {/* 2. TOP SECTION (Exact Mobile Layout) */}
          <div className="flex h-14 items-center justify-between">
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
                    {MAIN_NAV.map((item) => (
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
              {/* <Button
                variant="ghost"
                size="icon"
                className="hidden p-0 text-foreground transition-transform hover:scale-110 lg:flex"
              >
                <Search className="h-5.5 w-5.5 stroke-[1.2]" />
              </Button> */}
            

            {/* CENTER: Logo (Centered on all screens) */}
            <Link
              href="/"
              className="group flex items-center gap-2 no-underline"
            >
              <div className="mb-1  text-primary transition-transform duration-500 group-hover:scale-105">
                <img className="size-10" src="/logo.svg" />
              </div>
              <span className="lg:text-5.5 font-nickainley text-[20px] leading-none font-bold tracking-[0.25em] text-foreground lg:tracking-[0.3em]">
                Diya
              </span>
            </Link>
            </div>

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
              {/* 
              <Button
                variant="ghost"
                size="icon"
                className="hidden p-0 text-foreground transition-transform hover:scale-110 lg:flex"
              >
                <User className="h-5.5 w-5.5 stroke-[1.2]" />
              </Button> */}
            {/* <ThemeSwitch/> */}
              <ShoppingCartButton
                initialData={null}
                className="p-0 text-foreground transition-transform hover:scale-110"
              />
            </div>
          </div>

          {/* 3. DESKTOP NAVIGATION (Hidden on Mobile) */}
          <nav className="hidden justify-center py-2 lg:flex">
            <ul className="flex items-center gap-14">
              {MAIN_NAV.map((item) => {
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
