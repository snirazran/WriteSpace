import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { jwtConstants } from './constants';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IUser } from './types/user';
import { ConfigService } from '@nestjs/config';
import * as process from 'process';
interface JwtPayload {
  _id: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<IUser> {
    const response = await firstValueFrom(
      this.httpService.get(
        `${process.env.USERS_SERVICE_URL}/api/users/${payload._id}`,
      ),
    );
    if (!response.data) {
      throw new UnauthorizedException();
    }
    return response.data;
  }
}
