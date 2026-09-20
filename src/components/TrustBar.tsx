import { IconDiamond, IconGear, IconTruck, IconUsers } from "./Icons";

const items = [
  {
    title: "High Quality",
    subtitle: "Craftsmanship you can feel",
    icon: IconDiamond,
  },
  {
    title: "Fast Turnaround",
    subtitle: "Made promptly in the UK",
    icon: IconTruck,
  },
  {
    title: "Custom Made",
    subtitle: "Designed uniquely for you",
    icon: IconGear,
  },
  {
    title: "Wholesale Welcome",
    subtitle: "Trade & bulk orders invited",
    icon: IconUsers,
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-gold/20 bg-cream-soft">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {items.map(({ title, subtitle, icon: Icon }) => (
          <div key={title} className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
              <Icon size={22} />
            </div>
            <div>
              <h3 className="font-semibold text-charcoal">{title}</h3>
              <p className="text-sm text-charcoal/60">{subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
