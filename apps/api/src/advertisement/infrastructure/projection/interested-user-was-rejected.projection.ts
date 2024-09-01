import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADVERTISEMENT_PROJECTION, AdvertisementDocument } from './advertisement.schema';
import { InterestedUserWasRejectedEvent } from '../../domain/event';

@EventsHandler(InterestedUserWasRejectedEvent)
export class InterestedUsersWasRejectedProjection
  implements IEventHandler<InterestedUserWasRejectedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: InterestedUserWasRejectedEvent) {
    
    const userId= event.interestedUserId;
  
    const advertisement = await this.advertisementProjection.findById(event.id);
    const interestedUsers = advertisement.interestedUsersId;
    
    const finalInterestedUsers = interestedUsers.filter(u => u !== userId);
    
    await this.advertisementProjection.findByIdAndUpdate(event.id, {
        interestedUsersId: finalInterestedUsers
    })
    .exec();
    const finalAdvertisement = await this.advertisementProjection.findById(event.id);
    

  }
}