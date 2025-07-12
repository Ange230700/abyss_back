// prisma\main.ts

import prisma from '~/prisma/lib/client';
import seedFurnitureType from '~/prisma/furnituretype/seed';
import seedFurniture from '~/prisma/furniture/seed';

async function main() {
  console.log('🌱 Seeding...');
  await seedFurnitureType();
  await seedFurniture();
  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => {
    console.error('💥 Error seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
