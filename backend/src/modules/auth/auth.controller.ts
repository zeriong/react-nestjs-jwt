import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AccessTokenOutput } from './dtos/token.dto';
import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { CoreOutput } from '../../common/dtos/coreOutput.dto';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwtRefreshAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() input: LoginInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginOutput> {
    return this.authService.login(input, response);
  }

  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req): Promise<AccessTokenOutput> {
    return this.authService.refreshToken(req.user, req);
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Req() req, @Res({ passthrough: true }) res: Response): Promise<CoreOutput> {
    console.log('logout: 접근');
    return this.authService.logout(req.user, res);
  }
}
