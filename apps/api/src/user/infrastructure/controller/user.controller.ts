import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
    ValidationPipe,
} from '@nestjs/common';
import { CreateUserDTO } from '@hdd-skeleton/contracts';

import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {

        const createdUserResult = await this.userService.createUser(createUserDTO);

        createdUserResult.mapErr(
            (err) => { throw new HttpException(err.message, HttpStatus.CONFLICT) }
        );
    }

}
