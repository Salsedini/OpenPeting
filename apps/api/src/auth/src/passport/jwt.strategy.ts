import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { GetUserByNameQuery } from 'apps/api/src/user/application/query/get-user-by-name.query';
import { JwtPayloadInterface } from 'contracts/src/lib/Auth/jwt-payload.interface';
import { UserDTO } from 'contracts/src/lib/User-dtos';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private queryBus: QueryBus) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret'),
    });
  }

  async validate(payload: JwtPayloadInterface): Promise<UserDTO> {
    const user = await this.queryBus.execute<GetUserByNameQuery, UserDTO>(
      new GetUserByNameQuery(payload.username)
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
