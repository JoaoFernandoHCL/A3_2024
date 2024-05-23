import { Column, Entity,ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoItens } from 'src/pedido-itens/entity/pedido-itens.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number; 

  @Column({ unique: true, length: 40 })
  nome: string;

  @Column({ unique: true, length: 10 })
  categoria: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  preco: number;

  @Column({ length: 4 })
  unidade_medida: string;

  @ManyToMany(()=> PedidoItens, (pedidoItens) => pedidoItens.pedidos)
  pedidoItens: PedidoItens[];

}

