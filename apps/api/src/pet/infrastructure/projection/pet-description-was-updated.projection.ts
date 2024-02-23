import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetDescriptionWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';

@EventsHandler(PetDescriptionWasUpdatedEvent)
export class PetDescriptionWasUpdatedProjection
  implements IEventHandler<PetDescriptionWasUpdatedEvent>
{
  constructor(
    @InjectModel(PET_PROJECTION)
    private readonly petProjection: Model<PetDocument>
  ) {}

  async handle(event: PetDescriptionWasUpdatedEvent) {
    await this.petProjection
      .findByIdAndUpdate(event.aggregateId, {
        description: event.description,
      })
      .exec();
  }
}
