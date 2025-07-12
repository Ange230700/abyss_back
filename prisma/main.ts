// prisma\main.ts

import prisma from '~/prisma/lib/client';
// TODO: import table seeding module

async function main() {
  console.log('🌱 Seeding...');
  // TODO: seed data
  console.log('🌱 Seeding complete.');
}

main()
  .catch((e) => {
    console.error('💥 Error seeding:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
