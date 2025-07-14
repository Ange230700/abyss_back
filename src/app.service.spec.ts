// src\app.service.spec.ts

import { AppService } from '~/src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('getHello should return "Hello World!"', () => {
    expect(service.getHello()).toBe('Hello World!');
  });
});
