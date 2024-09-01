import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdvertisementWasCreatedEvent } from '../../domain/event';
import {
  ADVERTISEMENT_PROJECTION,
  AdvertisementDocument,
} from './advertisement.schema';

@EventsHandler(AdvertisementWasCreatedEvent)
export class AdvertisementWasCreatedProjection
  implements IEventHandler<AdvertisementWasCreatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AdvertisementWasCreatedEvent) {
    const advertisement = new this.advertisementProjection({
      ...event.payload,
    });
    await advertisement.save();
  }
}
