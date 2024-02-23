import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { USER_FINDER, UserFinder } from '../service';
import { GetUserByNameQuery } from './get-user-by-name.query';
import { UserDTO } from 'contracts/src/lib/User-dtos';
import { UserName } from '../../domain/model/value_object';

@QueryHandler(GetUserByNameQuery)
export class GetUserByNameHandler implements IQueryHandler {
    constructor(
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
    ) { }

    async execute(query: GetUserByNameQuery): Promise<Array<UserDTO>> {
        return this.userFinder.findByName(UserName.fromString(query.name));
    }
}
