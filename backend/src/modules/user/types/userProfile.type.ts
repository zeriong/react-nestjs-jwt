import { OmitType } from '@nestjs/mapped-types';
import { User } from '../../../entities/user.entity';

export class UserProfile extends OmitType(User, ['password']) {
  dummy?: string;
}
