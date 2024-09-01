import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { CreateUserDTO, UserDTO } from 'contracts/src/lib/User-dtos';
import { Result } from 'neverthrow';

import { CreateUserCommand } from '../../application/command/create-user.command';
import { UserError } from '../../domain/exception';
import { GetUsersQuery } from '../../application/query/get-users.query';
import { UpdateUserDTO } from 'contracts/src/lib/User-dtos/update-user.dto';
import { UpdateUserCommand } from '../../application/command/update-user.command';
import { DeleteUserCommand } from '../../application/command/delete-user.command';
import { GetUserByIdQuery } from '../../application/query/get-user-by-id.query';

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createUser(payload: CreateUserDTO): Promise<Result<null, UserError>> {
        return await this.commandBus.execute<ICommand, Result<null, UserError>>(new CreateUserCommand(payload.name, payload.password,payload.surname, payload.email, payload.role));
    }

    async updateUser(params: {id: string,  fieldsToUpdate: UpdateUserDTO}): Promise<Result<null, UserError>> {

         return await this.commandBus.execute<ICommand, Result<null, UserError>>(new UpdateUserCommand(
            params.id, 
            params.fieldsToUpdate.name,
            params.fieldsToUpdate.surname,
            params.fieldsToUpdate.phone,
            params.fieldsToUpdate.email,
            params.fieldsToUpdate.picture
        ));
    }


    async getUsers(): Promise<Array<UserDTO>> {
        return await this.queryBus.execute<IQuery, Array<UserDTO> | null>(new GetUsersQuery());
    }
    async getUserById(id: string): Promise<UserDTO> {
        return await this.queryBus.execute<IQuery, UserDTO | null>(new GetUserByIdQuery(id));
    }

    async deleteUser(id: string): Promise<Result<null, UserError>>{
        return await this.commandBus.execute<ICommand, Result<null, UserError>>(new DeleteUserCommand(id));
    }

}
