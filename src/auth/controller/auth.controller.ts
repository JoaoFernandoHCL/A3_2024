
import { Controller, Post, Body, HttpStatus, HttpException } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autenticação do login do usuário' })
  @ApiResponse({ status: 201, description: 'Usuário logado' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: {email: string, senha: string}) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.senha);
    if (!user) {
      throw new HttpException(`Credenciais inválidas`, HttpStatus.NOT_FOUND);
    }
    return this.authService.login(user);
  }

}

