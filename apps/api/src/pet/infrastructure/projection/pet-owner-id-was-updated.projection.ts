import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetNameWasUpdatedEvent, PetOwnerIdWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';

@EventsHandler(PetOwnerIdWasUpdatedEvent)
export class PetOwnerIdWasUpdatedProjection
  implements IEventHandler<PetOwnerIdWasUpdatedEvent>
{
  constructor(
    @InjectModel(PET_PROJECTION)
    private readonly petProjection: Model<PetDocument>
  ) {}

  async handle(event: PetOwnerIdWasUpdatedEvent) {

    console.log("pet owner id: ", event.ownerId);

    await this.petProjection
      .findByIdAndUpdate(event.aggregateId, {
        ownerId: event.ownerId,
      })
      .exec();
  }
}