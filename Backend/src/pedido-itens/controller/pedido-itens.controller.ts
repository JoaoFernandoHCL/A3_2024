import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    UseGuards,
  } from "@nestjs/common";
import { PedidoItensService } from "../service/pedido-itens.service";
import { CreatePedidoItensDto, UpdatePedidoItensDto } from "../dto/pedido-itens.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard.strategy";

@UseGuards(JwtAuthGuard)  
@Controller('pedido-itens')
@ApiTags('pedido-itens')
export class PedidoItensController {
    constructor(private readonly pedidoItensService: PedidoItensService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo pedido com produtos' })
  async create(
    @Body() createPedidoItensDto: CreatePedidoItensDto,
  ) {
    return this.pedidoItensService.create(createPedidoItensDto);
  }

  @Get()
  @ApiOperation({ summary: 'Achar todos os pedidos com produtos' })
  async findAll() {
    return this.pedidoItensService.findAll();
  }

  @Get(":pedidoId")
  @ApiOperation({ summary: 'Achar todos os itens de um mesmo pedido' })
  async findByPedidoId(@Param("pedidoId") pedidoId: number){
    return this.pedidoItensService.findByPedidoId(pedidoId);
  }

  @Get(":pedidoId/:produtoId")
  @ApiOperation({ summary: 'Achar um pedido com produto pelos Ids de pedido e produto' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Lista de pedido com produtos nao encontrada.' })
  async findOne(@Param("pedidoId") pedidoId: number, @Param("produtoId") produtoId: number) {
    return this.pedidoItensService.findOne(pedidoId, produtoId);
  }

  @Patch(":pedidoId/:produtoId")
  @ApiOperation({ summary: 'Atualizar um pedido com produto pelos Ids de pedido e produto' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Lista de pedido com produtos nao encontrada.' })
  async update(
    @Param("pedidoId") pedidoId: number,
    @Param("produtoId") produtoId: number,
    @Body() updatePedidoItensDto: UpdatePedidoItensDto
  ) {
    return this.pedidoItensService.update(pedidoId, produtoId, updatePedidoItensDto);
  }

  @Delete(":pedidoId/:produtoId")
  @ApiOperation({ summary: 'Atualizar um pedido com produto pelos Ids de pedido e produto' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param("pedidoId") pedidoId: number,
    @Param("produtoId") produtoId: number
  ) {
    await this.pedidoItensService.remove(pedidoId, produtoId);
    return null; 
  }
}
