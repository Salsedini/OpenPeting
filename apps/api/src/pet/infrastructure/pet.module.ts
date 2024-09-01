import { Module } from '@nestjs/common';
import { PetController } from './controller';

import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { 
    PetAgeWasUpdatedEvent, 
    PetDescriptionWasUpdatedEvent, 
    PetNameWasUpdatedEvent, 
    PetOwnerIdWasUpdatedEvent, 
    PetPictureWasUpdatedEvent, 
    PetSizeWasUpdatedEvent, 
    PetWasCreatedEvent, 
    PetWasDeletedEvent 
} from '../domain/event';
import { Pet } from '../domain/model';
import { ProjectionHandlers } from './projection';
import {
    PET_PROJECTION,
    PetSchema,
} from './projection/pet.schema';
import { PetService } from './service/pet.service';
import { PetProviders } from './pet.providers';
import { PetsController } from './controller/pets.controller';
import { UpdatePetDTO } from 'contracts/src/lib/Pet-dtos/update-pet.dto';
import { CreatePetDTO } from 'contracts/src/lib/Pet-dtos/create-pet.dto';
import { UserService } from '../../user/infrastructure/service';
import { UpdatePetOwnerIdDTO } from 'contracts/src/lib/Pet-dtos';


@Module({
    controllers: [PetController, PetsController],
    imports: [
        CqrsModule,
        EventStoreModule.forFeature([Pet], {
            PetWasCreatedEvent: (event: Event<CreatePetDTO>) =>
                new PetWasCreatedEvent(
                    event.aggregateId,
                    event.payload.name,
                    event.payload.ownerId,
                    event.payload.gender,
                    event.payload.size,
                    event.payload.type,
                    event.payload.age,
                    false
                ),
            PetNameWasUpdatedEvent: (event: Event<UpdatePetDTO>) =>  
                new PetNameWasUpdatedEvent(
                    event.aggregateId,
                    event.payload.name,
                ),
            PetOwnerIdWasUpdatedEvent: (event: Event<UpdatePetOwnerIdDTO>) =>  
                new PetOwnerIdWasUpdatedEvent(
                    event.aggregateId,
                    event.payload.ownerId,
                ),
            PetSizeWasUpdatedEvent: (event: Event<UpdatePetDTO>) =>  
                new PetSizeWasUpdatedEvent(
                    event.aggregateId,
                    event.payload.size,
                ),
            PetAgeWasUpdatedEvent: (event: Event<UpdatePetDTO>) =>  
                new PetAgeWasUpdatedEvent(
                    event.aggregateId,
                    event.payload.age,
                ),
            PetPictureWasUpdatedEvent: (event: Event<UpdatePetDTO>) =>  
                new PetPictureWasUpdatedEvent(
                    event.aggregateId,
                    event.payload.picture,
                ),
            PetDescriptionWasUpdatedEvent: (event: Event<UpdatePetDTO>) =>  
                new PetDescriptionWasUpdatedEvent(
                    event.aggregateId,
                    event.payload.description,
                ),
            PetWasDeletedEvent: (event: Event) =>
                new PetWasDeletedEvent(
                    event.aggregateId,
                ),
        }),
        MongooseModule.forFeature([
            {
                name: PET_PROJECTION,
                schema: PetSchema,
            }
        ]),

    ], providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...PetProviders,
        PetService,
        UserService
    ],
})
export class PetModule { }
