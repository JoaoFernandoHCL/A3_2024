import { Column, Entity,JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from "../user/user.entity"

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number; 

  @ManyToOne(() => User, (user) => user.pedido)
  @JoinColumn({ name: 'id_user' })
  id_user: User;

  @Column({ length: 10 })
  data_compra: string;

  @Column({ })
  preco_total: number;

}