// src\prisma\prisma.service.ts

import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error: 'beforeExit' is valid even if not typed
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
