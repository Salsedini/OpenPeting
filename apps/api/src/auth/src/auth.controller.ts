import {
  Body,
  Controller,
  Logger,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDTO } from '../../../../../contracts/src/lib/Auth/auth.dto';

@Controller('login')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @Post()
  async login(
    @Body() loginDTO: AuthDTO
  ): Promise<{ email: string }> {
    const { email, password } = loginDTO;

    const userId = await this.authService.validateUser(email, password);

    if (!userId) {
      throw new UnauthorizedException();
    }

    return {
      email: userId,
    };
  }
}
