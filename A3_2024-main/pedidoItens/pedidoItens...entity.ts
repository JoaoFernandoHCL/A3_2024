import { Pedido } from 'src/pedido/pedido.entity';
import { Produto } from 'src/produto/produto.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PedidoItens {

  @PrimaryGeneratedColumn()
  pedidoItens_id: number;
    
  @Column({ })
  preco_unidade: number;
  
  @Column({ })
  quantidade: number;

  @ManyToMany(()=>Pedido, (pedido=>pedido.id_pedido))
  @JoinTable()
  pedido: Pedido[];

  @ManyToMany(()=>Produto, (produto)=>produto.id_produto)
  @JoinTable()
  produtos: Produto[];

}