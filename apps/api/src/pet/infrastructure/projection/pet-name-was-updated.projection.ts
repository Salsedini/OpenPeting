import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetNameWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';

@EventsHandler(PetNameWasUpdatedEvent)
export class PetNameWasUpdatedProjection
  implements IEventHandler<PetNameWasUpdatedEvent>
{
  constructor(
    @InjectModel(PET_PROJECTION)
    private readonly petProjection: Model<PetDocument>
  ) {}

  async handle(event: PetNameWasUpdatedEvent) {
    await this.petProjection
      .findByIdAndUpdate(event.aggregateId, {
        name: event.name,
      })
      .exec();
  }
}
