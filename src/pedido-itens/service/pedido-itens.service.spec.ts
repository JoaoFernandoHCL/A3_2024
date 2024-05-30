import { Test, TestingModule } from '@nestjs/testing';
import { PedidoItensService } from './pedido-itens.service';

describe('PedidoItensService', () => {
  let service: PedidoItensService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PedidoItensService],
    }).compile();

    service = module.get<PedidoItensService>(PedidoItensService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
