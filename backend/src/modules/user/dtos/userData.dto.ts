import * as Validator from 'class-validator';
import { User } from '../../../entities/user.entity';
import { CoreOutput } from '../../../common/dtos/coreOutput.dto';

export class UserDataInput {
  @Validator.IsNumber()
  userId;
}

export class UserDataOutput extends CoreOutput {
  user?: User;
}
