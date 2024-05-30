import { Pedido } from 'src/pedido/entity/pedido.entity';
import { Produto } from 'src/produto/entity/produto.entity';
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class PedidoItens {

  @PrimaryColumn()
  pedido_id: number;
  @ManyToMany(()=>Pedido, (pedido)=>pedido.pedidoItens)
  @JoinColumn({name:'pedido_id'})
  pedidos: Pedido[];

  @PrimaryColumn()
  produto_id: number;
  @ManyToMany(()=>Produto, (produto)=>produto.pedidoItens)
  @JoinColumn({name:'produto_id'})
  produtos: Produto[];
    
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  preco_unidade: number;
  
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  quantidade: number;
}