// prisma\favorite\seed.ts

import prisma from '~/prisma/lib/client';
import { faker } from '@faker-js/faker';
import cleanUp from '~/prisma/helpers/cleanUp';

async function seedFavorite() {
  const skipCleanup = process.env.SKIP_CLEANUP === 'true';

  if (!skipCleanup) {
    console.log('🧹 Cleaning up…');
    await cleanUp();
    console.log('🧹 Cleaning up complete.');
  } else {
    console.log('⚠️ Skipping cleanup (SKIP_CLEANUP=true)');
  }

  const users = await prisma.user.findMany({ select: { id: true } });
  const furnitures = await prisma.furniture.findMany({ select: { id: true } });

  const USER_IDS = users.map((u) => u.id);
  const FURNITURE_IDS = furnitures.map((f) => f.id);

  const favorites: {
    id_user: number;
    id_furniture: number;
    is_favorite: boolean;
  }[] = [];
  USER_IDS.forEach((uid) => {
    const count = faker.number.int({
      min: 2,
      max: Math.min(5, FURNITURE_IDS.length),
    });
    const chosenFurniture = faker.helpers.arrayElements(FURNITURE_IDS, count);
    chosenFurniture.forEach((fid) => {
      favorites.push({
        id_user: uid,
        id_furniture: fid,
        is_favorite: faker.datatype.boolean(),
      });
    });
  });

  await prisma.favorite.createMany({
    data: favorites,
    skipDuplicates: true,
  });

  console.log(`🎉 Seeded ${favorites.length} records in favorite.`);
}

export default seedFavorite;
