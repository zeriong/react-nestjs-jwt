import { coreEntity } from '../common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends coreEntity {
  /** email */
  @Column({ unique: true, length: 55, comment: '유저 이메일' })
  email: string;

  /** password */
  @Column({ select: false }) //select할 수 없게 만듦
  password: string;

  /** name */
  @Column({ length: 30, comment: '유저 이름' })
  name: string;

  /** mobile */
  @Column({ length: 16, comment: '휴대폰변호' })
  mobile: string;
}
