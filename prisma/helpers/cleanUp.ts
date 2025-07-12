// prisma\helpers\cleanUp.ts

import prisma from '~/prisma/lib/client';

async function cleanUp() {
  const isDev = process.env.NODE_ENV === 'development';
  const now = new Date();

  if (isDev) {
    console.log('🧹 [DEV] Hard deleting all data...');
    await prisma.$transaction([
      prisma.favorite.deleteMany({}),
      prisma.image.deleteMany({}),
      prisma.furniturematerial.deleteMany({}),
      prisma.furniture.deleteMany({}),
      prisma.user.deleteMany({}),
      prisma.material.deleteMany({}),
      prisma.furnituretype.deleteMany({}),
    ]);
    // Optionally, reset auto-increment counters for MySQL
    await prisma.$executeRawUnsafe('ALTER TABLE favorite AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE image AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe(
      'ALTER TABLE furniturematerial AUTO_INCREMENT = 1',
    );
    await prisma.$executeRawUnsafe('ALTER TABLE furniture AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE user AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe('ALTER TABLE material AUTO_INCREMENT = 1');
    await prisma.$executeRawUnsafe(
      'ALTER TABLE furnituretype AUTO_INCREMENT = 1',
    );
  } else {
    if (process.env.CONFIRM_SOFT_DELETE !== 'YES_I_AM_SURE') {
      throw new Error(
        'Set CONFIRM_SOFT_DELETE=YES_I_AM_SURE to run clean up in prod!',
      );
    }
    console.log('🧹 [PROD] Soft deleting all data...');
    // Soft delete: Set deleted_at timestamp
    await Promise.all([
      prisma.favorite.updateMany({ data: { deleted_at: now } }),
      prisma.image.updateMany({ data: { deleted_at: now } }),
      prisma.furniturematerial.updateMany({ data: { deleted_at: now } }),
      prisma.furniture.updateMany({ data: { deleted_at: now } }),
      prisma.user.updateMany({ data: { deleted_at: now } }),
      prisma.material.updateMany({ data: { deleted_at: now } }),
      prisma.furnituretype.updateMany({ data: { deleted_at: now } }),
    ]);
  }

  console.log('🧹 Cleaning up complete.');
}

export default cleanUp;
