import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request, Response } from 'express';
//import { Request, Response } from '@nestjs/common';

import { User } from '../../entities/user.entity';

import { UserService } from '../user/user.service';

import { AccessPayload, RefreshPayload } from './jwt/jwt.interfaces';

import { LoginInput, LoginOutput } from './dtos/login.dto';
import { UserDataOutput } from '../user/dtos/userData.dto';
import { ConfigService } from '@nestjs/config';
import { AccessTokenOutput } from './dtos/token.dto';
import { CoreOutput } from '../../common/dtos/coreOutput.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** 로그인 */
  async login(
    { email, password }: LoginInput,
    response: Response,
  ): Promise<LoginOutput> {
    try {
      // 계정, 비밀번호 검증
      const validateUser: UserDataOutput = await this.userService.logInValidate(
        email,
        password,
      );
      // 계정, 비밀번호 검증 성공
      if (validateUser.success && validateUser.user !== null) {
        // jwt 토큰 발급
        const accessPayload: AccessPayload = {
          sub: validateUser.user.id, //validateUser = validate를통해서 user를 반환받았고 user에는 유저데이터 id가 있다. = logInValidate{ user: { id } };
        };
        const refreshPayload: RefreshPayload = {
          sub: validateUser.user.id,
        };
        console.log(
          'JWT_ACCESS_TOKEN_PRIVATE_KEY: ',
          this.config.get('JWT_ACCESS_TOKEN_PRIVATE_KEY'),
          this.config.get('JWT_ACCESS_TOKEN_EXPIRATION'),
          this.config.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
          this.config.get('JWT_REFRESH_TOKEN_EXPIRATION'),
        );
        // jwt 토큰 생성
        const [accessToken, refreshToken] = [
          /*this.jwtService.sign(accessPayload, {
            secret: this.config.get('JWT_ACCESS_TOKEN_PRIVATE_KEY'),
            expiresIn: this.config.get('JWT_ACCESS_TOKEN_EXPIRATION'),
          }),*/
          await this.jwtService.signAsync(accessPayload),
          await this.jwtService.signAsync(refreshPayload, {
            secret: this.config.get('JWT_REFRESH_TOKEN_PRIVATE_KEY'),
            expiresIn: this.config.get('JWT_REFRESH_TOKEN_EXPIRATION'),
          }),
        ];
        console.log('Token: ', accessToken, refreshToken);

        // refreshToken 쿠키 저장
        response.cookie('rt', refreshToken, {
          path: '/',
          httpOnly: true,
          sameSite: 'strict',
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 1개월 (setMaxAge)
        });
        // refreshToken 디비 저장
        await this.userService.update(validateUser.user.id, {
          refreshToken,
        });
        /*const userProfile: UserProfile = this.userService.getUserToProfile(
          validateUser.user,
        );*/

        //const userProfile: UserProfile = validateUser.user;

        return {
          success: true,
          accessToken,
          user: validateUser.user,
        };
      } else {
        return { success: false, error: validateUser.error };
      }
    } catch (e) {
      console.log('login err - ', e);
      return { success: false, error: '로그인에 실패하였습니다.' };
    }
  }

  /** accessToken 재발급 */
  async refreshToken(user: User, req: Request): Promise<AccessTokenOutput> {
    try {
      console.log('refreshToken: 스탭 1-1:', user);
      // refreshToken 쿠키에서 받아오기
      const refreshToken = req.cookies['rt'];
      // accessToken 발행 조건 검사
      console.log('refreshToken: 스탭 2');
      if (
        !refreshToken ||
        !user ||
        !user.refreshToken ||
        refreshToken != user.refreshToken
      ) {
        console.log('refreshToken: 검증 불일치 오류');
        new UnauthorizedException();
      }
      console.log('refreshToken: 스탭 3');
      // accessToken 토큰 재생성
      const accessPayload: AccessPayload = {
        sub: user.id,
      };
      const accessToken = await this.jwtService.signAsync(accessPayload);

      console.log('refreshToken: 검증');

      return { success: true, accessToken };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  /** 로그아웃 */
  async logout(user: User, res: Response): Promise<CoreOutput> {
    try {
      console.log('접근1');
      // refreshToken 쿠키 삭제 (maxAge = 쿠키유지기한)
      res.cookie('rt', '', { maxAge: 0 });
      console.log('쿠키삭제2', user.id);
      // refreshToken 디비 삭제
      await this.userService.update(user.id, {
        refreshToken: null,
      });
      console.log('접근3');
      return { success: true };
    } catch (e) {
      console.log('실패');
      return { success: false, error: '계정 생성에 실패하였습니다.' };
    }
  }
}
