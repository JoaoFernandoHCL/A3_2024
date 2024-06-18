import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PedidoItens } from "../entity/pedido-itens.entity";
import { PedidoService } from "src/pedido/service/pedido.service";
import { ProdutoService } from "src/produto/service/produto.service";
import { CreatePedidoItensDto, UpdatePedidoItensDto } from "../dto/pedido-itens.dto";

@Injectable()
export class PedidoItensService {
  constructor(
    @InjectRepository(PedidoItens)
    private pedidoItensRepository: Repository<PedidoItens>,
    private pedidoService: PedidoService,
    private produtoService: ProdutoService,
  ) {}

  async create(
    createPedidoItensDto: CreatePedidoItensDto,
  ): Promise<PedidoItens> {
    const pedido = await this.pedidoService.findOne(createPedidoItensDto.pedido_id);
    const produto = await this.produtoService.findOne(createPedidoItensDto.produto_id);

    if (!pedido) {
      throw new HttpException(`Pedido não encontrado.`, HttpStatus.NOT_FOUND);
    }
    if (!produto) {
      throw new HttpException(`Produto não encontrado.`, HttpStatus.NOT_FOUND);
    }
    
    const newPedidoItens = this.pedidoItensRepository.create({
      id_pedido: createPedidoItensDto.pedido_id,
      id_produto: createPedidoItensDto.produto_id,
        ... createPedidoItensDto,
    });
    return await this.pedidoItensRepository.save(newPedidoItens);

  }

  async findAll(): Promise<PedidoItens[]> {
    return this.pedidoItensRepository.find();
  }

  async findByPedidoId(pedidoId: number): Promise<PedidoItens[]> {
    if (isNaN(pedidoId)) {
      throw new HttpException(`ID do pedido inválido: ${pedidoId}`, HttpStatus.BAD_REQUEST);
    }
    const pedidoItens = await this.pedidoItensRepository.find({
       where: { id_pedido: pedidoId },
       relations:["pedidos", "produtos"]
      });

    if (!pedidoItens) {
      throw new HttpException(`Lista de pedido com produtos nao encontrada.`, HttpStatus.NOT_FOUND);
    }
    return pedidoItens;
  }

  async findOne(pedidoId: number, produtoId: number): Promise<PedidoItens> {
    const pedidoItens = await this.pedidoItensRepository.findOne({
      where: { 
        id_pedido: pedidoId,
        id_produto: produtoId
       }, relations:[
        "pedidos",
        "produtos"
       ]
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
      id_pedido: pedidoId,
      id_produto: produtoId,
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