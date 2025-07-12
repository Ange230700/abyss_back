// prisma\material\seed.ts

import { faker } from '@faker-js/faker';
import prisma from '~/prisma/lib/client';
import cleanUp from '~/prisma/helpers/cleanUp';

const MATERIALS = [
  { name: 'Wood' },
  { name: 'Metal' },
  { name: 'Glass' },
  { name: 'Plastic' },
  { name: 'Fabric' },
  { name: 'Leather' },
];

async function seedMaterial() {
  const skipCleanup = process.env.SKIP_CLEANUP === 'true';

  if (!skipCleanup) {
    console.log('🧹 Cleaning up…');
    await cleanUp();
    console.log('🧹 Cleaning up complete.');
  } else {
    console.log('⚠️ Skipping cleanup (SKIP_CLEANUP=true)');
  }

  const COUNT = MATERIALS.length;

  const fakeMaterialsList = Array.from({ length: COUNT }).map(() => ({
    name: faker.helpers.arrayElement(MATERIALS).name,
  }));

  await prisma.material.createMany({
    data: fakeMaterialsList,
    skipDuplicates: true,
  });

  console.log(`🎉 Seeded ${MATERIALS.length} records in material.`);
}

export default seedMaterial;
