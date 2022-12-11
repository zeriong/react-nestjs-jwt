import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateAccountDto } from './dtos/createAccount.dto';
import * as bcrypt from 'bcrypt';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';

// 실질적인 서비스 구현
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async createAccount(input: CreateAccountDto): Promise<CoreOutput> {
    try {
      //중복 검증
      const exists = await this.userRepository.findOne({
        where: [{ email: input.email }],
      });
      if (exists) {
        return {
          success: false,
          target: 'email',
          error: `이미 등록된 이메일입니다.`,
        };
      }
      //계정생성
      const user = await this.userRepository.save(
        this.userRepository.create({
          email: input.email,
          password: await bcrypt.hash(input.password, 10),
          name: input.name,
          mobile: input.mobile,
        }),
      );
      return { success: true };
    } catch (e) {
      return { success: false, error: '계정생성에 실패했습니다.' };
    }
  }
  getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
