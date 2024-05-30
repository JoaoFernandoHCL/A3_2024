import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from 'src/pedido/entity/pedido.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number; 

  @Column({ length: 40 })
  nome: string;

  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 40 })
  senha: string;

  @Column({ length: 10 })
  tipo: string;
  
  @OneToMany(() => Pedido, (pedido) => pedido.user)
  pedidos: Pedido[];
}
