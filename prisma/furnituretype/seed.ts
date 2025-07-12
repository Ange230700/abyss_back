// prisma/furnituretype/seed.ts

import prisma from '~/prisma/lib/client';
import cleanUp from '~/prisma/helpers/cleanUp';

const types = [
  { name: 'Chair' },
  { name: 'Table' },
  { name: 'Sofa' },
  { name: 'Bed' },
  { name: 'Desk' },
  { name: 'Cupboard' },
];

async function seedFurnitureType() {
  const skipCleanup = process.env.SKIP_CLEANUP === 'true';

  if (!skipCleanup) {
    console.log('🧹 Cleaning up…');
    await cleanUp();
    console.log('🧹 Cleaning up complete.');
  } else {
    console.log('⚠️ Skipping cleanup (SKIP_CLEANUP=true)');
  }

  await prisma.furnituretype.createMany({
    data: types,
    skipDuplicates: true,
  });
  console.log(`🎉 Seeded ${types.length} records in furnituretype.`);
}

export default seedFurnitureType;
