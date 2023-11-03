import { Module } from '@nestjs/common';
import { PizzaController } from './controller';

import { Event, EventStoreModule } from '@aulasoftwarelibre/nestjs-eventstore';

import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import {
    CreatePizzaDTO,
} from '@hdd-skeleton/contracts';

import { CommandHandlers } from '../application/command';
import { QueryHandlers } from '../application/query';
import { PizzaWasCreatedEvent } from '../domain/event';
import { Pizza } from '../domain/model';
import { ProjectionHandlers } from './projection';
import {
    PIZZA_PROJECTION,
    PizzaSchema,
} from './projection/pizza.schema';
import { PizzaService } from './service/pizza.service';
import { PizzaProviders } from './pizza.providers';
import { PizzasController } from './controller/pizzas.controller';



@Module({
    controllers: [PizzaController, PizzasController],
    imports: [
        CqrsModule,
        EventStoreModule.forFeature([Pizza], {
            PizzaWasCreatedEvent: (event: Event<CreatePizzaDTO>) =>
                new PizzaWasCreatedEvent(
                    event.aggregateId,
                    event.payload.name,
                ),
        }),
        MongooseModule.forFeature([
            {
                name: PIZZA_PROJECTION,
                schema: PizzaSchema,
            }
        ]),

    ], providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...ProjectionHandlers,
        ...PizzaProviders,
        PizzaService,
    ],
})
export class PizzaModule { }
