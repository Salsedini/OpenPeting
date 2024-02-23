import {
    Body,
    Controller,
    Delete,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    ValidationPipe,
} from '@nestjs/common';


import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UpdateUserDTO } from 'contracts/src/lib/User-dtos/update-user.dto';
import { CreateUserDTO } from 'contracts/src/lib/User-dtos/create-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Creates an User' })
    @ApiCreatedResponse({
      description: 'User created',
      type: CreateUserDTO,
    })
    @Post()
    @HttpCode(200)
    async create(@Body(new ValidationPipe()) createUserDTO: CreateUserDTO) {

        const createdUserResult = await this.userService.createUser(createUserDTO);

        createdUserResult.mapErr(
            (err) => { throw new HttpException(err.message, HttpStatus.CONFLICT) }
        );
    }

    @ApiOperation({ summary: 'Updates an User' })
    @ApiCreatedResponse({
      description: 'User updated',
      type: UpdateUserDTO,
    })
    @Put(':id')
    @HttpCode(200)
    async update(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDTO: UpdateUserDTO){

        const params = {id, fieldsToUpdate: updateUserDTO};

        const updatedUserResult = await this.userService.updateUser(params);
    
        console.log('updatedUserResult: ', updatedUserResult);

        updatedUserResult.mapErr(
            (err) => { throw new HttpException(err.message, HttpStatus.CONFLICT)}
        );
        
    }

    @ApiOperation({ summary: 'Deletes an User' })
    @ApiCreatedResponse({
      description: 'User deleted',
    })
    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: string){

        const deletedUserResult = await this.userService.deleteUser(id);

        deletedUserResult.mapErr(
            (err) => { throw new HttpException(err.message, HttpStatus.CONFLICT)}
        );

    }
    
}
