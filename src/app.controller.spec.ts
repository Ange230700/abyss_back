// src\app.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '~/src/app.controller';
import { AppService } from '~/src/app.service';

describe('AppController', () => {
  let controller: AppController;
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
    service = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('getHello should return value from service', () => {
    jest.spyOn(service, 'getHello').mockReturnValue('Hello Test!');
    expect(controller.getHello()).toBe('Hello Test!');
  });
});
