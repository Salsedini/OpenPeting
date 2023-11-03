import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { USER_FINDER, UserFinder } from '../service';
import { GetUsersQuery } from './get-users.query';
import { UserDTO } from '@hdd-skeleton/contracts';

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler {
    constructor(
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
    ) { }

    async execute(_: GetUsersQuery): Promise<Array<UserDTO>> {
        return this.userFinder.findAll();
    }
}
