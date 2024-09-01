import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ADVERTISEMENT_PROJECTION, AdvertisementDocument } from './advertisement.schema';
import { AdvertisementEndDateWasUpdatedEvent } from '../../domain/event';

@EventsHandler(AdvertisementEndDateWasUpdatedEvent)
export class AdvertisementEndDateWasUpdatedProjection
  implements IEventHandler<AdvertisementEndDateWasUpdatedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  async handle(event: AdvertisementEndDateWasUpdatedEvent) {
    await this.advertisementProjection
      .findByIdAndUpdate(event.aggregateId, {
        date: event.end,
      })
      .exec();
  }
}

