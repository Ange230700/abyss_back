// prisma\helpers\cleanUp.ts

import prisma from '~/prisma/lib/client';
import deleteSafely from '~/prisma/helpers/deleteSafely';

async function cleanUp() {
  console.log('🧹 Cleaning up...');

  await deleteSafely(() => prisma.favorite.deleteMany({}), 'favorite');
  await deleteSafely(() => prisma.image.deleteMany({}), 'image');
  await deleteSafely(
    () => prisma.furniturematerial.deleteMany({}),
    'furniturematerial',
  );
  await deleteSafely(() => prisma.furniture.deleteMany({}), 'furniture');
  await deleteSafely(() => prisma.user.deleteMany({}), 'user');
  await deleteSafely(() => prisma.material.deleteMany({}), 'material');
  await deleteSafely(
    () => prisma.furnituretype.deleteMany({}),
    'furnituretype',
  );

  console.log('🧹 Cleaning up complete.');
}

export default cleanUp;
