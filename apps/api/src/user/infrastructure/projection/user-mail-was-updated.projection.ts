import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserMailWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@EventsHandler(UserMailWasUpdatedEvent)
export class UserMailWasUpdatedProjection
  implements IEventHandler<UserMailWasUpdatedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>
  ) {}

  async handle(event: UserMailWasUpdatedEvent) {
    await this.userProjection
      .findByIdAndUpdate(event.aggregateId, {
        email: event.email,
      })
      .exec();
  }
}
