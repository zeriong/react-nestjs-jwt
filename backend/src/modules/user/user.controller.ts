import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { JwtAuthGuard } from '../auth/guards/jwtAuth.guard';
import { UpdateAccountDto } from './dtos/updateAccount.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('user')
@ApiTags('User') //스웨거 Tag를 지정
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** 유저데이터 전체 검색 */
  @Get('all')
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  /** 유저데이터 생성 */
  @Post('register')
  createAccount(@Body() input: CreateAccountDto): Promise<CoreOutput> {
    return this.userService.createAccount(input);
  }

  /** 유저데이터 수정 */
  @Patch('modify')
  @UseGuards(JwtAuthGuard)
  profileUpdate(
    @Req() req,
    @Body() updateData: UpdateAccountDto,
  ): Promise<CoreOutput> {
    return this.userService.profileUpdate(req.user, updateData);
  }

  /** 프로필 response */
  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({
    summary: '유저프로필',
    description: '유저프로필 데이터 API',
  })
  @ApiCreatedResponse({
    description: '성공여부',
    schema: {
      example: { success: true },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async profile(@Req() req): Promise<User> {
    return await this.userService.profile(req.user.id);
  }

  /** id로 유저데이터 삭제 */
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<CoreOutput> {
    return this.userService.delete(id);
  }
}
