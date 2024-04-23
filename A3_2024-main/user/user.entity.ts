import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from 'src/pedido/pedido.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number; 

  @Column({ unique: true, length: 40 })
  email: string;

  @Column({ length: 60 })
  senha: string;

  @Column({ length: 40 })
  nome: string;

  @Column({ length: 10 })
  tipo: string;
  
  @OneToMany(() => Pedido, (pedido) => pedido.id_user)
  pedido: Pedido[];
}
