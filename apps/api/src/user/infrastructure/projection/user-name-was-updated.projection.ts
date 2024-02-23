import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserNameWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@EventsHandler(UserNameWasUpdatedEvent)
export class UserNameWasUpdatedProjection
  implements IEventHandler<UserNameWasUpdatedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>
  ) {}

  async handle(event: UserNameWasUpdatedEvent) {
    await this.userProjection
      .findByIdAndUpdate(event.aggregateId, {
        name: event.name,
      })
      .exec();
  }
}
