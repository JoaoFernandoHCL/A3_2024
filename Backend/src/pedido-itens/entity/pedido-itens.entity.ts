import { Pedido } from 'src/pedido/entity/pedido.entity';
import { Produto } from 'src/produto/entity/produto.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class PedidoItens {

  @PrimaryColumn({default: 0})
  id_pedido: number;

  @PrimaryColumn({default: 0})
  id_produto: number;
  
  @ManyToOne(()=>Pedido, (pedidos)=>pedidos.pedidoItens)
  @JoinColumn({name: 'id_pedido'})
  pedidos: Pedido;

  @ManyToOne(()=>Produto, (produtos)=>produtos.pedidoItens)
  @JoinColumn({name: 'id_produto'})
  produtos: Produto;
    
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  preco_unidade: number;
  
  @Column({ type: 'decimal', precision: 5, scale: 2 })
  quantidade: number;
}