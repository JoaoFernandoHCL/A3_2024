import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PedidoItens } from 'src/pedido-itens/entity/pedido-itens.entity';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number; 

  @Column({ unique: true, length: 40 })
  nome: string;

  @Column({ length: 10 })
  categoria: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  preco: number;

  @Column({ length: 4 })
  unidade_medida: string;

  @OneToMany(()=> PedidoItens, (pedidoItens) => pedidoItens.produtos)
  pedidoItens: PedidoItens[];

}

