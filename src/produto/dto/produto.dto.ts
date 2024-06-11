import { PartialType } from "@nestjs/mapped-types";
import { Length, IsString, IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreateProdutoDto {
    @IsString()
    @Length(1, 40, {message: 'O nome de um produto nao deve estar vazio'})
    @ApiProperty({ description: 'Nome do produto' })
    nome: string;

    @IsString()
    @Length(1,10, {message: 'A categoria de um produto nao deve estar vazia'})
    @ApiProperty({ description: 'Categoria do produto' })
    categoria: string;

    @IsNumber()
    @ApiProperty({ description: 'Preco por unidade do produto' })
    preco: number;

    @IsString()
    @Length(1, 4, {message: 'A unidade de medida de um produto nao deve estar vazia'})
    @ApiProperty({ description: 'Unidade de medida do produto' })
    unidade_medida: string;

}

export class UpdateProdutoDto extends PartialType(CreateProdutoDto){}
