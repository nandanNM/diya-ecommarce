import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import NewsletterForm from "../common/news-letter-form";

export function SiteFooter() {
  return (
    <footer className="bg-card font-sans text-card-foreground border-t border-border/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h2 className="text-xl font-bold tracking-[0.25em] uppercase">
            Diya
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Hand-poured scents that bring your most cherished memories to life.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-wide uppercase">
            Shop
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/products">All Products</Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-wide uppercase">
            Company
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold tracking-wide uppercase">
            Legal
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link href="/refund-cancellation">Refund Policy</Link>
            </li>
            <li>
              <Link href="/shipping-delivery">Shipping Policy</Link>
            </li>
          </ul>
        </div>

        {/* Social + Newsletter */}
        <div className="md:col-span-4 lg:col-span-1">
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
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Diya. All rights reserved.
      </div>
    </footer>
  );
}
