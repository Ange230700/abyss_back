// prisma\image\seed.ts

import prisma from '~/prisma/lib/client';
import { faker } from '@faker-js/faker';

async function seedImage() {
  const furnitures = await prisma.furniture.findMany({ select: { id: true } });
  const FURNITURE_IDS = furnitures.map((f: { id: number }) => f.id);
  const IMAGES_PER_FURNITURE = 2;
  const images = FURNITURE_IDS.flatMap((fid: number) =>
    Array.from({ length: IMAGES_PER_FURNITURE }).map(() => ({
      id_furniture: fid,
      url: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
    })),
  );

  await prisma.image.createMany({
    data: images,
    skipDuplicates: true,
  });

  console.log(`🎉 Seeded ${images.length} records in image.`);
}

export default seedImage;
