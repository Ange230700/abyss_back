// prisma\favorite\seed.ts

import prisma from '~/prisma/lib/client';
import { faker } from '@faker-js/faker';

async function seedFavorite() {
  const users = await prisma.user.findMany({ select: { id: true } });
  const furnitures = await prisma.furniture.findMany({ select: { id: true } });

  const USER_IDS = users.map((u: { id: number }) => u.id);
  const FURNITURE_IDS = furnitures.map((f: { id: number }) => f.id);

  const favorites: {
    id_user: number;
    id_furniture: number;
    is_favorite: boolean;
  }[] = [];
  USER_IDS.forEach((uid: number) => {
    const count = faker.number.int({
      min: 2,
      max: Math.min(5, FURNITURE_IDS.length),
    });
    const chosenFurniture = faker.helpers.arrayElements(FURNITURE_IDS, count);
    chosenFurniture.forEach((fid: number) => {
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
