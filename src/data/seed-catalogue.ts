/**
 * Demo catalogue shared by prisma/seed.ts and the seed fallback when
 * DATABASE_URL is missing or is a file: SQLite URL. Prices in pence (GBP).
 * IDs are stable (`seed-<slug>`) so cart + checkout work without a DB.
 */

export type SeedProductRow = {
  id: string;
  slug: string;
  name: string;
  description: string;
  pricePence: number;
  category: string;
  material: string;
  imageUrl: string | null;
  active: boolean;
  createdAt: Date;
};

const SEED_RAW = [
  {
    slug: "oakwood-road-address-plaque",
    name: "Classic House Number Plaque",
    description:
      "Black acrylic plaque with gold-toned numerals and street name. A refined address plaque laser-cut from premium acrylic. Choose your house number and street name; we engrave with crisp, lasting precision. Weather-resistant and suitable for indoor or sheltered outdoor mounting. Includes fixing kit.",
    pricePence: 3499,
    category: "address-plaques",
    material: "Acrylic",
  },
  {
    slug: "slate-cottage-plaque",
    name: "Slate Cottage Name Plaque",
    description:
      "Natural slate with deep-engraved cottage or house name. Hand-selected Welsh-style slate engraved with your chosen house or cottage name. The natural texture of the stone pairs beautifully with clean serif lettering. Ideal for countryside homes and cottages.",
    pricePence: 4250,
    category: "address-plaques",
    material: "Slate",
  },
  {
    slug: "mountain-key-holder",
    name: "Mountain Peak Key Holder",
    description:
      "Wooden mountain silhouette with hooks and optional Home engraving. Laser-cut birch plywood in a striking mountain silhouette. Four sturdy metal hooks keep keys tidy by the door. Optional personalisation with a family name or short phrase.",
    pricePence: 2800,
    category: "key-holders",
    material: "Wood",
  },
  {
    slug: "oak-rail-key-holder",
    name: "Oak Rail Key Holder",
    description:
      "Minimal oak rail with five brass hooks. A clean, modern oak rail finished with five solid brass hooks. Perfect for hallways and mudrooms. Add a short engraved welcome message along the rail if desired.",
    pricePence: 3200,
    category: "key-holders",
    material: "Wood",
  },
  {
    slug: "adventure-awaits-tumbler",
    name: "Adventure Awaits Tumbler",
    description:
      "Stainless tumbler with custom mountain engraving. A double-walled stainless steel tumbler laser-engraved with an adventure motif and your chosen name or short quote. Keeps drinks hot or cold for hours — a brilliant gift for explorers.",
    pricePence: 2499,
    category: "personalised-gifts",
    material: "Mixed",
  },
  {
    slug: "memory-box-keepsake",
    name: "Engraved Memory Keepsake Box",
    description:
      "Wooden box with lid engraving for photos and mementos. A hinged wooden keepsake box with a finely engraved lid. Choose names, a date and a short dedication. Ideal for christenings, anniversaries and milestone birthdays.",
    pricePence: 3650,
    category: "personalised-gifts",
    material: "Wood",
  },
  {
    slug: "acrylic-business-sign",
    name: "Clear Acrylic Business Sign",
    description:
      "Frosted or clear acrylic logo plaque for offices and receptions. Professional acrylic signage cut and engraved from your logo artwork. Available in clear, frosted or coloured acrylic. Mounting options include standoffs or adhesive pads. Perfect for reception desks and shopfronts.",
    pricePence: 5900,
    category: "signs-logo-plaques",
    material: "Acrylic",
  },
  {
    slug: "wooden-logo-plaque",
    name: "Wooden Logo Wall Plaque",
    description:
      "Deep-cut timber plaque featuring your brand mark. Your logo laser-cut from quality birch or oak plywood for a warm, tactile brand presence. Suitable for workshops, studios and retail spaces. Supply vector artwork for best results.",
    pricePence: 4800,
    category: "signs-logo-plaques",
    material: "Wood",
  },
  {
    slug: "tree-of-life-wall-art",
    name: "Tree of Life Wall Art",
    description:
      "Intricate circular wooden cutout — our signature piece. Inspired by our brand emblem, this intricate Tree of Life is laser-cut from layered wood for depth and shadow. A statement piece for living rooms, hallways and studios. Ready to hang.",
    pricePence: 4500,
    category: "home-decor",
    material: "Wood",
  },
  {
    slug: "geometric-wall-panel",
    name: "Geometric Wall Panel",
    description:
      "Modern hexagonal wood panel for feature walls. A set of laser-cut geometric panels that assemble into a striking feature. Available in natural or stained finishes. Mix and match sizes for a custom layout.",
    pricePence: 3800,
    category: "home-decor",
    material: "Wood",
  },
  {
    slug: "mr-mrs-wedding-sign",
    name: "Mr & Mrs Wedding Sign",
    description:
      "Cloud-shaped wooden sign for ceremonies and photo backdrops. A charming cloud-shaped wooden wedding sign engraved with Mr & Mrs and your surnames. Ideal for ceremony backdrops, cake tables and guest books. Freestanding or hangable.",
    pricePence: 2950,
    category: "wedding-event",
    material: "Wood",
  },
  {
    slug: "table-place-cards",
    name: "Laser-Cut Table Place Cards",
    description:
      "Set of 10 wooden place cards for weddings and dinners. Elegant wooden place cards for place settings. Supply a guest list and we engrave each name. Pack of 10; larger quantities available for wholesale events.",
    pricePence: 2200,
    category: "wedding-event",
    material: "Wood",
  },
  {
    slug: "dad-leather-wallet",
    name: "Personalised Leather Wallet",
    description:
      "Genuine leather wallet engraved with name and date. A classic bifold leather wallet laser-engraved with a name, initials or short dedication such as “DAD Est. 2024”. A timeless Father’s Day or birthday gift.",
    pricePence: 3999,
    category: "personalised-accessories",
    material: "Leather",
  },
  {
    slug: "leather-keyring-tag",
    name: "Leather Keyring Tag",
    description:
      "Soft leather tag with initials or short word. A compact leather keyring tag engraved with initials, a name or a short word. Choose from several leather tones. Great stocking filler or add-on gift.",
    pricePence: 1250,
    category: "personalised-accessories",
    material: "Leather",
  },
  {
    slug: "branded-wooden-boxes",
    name: "Branded Wooden Gift Boxes",
    description:
      "Wholesale wooden boxes with your logo on the lid. Custom wooden gift or product boxes engraved with your logo. Ideal for retailers, wedding favours and corporate gifting. Minimum order of 25; volume pricing available on request.",
    pricePence: 850,
    category: "business-wholesale",
    material: "Wood",
  },
  {
    slug: "pet-portrait-slate",
    name: "Pet Portrait Slate Tile",
    description:
      "Photo-engraved slate of your beloved pet. Send us a clear photo and we laser-engrave a detailed portrait onto natural slate. Add your pet’s name beneath. A heartfelt memorial or celebration piece.",
    pricePence: 3500,
    category: "custom-designs",
    material: "Slate",
  },
  {
    slug: "bespoke-commission",
    name: "Bespoke Design Commission",
    description:
      "Fully custom piece from your sketch or idea. Have something unique in mind? Share a sketch, photo or brief and we will design, cut and engrave a one-of-a-kind piece in wood, acrylic or leather. Quoted individually — starting price shown.",
    pricePence: 5500,
    category: "custom-designs",
    material: "Mixed",
  },
] as const;

const EPOCH = new Date("2024-01-01T00:00:00.000Z");

export const SEED_PRODUCTS: SeedProductRow[] = SEED_RAW.map((p, index) => ({
  id: `seed-${p.slug}`,
  slug: p.slug,
  name: p.name,
  description: p.description,
  pricePence: p.pricePence,
  category: p.category,
  material: p.material,
  imageUrl: null,
  active: true,
  createdAt: new Date(EPOCH.getTime() + index * 1000),
}));

/** Fields needed by prisma/seed upsert (no stable id — DB generates cuid). */
export const SEED_PRODUCT_INPUTS = SEED_RAW.map((p) => ({
  slug: p.slug,
  name: p.name,
  description: p.description,
  pricePence: p.pricePence,
  category: p.category,
  material: p.material,
}));

export function getSeedProductById(id: string): SeedProductRow | undefined {
  return SEED_PRODUCTS.find((p) => p.id === id && p.active);
}

export function getSeedProductBySlug(slug: string): SeedProductRow | undefined {
  return SEED_PRODUCTS.find((p) => p.slug === slug && p.active);
}
