import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { AccessTokenOutput } from './dtos/token.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';
import { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwtRefreshAuth.guard';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth') //스웨거 Tag를 지정
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /** 로그인 */
  @Post('login')
  @ApiOperation({
    summary: '로그인',
    description: '로그인 검증 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: {
        success: true,
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJzb3J5NTMzOUBnbWFpbC5jb20iLCJzdWIiOjEsImlhdCI6MTY0NzgyMjQxMCwiZXhwIjoxNjQ3ODIyNDcwfQ.NpWT0a2VxTLPqbl3ZHwqlNYh4Rwwhv0p0WWgUpaY3CE',
        id: 'number',
        createAt: '2023-01-11T13:41:16.902Z',
        updateAt: '2023-01-12T15:41:40.000Z',
        mobile: '010-0000-1000',
        email: 'test@test.com',
        password:
          '$2b$10$sPb27K9BRTP.hhvM32822OMyYdQiRsFTOJU3/06qYb8KGBQEWEnDu',
        name: '홍길동',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginInput })
  async login(
    @Body() input: LoginInput,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginOutput> {
    return this.authService.login(input, response);
  }

  /** 토큰 리프래쉬 */
  @Get('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(@Req() req): Promise<AccessTokenOutput> {
    return this.authService.refreshToken(req.user, req);
  }

  /** 로그아웃 */
  @Get('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ): Promise<CoreOutput> {
    console.log('logout: 접근');
    return this.authService.logout(req.user, res);
  }
}
