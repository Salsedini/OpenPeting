import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserPictureWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@EventsHandler(UserPictureWasUpdatedEvent)
export class UserPictureWasUpdatedProjection
  implements IEventHandler<UserPictureWasUpdatedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>
  ) {}

  async handle(event: UserPictureWasUpdatedEvent) {
    await this.userProjection
      .findByIdAndUpdate(event.aggregateId, {
        picture: event.picture,
      })
      .exec();
  }
}
