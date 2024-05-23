import { Test, TestingModule } from '@nestjs/testing';
import { DrawersController } from './drawers.controller';
import { DrawersService } from './drawers.service';

describe('DrawersController', () => {
  let controller: DrawersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawersController],
      providers: [DrawersService],
    }).compile();

    controller = module.get<DrawersController>(DrawersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
