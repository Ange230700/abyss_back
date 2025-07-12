// prisma\furniture\seed.ts

import prisma from '~/prisma/lib/client';
import { faker } from '@faker-js/faker';

async function seedFurniture() {
  const COUNT = 10;

  const FURNITURE_TYPE_IDS = [1, 2, 3];

  const STATUS_OPTIONS = ['Available', 'Out_of_stock'] as const;

  const fakeFurnituresList = Array.from({ length: COUNT }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    id_type: faker.helpers.arrayElement(FURNITURE_TYPE_IDS),
    size: faker.helpers.arrayElement(['Small', 'Medium', 'Large']),
    colour: faker.color.human(),
    quantity: faker.number.int({ min: 0, max: 100 }),
    price: parseFloat(faker.commerce.price({ min: 20, max: 999, dec: 2 })),
    status: faker.helpers.arrayElement(STATUS_OPTIONS),
  }));

  await prisma.furniture.createMany({
    data: fakeFurnituresList,
    skipDuplicates: true,
  });

  console.log(`🎉 Seeded ${COUNT} records in furniture.`);
}

export default seedFurniture;
