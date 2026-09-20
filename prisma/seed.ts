import { PrismaClient } from "@prisma/client";
import { SEED_PRODUCT_INPUTS } from "../src/data/seed-catalogue";

const prisma = new PrismaClient();

async function main() {
  for (const p of SEED_PRODUCT_INPUTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        pricePence: p.pricePence,
        category: p.category,
        material: p.material,
        active: true,
      },
      create: p,
    });
  }
  console.log(`Seeded ${SEED_PRODUCT_INPUTS.length} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
