import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';
import { jwtConstants } from './constants';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IUser } from './types/user';
interface JwtPayload {
  _id: string;
  iat: number;
  exp: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private httpService: HttpService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: JwtPayload): Promise<IUser> {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/api/users/${payload._id}`),
    );
    if (!response.data) {
      throw new UnauthorizedException();
    }
    return response.data;
  }
}
