import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-foreground font-sans text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold tracking-[0.25em] uppercase">
            Diya
          </h2>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Hand-poured scents that bring your most cherished memories to life.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-wide uppercase">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link href="/shop">All Products</Link>
            </li>
            <li>
              <Link href="/gifting-collection">Gifting Collection</Link>
            </li>
            <li>
              <Link href="/shop-by-material">Shop by Material</Link>
            </li>
            <li>
              <Link href="/bulk-order">Bulk Order</Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-wide uppercase">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-wide uppercase">
            Stay Connected
          </h3>
          <div className="mb-4 flex space-x-4">
            <Link href="https://facebook.com" target="_blank">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" target="_blank">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="mailto:info@apnadiya.in">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-l-md px-3 py-2 text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-r-md bg-black/80 px-4 py-2 text-white hover:bg-black"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/20 py-6 text-center text-sm text-primary-foreground/80">
        © {new Date().getFullYear()} Diya. All rights reserved.
      </div>
    </footer>
  );
}
