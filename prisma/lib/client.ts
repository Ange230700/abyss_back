// prisma\lib\client.ts

import { PrismaClient } from '@prisma/client';
import { getSoftDeleteExtension } from '~/prisma/extensions/softDelete';

// Soft delete filter is enabled by default (production/staging)
const disableSoftDeleteFilter = process.env.DISABLE_SOFT_DELETE === 'true';

// You can use NODE_ENV as well if you want different behavior in dev
const prisma = new PrismaClient().$extends(
  getSoftDeleteExtension({ disableFilter: disableSoftDeleteFilter }),
);

export default prisma;
