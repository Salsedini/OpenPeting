import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserWasDeletedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Model } from 'mongoose';


@EventsHandler(UserWasDeletedEvent)
export class UserWasDeletedProjection implements IEventHandler<UserWasDeletedEvent>{
    
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model <UserDocument>
    )  { }
    
    handle(event: UserWasDeletedEvent) {
        this.userProjection.findByIdAndDelete(event.aggregateId).exec();
    }

}