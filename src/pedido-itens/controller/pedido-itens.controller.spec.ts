import { Test, TestingModule } from '@nestjs/testing';
import { PedidoItensController } from './pedido-itens.controller';

describe('PedidoItensController', () => {
  let controller: PedidoItensController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PedidoItensController],
    }).compile();

    controller = module.get<PedidoItensController>(PedidoItensController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
