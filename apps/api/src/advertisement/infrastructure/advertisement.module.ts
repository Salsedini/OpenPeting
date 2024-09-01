import { Module } from '@nestjs/common';
import {
  AdoptionAdvertisementController,
  CaringServiceAdvertisementController,
  AdvertisementController,
  AdoptionAdvertisementsController,
  CaringServiceAdvertisementsController,
  AcceptInterestedUserController,
} from './controller';

import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import {
  AdvertisementCityWasUpdatedEvent,
  AdvertisementStartDateWasUpdatedEvent,
  AdvertisementEndDateWasUpdatedEvent,
  AdvertisementPriceWasUpdatedEvent,
  AdvertisementWasCreatedEvent,
  AdvertisementWasDeletedEvent,
  AdvertisementInterestedUsersIdWasUpdatedEvent,
  InterestedUserWasRejectedEvent,
  AcceptedUserIdWasUpdatedEvent,
} from '../domain/event';
import { Advertisement } from '../domain/model';
import { ProjectionHandlers } from './projection';
import {
  ADVERTISEMENT_PROJECTION,
  AdvertisementSchema,
} from './projection/advertisement.schema';
import { AdvertisementService } from './service/advertisement.service';
import { AdvertisementProviders } from './advertisement.providers';
import { AdvertisementsController } from './controller/advertisements.controller';
import { UpdateAdvertisementDTO } from 'contracts/src/lib/Advertisement-dtos/update-advertisement.dto';
import { MongoDBAdvertisementFinder } from './service/advertisement-finder.service';
import { ApplyForAdvertisementDTO } from 'contracts/src/lib/Advertisement-dtos/apply-for-advertisement.dto';
import { UserService } from '../../user/infrastructure/service';
import { RejectInterestedUserController } from './controller/reject-interested-user.controller';
import { AcceptAdvertisementAplicationDTO } from 'contracts/src/lib/Advertisement-dtos';
import { PetService } from '../../pet/infrastructure/service';
import { CloseAdvertisementController } from './controller/close-advertisement.controller';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Advertisement], {
      AdvertisementWasCreatedEvent: (event: Event<any>) =>
        new AdvertisementWasCreatedEvent(
          event.aggregateId,
          event.payload.ownerId,
          event.payload.petId,
          event.payload.city,
          false,
          event.payload.type,
          event.payload.price,
          event.payload.start,
          event.payload.end,
        ),
      AdvertisementCityWasUpdatedEvent: (
        event: Event<UpdateAdvertisementDTO>
      ) =>
        new AdvertisementCityWasUpdatedEvent(
          event.aggregateId,
          event.payload.city
        ),
      AdvertisementPriceWasUpdatedEvent: (
        event: Event<UpdateAdvertisementDTO>
      ) =>
        new AdvertisementPriceWasUpdatedEvent(
          event.aggregateId,
          event.payload.price
        ),
      AdvertisementStartDateWasUpdatedEvent: (
        event: Event<UpdateAdvertisementDTO>
      ) =>
        new AdvertisementStartDateWasUpdatedEvent(
          event.aggregateId,
          event.payload.start.toString(),
        ),
      AdvertisementEndDateWasUpdatedEvent: (
        event: Event<UpdateAdvertisementDTO>
        ) =>
          new AdvertisementEndDateWasUpdatedEvent(
            event.aggregateId,
            event.payload.end.toString(),
          ),
      AdvertisementInterestedUsersIdWasUpdatedEvent: (
        event: Event<ApplyForAdvertisementDTO>
          ) =>
           new AdvertisementInterestedUsersIdWasUpdatedEvent(
            event.aggregateId,
            event.payload.interestedUserId,
          ),
      InterestedUserWasRejectedEvent: (
         event: Event<ApplyForAdvertisementDTO>
          ) =>
           new InterestedUserWasRejectedEvent(
            event.aggregateId,
            event.payload.interestedUserId,
            ),
      AcceptedUserIdWasUpdatedEvent: (
        event: Event<AcceptAdvertisementAplicationDTO>
      ) =>
      new AcceptedUserIdWasUpdatedEvent(
        event.aggregateId,
        event.payload.acceptedUserId
      ),
      AdvertisementWasDeletedEvent: (event: Event) =>
        new AdvertisementWasDeletedEvent(event.aggregateId),
    }),
    
    MongooseModule.forFeature([
      {
        name: ADVERTISEMENT_PROJECTION,
        schema: AdvertisementSchema,
      },
    ])
  ],
  controllers: [
    AdvertisementController,
    AdvertisementsController,
    AdoptionAdvertisementController,
    CaringServiceAdvertisementController,
    AdoptionAdvertisementsController,
    CaringServiceAdvertisementsController,
    RejectInterestedUserController,
    AcceptInterestedUserController,
    CloseAdvertisementController,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...ProjectionHandlers,
    ...AdvertisementProviders,
    AdvertisementService,
    MongoDBAdvertisementFinder,
    UserService,
    PetService
  ],
})
export class AdvertisementModule {}
