import { Module } from '@nestjs/common';
import { PedidoItensService } from './service/pedido-itens.service';
import { PedidoItensController } from './controller/pedido-itens.controller';
import { Produto } from 'src/produto/entity/produto.entity';
import { Pedido } from 'src/pedido/entity/pedido.entity';
import { PedidoItens } from './entity/pedido-itens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoItens, Produto])],
  providers: [PedidoItensService],
  controllers: [PedidoItensController]
})
export class PedidoItensModule {}
