import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  id_produto: number; 

  @Column({ unique: true, length: 40 })
  nome: string;

  @Column({ })
  preco: number;

  @Column({ length: 4 })
  unidade_medida: string;

}
