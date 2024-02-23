import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetAgeWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';

@EventsHandler(PetAgeWasUpdatedEvent)
export class PetAgeWasUpdatedProjection
  implements IEventHandler<PetAgeWasUpdatedEvent>
{
  constructor(
    @InjectModel(PET_PROJECTION)
    private readonly petProjection: Model<PetDocument>
  ) {}

  async handle(event: PetAgeWasUpdatedEvent) {
    await this.petProjection
      .findByIdAndUpdate(event.aggregateId, {
        age: event.age,
      })
      .exec();
  }
}
