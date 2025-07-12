// prisma\helpers\cleanUp.ts

import prisma from '~/prisma/lib/client';
import deleteSafely from '~/prisma/helpers/deleteSafely';

async function cleanUp() {
  console.log('🧹 Cleaning up...');
  await deleteSafely(
    () => prisma.furnituretype.deleteMany({}),
    'furnituretype',
  );
  await deleteSafely(() => prisma.furniture.deleteMany({}), 'furniture');
  console.log('🧹 Cleaning up complete.');
}

export default cleanUp;
