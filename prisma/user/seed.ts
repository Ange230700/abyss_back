// prisma\user\seed.ts

import prisma from '~/prisma/lib/client';
import cleanUp from '~/prisma/helpers/cleanUp';
import { faker } from '@faker-js/faker';

const ROLES = ['admin', 'visitor', 'customer', 'seller'] as const;

async function seedUser() {
  const skipCleanup = process.env.SKIP_CLEANUP === 'true';

  if (!skipCleanup) {
    console.log('🧹 Cleaning up…');
    await cleanUp();
    console.log('🧹 Cleaning up complete.');
  } else {
    console.log('⚠️ Skipping cleanup (SKIP_CLEANUP=true)');
  }

  const COUNT = 5;

  const fakeUsersList = Array.from({ length: COUNT }).map(() => ({
    user_name: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: faker.helpers.arrayElement(ROLES),
  }));

  await prisma.user.createMany({
    data: fakeUsersList,
    skipDuplicates: true,
  });

  console.log(`🎉 Seeded ${COUNT} records in user.`);
}

export default seedUser;
