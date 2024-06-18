import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    HttpCode,
    HttpStatus,
    UseGuards,
  } from "@nestjs/common";
import { PedidoService } from "../service/pedido.service";
import { CreatePedidoDto, UpdatePedidoDto } from "../dto/pedido.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard.strategy";

  @UseGuards(JwtAuthGuard)
  @Controller("pedidos")
  @ApiTags('pedidos')
  export class PedidoController {
    constructor(private readonly pedidoService: PedidoService) {}
  
    @Post()
    @ApiOperation({ summary: 'Criar um novo pedido' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
    async create(@Body() createPedidoDto: CreatePedidoDto) {
      return await this.pedidoService.create(createPedidoDto);
    }
  
    @Get()
    @ApiOperation({ summary: 'Achar todos os pedidos' })
    async findAll() {
      return await this.pedidoService.findAll();
    }
  
    @Get(":id")
    @ApiOperation({ summary: 'Achar um pedido pelo seu Id' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Pedido não encontrado.' })
    async findOne(@Param("id") id: number) {
      return await this.pedidoService.findOne(id);
    }
  
    @Put(":id")
    @ApiOperation({ summary: 'Atualizar um pedido pelo seu Id' })
    async update(
      @Param("id") id: number,
      @Body() updatePedidoDto: UpdatePedidoDto
    ) {
      return await this.pedidoService.update(id, updatePedidoDto);
    }
  
    @Delete(":id")
    @ApiOperation({ summary: 'Deletar um pedido pelo seu Id' })
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param("id") id: number) {
      return await this.pedidoService.remove(id);
    }
  }