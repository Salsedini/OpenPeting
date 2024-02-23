import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserSurnameWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@EventsHandler(UserSurnameWasUpdatedEvent)
export class UserSurnameWasUpdatedProjection
  implements IEventHandler<UserSurnameWasUpdatedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>
  ) {}

  async handle(event: UserSurnameWasUpdatedEvent) {
    await this.userProjection
      .findByIdAndUpdate(event.aggregateId, {
        surname: event.surname,
      })
      .exec();
  }
}
