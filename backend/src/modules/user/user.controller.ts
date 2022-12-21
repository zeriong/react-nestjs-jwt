import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../entities/user.entity';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';
import { CreateAccountDto } from './dtos/createAccount.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('test')
  test() {
    return 'test';
  }

  /** 유저데이터 전체 검색 */
  @Get('all')
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  /** id로 유저데이터검색 */
  @Get(':id')
  getAcc(@Param('id') id: number) {
    return this.userService.getAcc(id);
  }
  /** 유저데이터 생성 */
  @Post('register')
  createAccount(@Body() input: CreateAccountDto): Promise<CoreOutput> {
    return this.userService.createAccount(input);
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
