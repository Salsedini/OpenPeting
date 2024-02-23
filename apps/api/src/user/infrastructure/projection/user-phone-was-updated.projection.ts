import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserPhoneWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { USER_PROJECTION, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@EventsHandler(UserPhoneWasUpdatedEvent)
export class UserPhoneWasUpdatedProjection
  implements IEventHandler<UserPhoneWasUpdatedEvent>
{
  constructor(
    @InjectModel(USER_PROJECTION)
    private readonly userProjection: Model<UserDocument>
  ) {}

  async handle(event: UserPhoneWasUpdatedEvent) {
    await this.userProjection
      .findByIdAndUpdate(event.aggregateId, {
        phone: event.phone,
      })
      .exec();
  }
}
