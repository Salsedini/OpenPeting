import { Injectable } from '@nestjs/common';
import { CommandBus, ICommand, IQuery, QueryBus } from '@nestjs/cqrs';
import { CreateUserDTO, GetAllUsersDTO, UserDTO } from '@hdd-skeleton/contracts';
import { Err, Ok, Result } from 'neverthrow';

import { CreateUserCommand } from '../../application/command/create-user.command';
import { UserAlreadyExistsError, UserError } from '../../domain/exception';
import { GetUserByNameQuery } from '../../application/query/get-user-by-name.query';
import { UserName } from '../../domain/model/value_object';
import { GetUsersQuery } from '../../application/query/get-users.query';

@Injectable()
export class UserService {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async createUser(payload: CreateUserDTO): Promise<Result<null, UserError>> {
        return await this.commandBus.execute<ICommand, Result<null, UserError>>(new CreateUserCommand(payload.name));
    }


    async getUsers(_: GetAllUsersDTO): Promise<Array<UserDTO>> {
        return await this.queryBus.execute<IQuery, Array<UserDTO> | null>(new GetUsersQuery());
    }

}
