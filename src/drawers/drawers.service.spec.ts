import { Test, TestingModule } from '@nestjs/testing';
import { DrawersService } from './drawers.service';

describe('DrawersService', () => {
  let service: DrawersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawersService],
    }).compile();

    service = module.get<DrawersService>(DrawersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
