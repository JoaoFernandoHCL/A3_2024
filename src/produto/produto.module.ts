import { Module } from '@nestjs/common';
import { ProdutoController } from './controller/produto.controller';
import { ProdutoService } from './service/produto.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entity/produto.entity';
import { PedidoItens } from 'src/pedido-itens/entity/pedido-itens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, PedidoItens])],
  controllers: [ProdutoController],
  providers: [ProdutoService]
})
export class ProdutoModule {}
