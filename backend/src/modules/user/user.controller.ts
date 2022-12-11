import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';
import { CreateAccountDto } from './dtos/createAccount.dto';
import { User } from '../../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Post('resister')
  async createAccount(@Body() input: CreateAccountDto): Promise<CoreOutput> {
    return this.userService.createAccount(input);
  }
}
