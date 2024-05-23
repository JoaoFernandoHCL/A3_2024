import { Module } from '@nestjs/common';
import { PedidoService } from './service/pedido.service';
import { PedidoController } from './controller/pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Pedido } from './entity/pedido.entity';
import { UserService } from 'src/user/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Pedido])],
  providers: [PedidoService, UserService],
  controllers: [PedidoController]
})
export class PedidoModule {}
