// prisma\extensions\softDelete.ts

import { Prisma } from '@prisma/client';

const SOFT_DELETE_MODELS = [
  'user',
  'furniture',
  'favorite',
  'furnituretype',
  'furniturematerial',
  'image',
  // Add more as needed
];

// Helper to check if a model should have soft delete logic
const hasSoftDelete = (model?: string) =>
  !!model && SOFT_DELETE_MODELS.includes(model);

export function getSoftDeleteExtension({ disableFilter = false } = {}) {
  return Prisma.defineExtension({
    name: 'softDeleteExtension',
    query: {
      $allModels: {
        async findMany({ model, args, query }) {
          args.where ??= {};
          if (!disableFilter && hasSoftDelete(model)) {
            args.where.deleted_at ??= null;
          }
          return query(args);
        },
        async findUnique({ model, args, query }) {
          if (
            !disableFilter &&
            hasSoftDelete(model) &&
            args.where &&
            args.where.deleted_at === undefined
          ) {
            args.where.deleted_at = null;
          }
          return query(args);
        },
        async findFirst({ model, args, query }) {
          args.where ??= {};
          if (!disableFilter && hasSoftDelete(model)) {
            args.where.deleted_at ??= null;
          }
          return query(args);
        },
        // Optionally, handle count/aggregate/groupBy as well if desired
      },
    },
  });
}
