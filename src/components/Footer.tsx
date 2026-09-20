"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconFacebook,
  IconInstagram,
  IconMail,
  IconMapPin,
  IconPhone,
  IconTikTok,
} from "./Icons";
import { categories } from "@/data/products";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="border-t border-gold/20 bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              alt="LaseCraft logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-full object-cover ring-1 ring-gold/40"
            />
            <div>
              <p className="font-serif text-xl">
                Lase<span className="text-gold">Craft</span>
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold/80">
                Natural Ideas Last Longer
              </p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-cream/70">
            Your Design. Our Precision. Personalised laser-cut and engraved
            products in wood, acrylic and leather — crafted in Gloucestershire,
            UK.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-gold/30 p-2 text-gold transition hover:bg-gold hover:text-charcoal"
              aria-label="Instagram"
            >
              <IconInstagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-gold/30 p-2 text-gold transition hover:bg-gold hover:text-charcoal"
              aria-label="Facebook"
            >
              <IconFacebook size={18} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-sm border border-gold/30 p-2 text-gold transition hover:bg-gold hover:text-charcoal"
              aria-label="TikTok"
            >
              <IconTikTok size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="section-eyebrow mb-4">Shop</h3>
          <ul className="space-y-2 text-sm text-cream/75">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/shop?category=${c.slug}`}
                  className="hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/shop" className="hover:text-gold">
                View all products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="section-eyebrow mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-cream/75">
            <li>Design</li>
            <li>Cut</li>
            <li>Engrave</li>
            <li>Personalise</li>
            <li className="pt-2 text-cream/50">Materials: Wood · Acrylic · Leather</li>
            <li>
              <Link href="/custom" className="text-gold hover:underline">
                Request a custom quote
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="section-eyebrow mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-2">
              <IconMail size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href="mailto:info@lasecraft.co.uk" className="hover:text-gold">
                info@lasecraft.co.uk
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconPhone size={16} className="mt-0.5 shrink-0 text-gold" />
              <a href="tel:+447700123456" className="hover:text-gold">
                +44 7700 123456
              </a>
            </li>
            <li className="flex items-start gap-2">
              <IconMapPin size={16} className="mt-0.5 shrink-0 text-gold" />
              <span>Gloucestershire, UK</span>
            </li>
            <li>
              <a
                href="https://www.lasecraft.co.uk"
                className="hover:text-gold"
                target="_blank"
                rel="noreferrer"
              >
                www.lasecraft.co.uk
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-cream/50 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} LaseCraft. All rights reserved.</p>
          <p>Demo storefront — no real payments are processed.</p>
        </div>
      </div>
    </footer>
  );
}
