import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PetWasCreatedEvent } from '../../domain/event';
import { PET_PROJECTION, PetDocument } from './pet.schema';

@EventsHandler(PetWasCreatedEvent)
export class PetWasCreatedProjection
    implements IEventHandler<PetWasCreatedEvent>
{
    constructor(
        @InjectModel(PET_PROJECTION)
        private readonly petProjection: Model<PetDocument>,
    ) { }

    async handle(event: PetWasCreatedEvent) {
        const pet = new this.petProjection({
            ...event.payload,
        });
        await pet.save();
    }
}
