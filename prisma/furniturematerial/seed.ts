// prisma\furniturematerial\seed.ts

import prisma from '~/prisma/lib/client';
import { faker } from '@faker-js/faker';

async function seedFurnitureMaterial() {
  const furnitures = await prisma.furniture.findMany({ select: { id: true } });
  const materials = await prisma.material.findMany({ select: { id: true } });

  const FURNITURE_IDS = furnitures.map((f: { id: number }) => f.id);
  const MATERIAL_IDS = materials.map((m: { id: number }) => m.id);

  const links: { id_furniture: number; id_material: number }[] = [];

  FURNITURE_IDS.forEach((fid: number) => {
    const materialCount = faker.number.int({ min: 1, max: 3 });
    const usedMaterials = faker.helpers.arrayElements(
      MATERIAL_IDS,
      materialCount,
    );
    usedMaterials.forEach((mid: number) => {
      links.push({ id_furniture: fid, id_material: mid });
    });
  });

  await prisma.furniturematerial.createMany({
    data: links,
    skipDuplicates: true,
  });

  console.log(`🎉 Seeded ${links.length} records in furniturematerial.`);
}

export default seedFurnitureMaterial;
