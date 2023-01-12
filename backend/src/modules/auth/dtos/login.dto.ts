import * as Validator from 'class-validator';
import { User } from '../../../entities/user.entity';
import { CoreOutput } from '../../../common/dtos/coreOutput.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginInput {
  /** email */
  @ApiProperty({
    description: '유저 이메일',
    required: true,
    example: 'test@test.com',
  })
  @Validator.IsEmail({}, { message: '이메일을 입력해 주시기 바랍니다.' })
  email: string;

  /** password */
  @ApiProperty({
    description: '유저 비밀번호',
    required: true,
    example: 'a123456789',
  })
  @Validator.Length(8, 100, {
    message: '비밀번호는 최소 8자 이상이어야 합니다.',
  })
  @Validator.IsString()
  password: string;
}

export class LoginOutput extends CoreOutput {
  user?: User;

  @Validator.IsString()
  accessToken?: string;
}

export class LogOutInput {
  @Validator.IsNumber()
  userId: number;
}
