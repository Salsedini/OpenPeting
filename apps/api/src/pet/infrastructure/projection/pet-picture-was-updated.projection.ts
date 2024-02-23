import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetPictureWasUpdatedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';

@EventsHandler(PetPictureWasUpdatedEvent)
export class PetPictureWasUpdatedProjection
  implements IEventHandler<PetPictureWasUpdatedEvent>
{
  constructor(
    @InjectModel(PET_PROJECTION)
    private readonly petProjection: Model<PetDocument>
  ) {}

  async handle(event: PetPictureWasUpdatedEvent) {
    await this.petProjection
      .findByIdAndUpdate(event.aggregateId, {
        picture: event.picture,
      })
      .exec();
  }
}
