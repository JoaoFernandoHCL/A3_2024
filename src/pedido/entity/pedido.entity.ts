import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/user/entity/user.entity'
import { PedidoItens } from 'src/pedido-itens/entity/pedido-itens.entity';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number; 

  @Column({ nullable: true, length: 10 })
  data_compra: string;

  @Column({ nullable: true, type: 'decimal', precision: 7, scale: 2 })
  preco_total: number;
  
  @Column({ nullable: true, length: 15})
  status: string;

  @ManyToOne(() => User, (user) => user.pedidos)
  user: User;

  @OneToMany(()=> PedidoItens, (pedidoItens) => pedidoItens.pedidos)
  pedidoItens: PedidoItens[];
}
