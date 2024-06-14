import { Module } from '@nestjs/common';
import { PedidoItensService } from './service/pedido-itens.service';
import { PedidoItensController } from './controller/pedido-itens.controller';
import { Produto } from 'src/produto/entity/produto.entity';
import { Pedido } from 'src/pedido/entity/pedido.entity';
import { PedidoItens } from './entity/pedido-itens.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoService } from 'src/pedido/service/pedido.service';
import { ProdutoService } from 'src/produto/service/produto.service';
import { UserService } from 'src/user/service/user.service';
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, PedidoItens, Produto, User])],
  providers: [PedidoItensService, PedidoService, ProdutoService, UserService],
  controllers: [PedidoItensController]
})
export class PedidoItensModule {}
