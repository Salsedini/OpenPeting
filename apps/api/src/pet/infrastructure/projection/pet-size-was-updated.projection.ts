import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetSizeWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';

@EventsHandler(PetSizeWasUpdatedEvent)
export class PetSizeWasUpdatedProjection
  implements IEventHandler<PetSizeWasUpdatedEvent>
{
  constructor(
    @InjectModel(PET_PROJECTION)
    private readonly petProjection: Model<PetDocument>
  ) {}

  async handle(event: PetSizeWasUpdatedEvent) {
    await this.petProjection
      .findByIdAndUpdate(event.aggregateId, {
        size: event.size,
      })
      .exec();
  }
}
