import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ProdutoService } from '../service/produto.service';
import { CreateProdutoDto, UpdateProdutoDto  } from '../dto/produto.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('produtos')
@ApiTags('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar um novo produto' })
  async create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Achar todos os produtos' })
  async findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Achar um produto pelo seu Id' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Produto não encontrado.' })
  async findOne(@Param('id') id: number) {
    return this.produtoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo seu Id' })
  async update(@Param('id') id: number, @Body() updateProjetoDto: UpdateProdutoDto) {
    return this.produtoService.update(id, updateProjetoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deletar um produto pelo seu Id' })
  async remove(@Param('id') id: number) {
    await this.produtoService.remove(id);
    return null;
  }
}
