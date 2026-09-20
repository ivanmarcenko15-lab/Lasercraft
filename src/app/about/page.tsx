import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About LaseCraft — artisan laser cutting and engraving from Gloucestershire, UK.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="bg-charcoal text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="section-eyebrow mb-2 text-gold">Our story</p>
            <h1 className="font-serif text-4xl md:text-5xl">
              Natural ideas
              <br />
              <span className="text-gold">last longer</span>
            </h1>
            <p className="mt-5 max-w-xl text-cream/75 leading-relaxed">
              LaseCraft is a Gloucestershire studio dedicated to personalised
              laser-cut and engraved products. We believe the best pieces
              combine your ideas with meticulous craft — in wood, acrylic and
              leather.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-sm">
            <Image
              src="/assets/logo.png"
              alt="LaseCraft wooden logo plaque"
              width={400}
              height={400}
              className="w-full drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6 text-charcoal/75 leading-relaxed">
            <h2 className="section-title">Your design. Our precision.</h2>
            <p>
              From address plaques and wedding signs to branded wholesale
              packaging, every order starts with a conversation. We translate
              sketches, photos and logos into clean vector artwork, then cut and
              engrave with professional laser systems for sharp, lasting detail.
            </p>
            <p>
              Our tagline — <em>Natural Ideas Last Longer</em> — captures what
              we care about: materials that feel honest, designs that hold
              meaning, and finishes built to be kept and gifted for years.
            </p>
            <p>
              Whether you need a single personalised gift or a run of branded
              items for your business, wholesale enquiries are always welcome.
              Ideas. Made Personal.
            </p>
          </div>
          <div className="space-y-4">
            <div className="card-surface p-5">
              <h3 className="font-serif text-lg text-gold-dark">Services</h3>
              <ul className="mt-3 space-y-1 text-sm text-charcoal/70">
                <li>Design</li>
                <li>Cut</li>
                <li>Engrave</li>
                <li>Personalise</li>
              </ul>
            </div>
            <div className="card-surface p-5">
              <h3 className="font-serif text-lg text-gold-dark">Materials</h3>
              <ul className="mt-3 space-y-1 text-sm text-charcoal/70">
                <li>Wood</li>
                <li>Acrylic</li>
                <li>Leather</li>
                <li>Slate &amp; more</li>
              </ul>
            </div>
            <div className="card-surface p-5">
              <h3 className="font-serif text-lg text-gold-dark">Based in</h3>
              <p className="mt-3 text-sm text-charcoal/70">
                Gloucestershire, United Kingdom
              </p>
              <p className="mt-2 text-sm">
                <a
                  href="mailto:info@lasecraft.co.uk"
                  className="text-gold hover:underline"
                >
                  info@lasecraft.co.uk
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap gap-3">
          <Link href="/shop" className="btn-gold">
            Explore the shop
          </Link>
          <Link href="/custom" className="btn-dark">
            Start a custom project
          </Link>
        </div>
      </section>
    </div>
  );
}
