import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IUser } from './types/user';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private httpService: HttpService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: string): Promise<IUser> {
    const response = await firstValueFrom(
      this.httpService.get(`http://localhost:3000/api/users/${payload}`),
    );
    if (!response.data) {
      throw new UnauthorizedException();
    }
    return response.data;
  }
}
