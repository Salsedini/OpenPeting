import { Module } from '@nestjs/common';
import { UserController } from './controller';

import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';


import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { UserNameWasUpdatedEvent, UserWasCreatedEvent, UserWasDeletedEvent } from '../domain/event';
import { User } from '../domain/model';
import { ProjectionHandlers } from './projection';
import {
    USER_PROJECTION,
    UserSchema,
} from './projection/user.schema';
import { UserService } from './service/user.service';
import { UserProviders } from './user.providers';
import { UsersController } from './controller/users.controller';
import { UpdateUserDTO } from 'contracts/src/lib/User-dtos/update-user.dto';
import { CreateUserDTO } from 'contracts/src/lib/User-dtos/create-user.dto';
import { UserSurnameWasUpdatedEvent, UserPhoneWasUpdatedEvent, UserMailWasUpdatedEvent, UserPictureWasUpdatedEvent } from '../domain/event/user-was-updated.event';

@Module({
    controllers: [UserController, UsersController],
    imports: [
        CqrsModule,
        EventStoreModule.forFeature([User], {
            UserWasCreatedEvent: (event: Event<CreateUserDTO>) =>
                new UserWasCreatedEvent(
                    event.aggregateId,
                    event.payload.name,
                    event.payload.surname,
                    false
                ),
            UserWasDeletedEvent: (event: Event) =>
                new UserWasDeletedEvent(
                    event.aggregateId,
                ),
            UserNameWasUpdatedEvent: (event: Event<UpdateUserDTO>) =>  
            new UserNameWasUpdatedEvent(
                event.aggregateId,
                event.payload.name,
                ),
            UserSurnameWasUpdatedEvent: (event: Event<UpdateUserDTO>) =>  
            new UserSurnameWasUpdatedEvent(
                event.aggregateId,
                event.payload.surname,
            ),
            UserPhoneWasUpdatedEvent: (event: Event<UpdateUserDTO>) =>  
            new UserPhoneWasUpdatedEvent(
                event.aggregateId,
                event.payload.phone,
            ),
            UserMailWasUpdatedEvent: (event: Event<UpdateUserDTO>) =>  
            new UserMailWasUpdatedEvent(
                event.aggregateId,
                event.payload.mail,
            ),
            UserPictureWasUpdatedEvent: (event: Event<UpdateUserDTO>) =>  
            new UserPictureWasUpdatedEvent(
                event.aggregateId,
                event.payload.picture,
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
