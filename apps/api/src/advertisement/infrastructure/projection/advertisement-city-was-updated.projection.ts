import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import {
  ADVERTISEMENT_PROJECTION,
  AdvertisementDocument,
} from './advertisement.schema';
import { Model } from 'mongoose';
import { AdvertisementCityWasUpdatedEvent } from '../../domain/event';

@EventsHandler(AdvertisementCityWasUpdatedEvent)
export class AdvertisementCityWasUpdatedProjection
  implements IEventHandler<AdvertisementCityWasUpdatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AdvertisementCityWasUpdatedEvent) {
    await this.advertisementProjection
      .findByIdAndUpdate(event.aggregateId, {
        city: event.city,
      })
      .exec();
  }
}
