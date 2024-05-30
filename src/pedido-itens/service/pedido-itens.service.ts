import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PedidoItens } from "../entity/pedido-itens.entity";
import { CreatePedidoItensDto, UpdatePedidoItensDto } from "../dto/pedido-itens.dto";

@Injectable()
export class PedidoItensService {
  constructor(
    @InjectRepository(PedidoItens)
    private pedidoItensRepository: Repository<PedidoItens>,
  ) {}

  async create(
    pedidoId: number,
    produtoId: number,
    createPedidoItensDto: CreatePedidoItensDto,
  ): Promise<PedidoItens> {

    const pedidoItens = this.pedidoItensRepository.create({
        pedido_id: pedidoId,
        produto_id: produtoId,
        ... createPedidoItensDto,
    });

    return await this.pedidoItensRepository.save(pedidoItens);

  }

  async findAll(): Promise<PedidoItens[]> {
    return this.pedidoItensRepository.find({
      relations: ["pedidos", "produtos"],
    });
  }

  async findOne(pedidoId: number, produtoId: number): Promise<PedidoItens> {
    const pedidoItens = await this.pedidoItensRepository.findOne({
      where: { 
        pedido_id: pedidoId,
        produto_id: produtoId
       },
      relations: ["pedidos", "produtos"],
    });
    if (!pedidoItens) {
        throw new HttpException(`Lista de pedido com produtos nao encontrada.`, HttpStatus.NOT_FOUND);
    }
    return pedidoItens;
  }

  async update(
    pedidoId: number,
    produtoId: number,
    updatePedidoItensDto: UpdatePedidoItensDto
  ): Promise<PedidoItens> {
    const pedidoItens = await this.pedidoItensRepository.preload({
      pedido_id: pedidoId,
      produto_id: produtoId,
      ...updatePedidoItensDto,
    });
    if (!pedidoItens) {
        throw new HttpException(`Lista de pedido com produtos nao encontrada.`, HttpStatus.NOT_FOUND);
    }
    return this.pedidoItensRepository.save(pedidoItens);
  }

  async remove(pedidoId: number, produtoId: number): Promise<void> {
    const pedidoItens = await this.findOne(pedidoId, produtoId);
    await this.pedidoItensRepository.delete(pedidoItens);
  }
}