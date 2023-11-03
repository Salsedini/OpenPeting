import { Module } from '@nestjs/common';
import { UserController } from './controller';

import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
    CreateUserDTO,
} from '@hdd-skeleton/contracts';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { UserWasCreatedEvent } from '../domain/event';
import { User } from '../domain/model';
import { ProjectionHandlers } from './projection';
import {
    USER_PROJECTION,
    UserSchema,
} from './projection/user.schema';
import { UserService } from './service/user.service';
import { UserProviders } from './user.providers';
import { UsersController } from './controller/users.controller';



@Module({
    controllers: [UserController, UsersController],
    imports: [
        CqrsModule,
        EventStoreModule.forFeature([User], {
            UserWasCreatedEvent: (event: Event<CreateUserDTO>) =>
                new UserWasCreatedEvent(
                    event.aggregateId,
                    event.payload.name,
                ),
        }),
        MongooseModule.forFeature([
            {
                name: USER_PROJECTION,
                schema: UserSchema,
            }
        ]),

    ], providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...UserProviders,
        UserService,
    ],
})
export class UserModule { }
