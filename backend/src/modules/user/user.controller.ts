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

@Controller('user')
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

  /** 프로필 response */
  @Post('profile')
  @UseGuards(JwtAuthGuard)
  async profile(@Req() req): Promise<User> {
    return await this.userService.profile(req.user.id);
  }

  /** id로 유저데이터 삭제 */
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<CoreOutput> {
    return this.userService.delete(id);
  }
  /** 유저데이터 수정 */
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateData: object,
  ): Promise<CoreOutput> {
    return this.userService.update(id, updateData);
  }
}
