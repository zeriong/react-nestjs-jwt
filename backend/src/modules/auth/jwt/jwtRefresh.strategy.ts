import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { RefreshPayload } from './jwt.interfaces';
import { User } from '../../../entities/user.entity';
import { UserService } from '../../user/user.service';

const fromCookie = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['rt']; // refreshToken 쿠키에서 받아옴
  }
  return token;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly usersService: UserService,
  ) {
    super({
      jwtFromRequest: fromCookie,
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
    });
  }

  async validate(payload: RefreshPayload): Promise<User | null> {
    let user = null;
    try {
      console.log('JwtRefreshStrategy: 접근');
      user = this.usersService.findById(payload.sub);
      console.log('JwtRefreshStrategy: 검증');
    } catch (e) {
      console.log('JwtRefreshStrategy: 오류 - 1');
      throw new UnauthorizedException();
    }

    if (!user) {
      console.log('JwtRefreshStrategy: 오류 - 2');
      throw new UnauthorizedException();
    }

    return user;
  }
}
