import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADVERTISEMENT_PROJECTION, AdvertisementDocument } from './advertisement.schema';
import { AdvertisementInterestedUsersIdWasUpdatedEvent } from '../../domain/event';

@EventsHandler(AdvertisementInterestedUsersIdWasUpdatedEvent)
export class AdvertisementInterestedUsersWasUpdatedProjection
  implements IEventHandler<AdvertisementInterestedUsersIdWasUpdatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AdvertisementInterestedUsersIdWasUpdatedEvent) {
    //llega UserId
    const userId= event.interestedUserId;
    //tienes un array
    const advertisement = await this.advertisementProjection.findById(event.id);
    const interestedUsers = advertisement.interestedUsersId;
    //actualizar el array
    interestedUsers.push(userId);
    await this.advertisementProjection.findByIdAndUpdate(event.id, {
        interestedUsersId: interestedUsers
    })
    .exec();
  }
}