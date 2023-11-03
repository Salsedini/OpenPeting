import {
    Body,
    Controller,
    Get,
    HttpCode,
    ValidationPipe,
} from '@nestjs/common';
import { GetAllUsersDTO } from '@hdd-skeleton/contracts';

import { UserService } from '../service/user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(200)
    async get(@Body(new ValidationPipe()) getAllUsersDTO: GetAllUsersDTO) {
        return await this.userService.getUsers(getAllUsersDTO);

    }

}
