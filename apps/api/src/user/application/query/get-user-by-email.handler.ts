import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { USER_FINDER, UserFinder } from '../service';
import { GetUserByNameQuery } from './get-user-by-name.query';
import { UserDTO } from 'contracts/src/lib/User-dtos';
import { UserMail, UserName } from '../../domain/model/value_object';
import { GetUserByEmailQuery } from './get-user-by-email.query';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler implements IQueryHandler {
    constructor(
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
    ) { }

    async execute(query: GetUserByEmailQuery): Promise<UserDTO> {
        return this.userFinder.findByEmail(UserMail.fromString(query.email));
    }
}
