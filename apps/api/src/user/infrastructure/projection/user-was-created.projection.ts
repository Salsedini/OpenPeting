import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserWasCreatedEvent } from '../../domain/event';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Logger } from '@nestjs/common';

@EventsHandler(UserWasCreatedEvent)
export class UserWasCreatedProjection
    implements IEventHandler<UserWasCreatedEvent>
{
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
    ) { }

    async handle(event: UserWasCreatedEvent) {
        Logger.log("AAAAAAAAAAAAAAa")
        const user = new this.userProjection({
            ...event.payload,
        });
        await user.save();
    }
}
