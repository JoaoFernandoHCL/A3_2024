import { Module } from '@nestjs/common';
import { PedidoItensService } from './service/pedido-itens.service';
import { PedidoItensController } from './controller/pedido-itens.controller';

@Module({
  providers: [PedidoItensService],
  controllers: [PedidoItensController]
})
export class PedidoItensModule {}
