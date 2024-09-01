import {
    Controller,
    Get,
    HttpCode,
} from '@nestjs/common';

import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetAllUsersDTO } from 'contracts/src/lib/User-dtos/get-all-users.dto';
import { Roles, Role } from '@hdd-skeleton/common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get all Users' })
  @ApiCreatedResponse({
    description: 'Users received',
    type: [GetAllUsersDTO],
  })
  @Get()
  @HttpCode(200)
  async get() {
    return await this.userService.getUsers();
  }
}
