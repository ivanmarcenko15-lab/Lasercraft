"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { IconCart, IconClose, IconMenu } from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/custom", label: "Custom & Contact" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const { itemCount, hydrated } = useCart();
  const [open, setOpen] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-charcoal/10 bg-charcoal/95 text-cream backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/assets/logo.png"
            alt="LaseCraft logo"
            width={52}
            height={52}
            className="h-12 w-12 rounded-full object-cover ring-1 ring-gold/50"
            priority
          />
          <div className="leading-tight">
            <span className="block font-serif text-xl tracking-wide text-cream">
              Lase<span className="text-gold">Craft</span>
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-gold/80 sm:block">
              Natural Ideas Last Longer
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-semibold uppercase tracking-[0.18em] transition ${
                  active ? "text-gold" : "text-cream/75 hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-sm border border-gold/40 p-2 text-gold transition hover:bg-gold hover:text-charcoal"
            aria-label="Shopping cart"
          >
            <IconCart size={20} />
            {hydrated && itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-charcoal">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-sm border border-cream/20 p-2 text-cream md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-cream/10 bg-charcoal px-4 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm font-semibold uppercase tracking-[0.18em] text-cream/90 hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
