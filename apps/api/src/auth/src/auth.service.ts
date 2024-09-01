import { Injectable, Logger } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';

import { GetUserByNameQuery } from '../../user/application/query/get-user-by-name.query';
import { UserDTO } from 'contracts/src/lib/User-dtos';
import { AccessTokenInterface } from 'contracts/src/lib/Auth/access-token.interface';
import { JwtPayloadInterface } from 'contracts/src/lib/Auth/jwt-payload.interface';
import { delay } from 'rxjs';
import { GetUserByEmailQuery } from '../../user/application/query/get-user-by-email.query';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(private queryBus: QueryBus, private jwtService: JwtService) {}

  async encodePassword(password: string): Promise<string> {
    console.log('🚀 ~ AuthService ~ encodePassword ~ password:', password);

    // const salt = await bcrypt.genSalt(10);
    console.log('🚀 ~ AuthService ~ encodePassword ~ salt:');

    return '';
  }

  async validateUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.queryBus.execute<GetUserByEmailQuery, UserDTO>(
        new GetUserByEmailQuery(email)
      );
      if(password === user.password){
        return user._id;
      }
      
    } catch (e) {
      this.logger.error(`Access error with username ${email}: ${e.message}`);

      return '';
    }
  }

  async generateAccessToken(username: string): Promise<AccessTokenInterface> {
    const user = await this.queryBus.execute<GetUserByNameQuery, UserDTO>(
      new GetUserByNameQuery(username)
    );

    const payload: JwtPayloadInterface = {
      username: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        algorithm: 'HS512',
      }),
    };
  }
}
