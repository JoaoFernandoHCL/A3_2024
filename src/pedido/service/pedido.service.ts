import { User } from "src/user/entity/user.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserService } from "src/user/service/user.service";
import { Pedido } from "../entity/pedido.entity";
import { CreatePedidoDto, UpdatePedidoDto } from "../dto/pedido.dto";


@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private pedidoRepository: Repository<Pedido>,
    private userService: UserService
  ) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const user = await this.userService.findOne(createPedidoDto.userId);
    if (!user) {
        throw new HttpException(`Usuário não encontrado.`, HttpStatus.NOT_FOUND);
    }
    const newPedido = this.pedidoRepository.create({
      ...createPedidoDto,
      user: user, // Associando o usuário encontrado ao novo registro de pedido
    });
    return await this.pedidoRepository.save(newPedido);
  }

  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id_pedido: id },
      relations: ["user", "pedidoItens"],
    });
    if (!pedido) {
        throw new HttpException(`Pedido não encontrado.`, HttpStatus.NOT_FOUND)
    }
    return pedido;
  }

  async update(
    id: number,
    updatePedidoDto: UpdatePedidoDto
  ): Promise<Pedido> {
    const pedido = await this.findOne(id);
    delete updatePedidoDto.userId;

    const updated = this.pedidoRepository.merge(pedido, updatePedidoDto);
    return await this.pedidoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const pedido = await this.findOne(id);
    await this.pedidoRepository.remove(pedido);
  }
}