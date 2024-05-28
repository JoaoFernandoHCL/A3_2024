import { PartialType } from "@nestjs/mapped-types";
import { IsDecimal, IsInt } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreatePedidoItensDto {
    @IsInt()
    @ApiProperty({ description: 'Id do pedido' })
    pedido_id: number;

    @IsInt()
    @ApiProperty({ description: 'Id do produto escolhido' })
    produto_id: number;

    @IsDecimal()
    @ApiProperty({ description: 'Preco por unidade do produto escolhido' })
    preco_unidade: number;

    @IsDecimal()
    @ApiProperty({ description: 'Quantia de unidades do produto escolhido' })
    quantidade: number;
}

export class UpdatePedidoItensDto extends PartialType(CreatePedidoItensDto){}
