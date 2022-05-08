import { Test, TestingModule } from '@nestjs/testing';
import { UserCarrierController } from './user-carrier.controller';

describe('UserCarrierController', () => {
  let controller: UserCarrierController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCarrierController],
    }).compile();

    controller = module.get<UserCarrierController>(UserCarrierController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
