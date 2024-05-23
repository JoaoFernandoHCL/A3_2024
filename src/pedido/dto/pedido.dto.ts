import { PartialType } from "@nestjs/mapped-types";
import { Length, IsInt, IsDecimal, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreatePedidoDto {
    @IsString()
    @Length(5,10,{message: 'Insira uma data válida'})
    @ApiProperty({ description: 'Data da compra do pedido' })
    data_compra: string;

    @IsDecimal()
    @ApiProperty({ description: 'Preco total do pedido' })
    preco_total: number;

    @IsString()
    @Length(1,15)
    @ApiProperty({ description: 'Status do pedido' })
    status: string;

    @IsInt()
    @ApiProperty({ description: 'ID do usuario que fez o pedido' })
    userId: number;
}

export class UpdatePedidoDto extends PartialType(CreatePedidoDto) {}