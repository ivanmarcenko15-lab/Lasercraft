import type { Metadata } from "next";
import { CustomContactForm } from "@/components/CustomContactForm";
import {
  IconMail,
  IconMapPin,
  IconPhone,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: "Custom & Contact",
  description:
    "Request a custom laser-cut or engraved piece, or get in touch with LaseCraft.",
};

export default function CustomPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="section-eyebrow mb-2">Custom & Contact</p>
        <h1 className="section-title">Tell us your idea</h1>
        <p className="mt-3 text-charcoal/65">
          Whether you need a one-off gift, wedding signage or a wholesale run,
          share your brief below. We design, cut, engrave and personalise in
          wood, acrylic and leather.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <CustomContactForm />
        </div>

        <aside className="space-y-6 lg:col-span-2">
          <div className="card-surface space-y-4 p-6">
            <h2 className="font-serif text-xl">Get in touch</h2>
            <ul className="space-y-4 text-sm text-charcoal/75">
              <li className="flex gap-3">
                <IconMail size={18} className="shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-charcoal">Email</p>
                  <a
                    href="mailto:info@lasecraft.co.uk"
                    className="hover:text-gold"
                  >
                    info@lasecraft.co.uk
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <IconPhone size={18} className="shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-charcoal">Phone</p>
                  <a href="tel:+447700123456" className="hover:text-gold">
                    +44 7700 123456
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <IconMapPin size={18} className="shrink-0 text-gold" />
                <div>
                  <p className="font-medium text-charcoal">Studio</p>
                  <p>Gloucestershire, UK</p>
                </div>
              </li>
            </ul>
            <p className="text-xs text-charcoal/45">
              www.lasecraft.co.uk · Instagram · Facebook · TikTok
            </p>
          </div>

          <div className="rounded-sm border border-gold/30 bg-charcoal p-6 text-cream">
            <h3 className="font-serif text-lg text-gold">How it works</h3>
            <ol className="mt-4 space-y-3 text-sm text-cream/75">
              <li>
                <strong className="text-cream">1. Brief</strong> — send sizes,
                materials and artwork notes.
              </li>
              <li>
                <strong className="text-cream">2. Design</strong> — we prepare a
                proof for your approval.
              </li>
              <li>
                <strong className="text-cream">3. Craft</strong> — laser cut &amp;
                engrave with care.
              </li>
              <li>
                <strong className="text-cream">4. Deliver</strong> — packed and
                sent across the UK.
              </li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
