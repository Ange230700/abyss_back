// prisma/furnituretype/seed.ts

import { faker } from '@faker-js/faker';
import prisma from '~/prisma/lib/client';

const types = [
  { name: 'Chair' },
  { name: 'Table' },
  { name: 'Sofa' },
  { name: 'Bed' },
  { name: 'Desk' },
  { name: 'Cupboard' },
];

async function seedFurnitureType() {
  const COUNT = types.length;

  const fakeFurnitureTypesList = Array.from({ length: COUNT }).map(() => ({
    name: faker.helpers.arrayElement(types).name,
  }));

  await prisma.furnituretype.createMany({
    data: fakeFurnitureTypesList,
    skipDuplicates: true,
  });
  console.log(`🎉 Seeded ${types.length} records in furnituretype.`);
}

export default seedFurnitureType;
