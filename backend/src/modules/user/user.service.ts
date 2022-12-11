import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CreateAccountDto } from './dtos/createAccount.dto';
import * as bcrypt from 'bcrypt';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';

/** 실질적인 서비스 구현 */
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
      /** 계정생성 */
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
  /** 모든유저정보 */
  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  /** id 검색 */
  async getAcc(userId: number) {
    const get = await this.userRepository.findOne({ where: { id: userId } });
    if (!get) {
      throw new NotFoundException('존재하지 않는 ID입니다.');
    }
    return get;
  }
  /** id 삭제 */
  async delete(userId: number): Promise<CoreOutput> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      return { success: false, error: '해당 아이디는 존재하지 않습니다.' };
    } else {
      return { success: true };
    }
  }
  /** id 업데이트 */
  async update(userId: number, updateData: object): Promise<CoreOutput> {
    try {
      await this.userRepository.update(userId, updateData);
      return {
        success: true,
      };
    } catch (error) {
      return { success: false, error: '유저 데이터 업데이트 실패' };
    }
  }
  /** 단일조건 검색용 메소드 */
  async findOne(condition: any): Promise<User> {
    return this.userRepository.findOne(condition);
  }
}
