import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import {
  ADVERTISEMENT_PROJECTION,
  AdvertisementDocument,
} from './advertisement.schema';
import { Model } from 'mongoose';
import { AcceptedUserIdWasUpdatedEvent } from '../../domain/event';

@EventsHandler(AcceptedUserIdWasUpdatedEvent)
export class AcceptedUserIdWasUpdatedProjection
  implements IEventHandler<AcceptedUserIdWasUpdatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AcceptedUserIdWasUpdatedEvent) {

    await this.advertisementProjection
      .findByIdAndUpdate(event.aggregateId, {
        acceptedUserId: event.acceptedUserId,
      })
      .exec();
  }
}