import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { USER_FINDER, UserFinder } from '../service';
import { GetUserByIdQuery } from './get-user-by-id.query';
import { Inject } from '@nestjs/common';
import { UserDTO } from 'contracts/src/lib/User-dtos';
import { UserId } from '../../domain/model/value_object';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler {
    constructor(
        @Inject(USER_FINDER)
        private readonly userFinder: UserFinder,
    ) { }

    async execute(query: GetUserByIdQuery): Promise<UserDTO> {
        return this.userFinder.findById(UserId.fromString(query.id));
    }
}   