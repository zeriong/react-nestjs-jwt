import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AccessTokenOutput } from './dtos/token.dto';
import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';
import { Request, Response } from 'express';
//import { JwtRefreshAuthGuard } from './guards/jwtRefreshAuth.guard';
//import { UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() input: LoginInput,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<LoginOutput> {
    return this.authService.login(input, req, res);
  }

  @Post('refresh')
  async refreshToken(@Req() req): Promise<AccessTokenOutput> {
    console.log('refreshToken: 접근');
    return this.authService.refreshToken(req.user, req);
  }

  @Post('logout')
  async logout(@Req() req, @Res() res): Promise<CoreOutput> {
    console.log('logout: 접근');
    return this.authService.logout(req.user, res);
  }
}
