// prisma\main.ts

import prisma from '~/prisma/lib/client';
import cleanUp from '~/prisma/helpers/cleanUp';
import seedFurnitureType from '~/prisma/furnituretype/seed';
import seedMaterial from '~/prisma/material/seed';
import seedUser from '~/prisma/user/seed';
import seedFurniture from '~/prisma/furniture/seed';
import seedImage from '~/prisma/image/seed';
import seedFurnitureMaterial from '~/prisma/furniturematerial/seed';
import seedFavorite from '~/prisma/favorite/seed';

async function main() {
  console.log('🌱 Seeding...');

  const skipCleanup = process.env.SKIP_CLEANUP === 'true';
  if (!skipCleanup) {
    await cleanUp();
  }

  await seedFurnitureType();
  await seedMaterial();
  await seedUser();
  await seedFurniture();
  await seedImage();
  await seedFurnitureMaterial();
  await seedFavorite();
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
