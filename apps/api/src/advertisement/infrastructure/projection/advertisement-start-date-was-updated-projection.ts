import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADVERTISEMENT_PROJECTION, AdvertisementDocument } from './advertisement.schema';
import { AdvertisementStartDateWasUpdatedEvent } from '../../domain/event';

@EventsHandler(AdvertisementStartDateWasUpdatedEvent)
export class AdvertisementStartDateWasUpdatedProjection
  implements IEventHandler<AdvertisementStartDateWasUpdatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AdvertisementStartDateWasUpdatedEvent) {
    await this.advertisementProjection
      .findByIdAndUpdate(event.aggregateId, {
        date: event.start,
      })
      .exec();
  }
}