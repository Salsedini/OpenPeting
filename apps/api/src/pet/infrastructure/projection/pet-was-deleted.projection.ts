import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PetWasDeletedEvent } from '../../domain/event';
import { InjectModel } from '@nestjs/mongoose';
import { PET_PROJECTION, PetDocument } from './pet.schema';
import { Model } from 'mongoose';


@EventsHandler(PetWasDeletedEvent)
export class PetWasDeletedProjection implements IEventHandler<PetWasDeletedEvent>{
    
    constructor(
        @InjectModel(PET_PROJECTION)
        private readonly petProjection: Model <PetDocument>
    )  { }
    
    handle(event: PetWasDeletedEvent) {
        this.petProjection.findByIdAndDelete(event.aggregateId).exec();
    }

}