import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdvertisementPriceWasUpdatedEvent } from '../../domain/event';
import { ADVERTISEMENT_PROJECTION, AdvertisementDocument } from './advertisement.schema';

@EventsHandler(AdvertisementPriceWasUpdatedEvent)
export class AdvertisementPriceWasUpdatedProjection
  implements IEventHandler<AdvertisementPriceWasUpdatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AdvertisementPriceWasUpdatedEvent) {
    await this.advertisementProjection
      .findByIdAndUpdate(event.aggregateId, {
        price: event.price,
      })
      .exec();
  }
}