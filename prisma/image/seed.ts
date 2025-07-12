// prisma\image\seed.ts

import prisma from '~/prisma/lib/client';
import { faker } from '@faker-js/faker';
import cleanUp from '~/prisma/helpers/cleanUp';

async function seedImage() {
  const skipCleanup = process.env.SKIP_CLEANUP === 'true';

  if (!skipCleanup) {
    console.log('🧹 Cleaning up…');
    await cleanUp();
    console.log('🧹 Cleaning up complete.');
  } else {
    console.log('⚠️ Skipping cleanup (SKIP_CLEANUP=true)');
  }

  const furnitures = await prisma.furniture.findMany({ select: { id: true } });
  const FURNITURE_IDS = furnitures.map((f) => f.id);
  const IMAGES_PER_FURNITURE = 2;
  const images = FURNITURE_IDS.flatMap((fid) =>
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
