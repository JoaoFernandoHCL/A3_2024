import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entity/user.entity'
import { PedidoItens } from 'src/pedido-itens/entity/pedido-itens.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number; 

  @Column({ length: 10 })
  data_compra: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  preco_total: number;
  
  @Column({ length: 15})
  status: string;

  @ManyToOne(() => User, (user) => user.pedidos)
  user: User;

  @ManyToMany(()=> PedidoItens, (pedidoItens) => pedidoItens.pedidos)
  pedidoItens: PedidoItens[];
}
