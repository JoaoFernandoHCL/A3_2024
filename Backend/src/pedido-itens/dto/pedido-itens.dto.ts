import { PartialType } from "@nestjs/mapped-types";
import { IsNumber } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';


export class CreatePedidoItensDto {
    @IsNumber()
    @ApiProperty({ description: 'Id do pedido' })
    pedido_id: number;

    @IsNumber()
    @ApiProperty({ description: 'Id do produto escolhido' })
    produto_id: number;

    @IsNumber()
    @ApiProperty({ description: 'Preco por unidade do produto escolhido' })
    preco_unidade: number;

    @IsNumber()
    @ApiProperty({ description: 'Quantia de unidades do produto escolhido' })
    quantidade: number;
}

export class UpdatePedidoItensDto extends PartialType(CreatePedidoItensDto){}
