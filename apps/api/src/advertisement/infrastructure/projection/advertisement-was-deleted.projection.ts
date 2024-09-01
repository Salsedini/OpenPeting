import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { AdvertisementWasDeletedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import {
  ADVERTISEMENT_PROJECTION,
  AdvertisementDocument,
} from './advertisement.schema';
import { Model } from 'mongoose';

@EventsHandler(AdvertisementWasDeletedEvent)
export class AdvertisementWasDeletedProjection
  implements IEventHandler<AdvertisementWasDeletedEvent>
{
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  handle(event: AdvertisementWasDeletedEvent) {
    this.advertisementProjection.findByIdAndDelete(event.aggregateId).exec();
  }
  
}
