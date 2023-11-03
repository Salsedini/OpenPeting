import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PizzaWasCreatedEvent } from '../../domain/event';
import { PIZZA_PROJECTION, PizzaDocument } from './pizza.schema';
import { Logger } from '@nestjs/common';

@EventsHandler(PizzaWasCreatedEvent)
export class PizzaWasCreatedProjection
    implements IEventHandler<PizzaWasCreatedEvent>
{
    constructor(
        @InjectModel(PIZZA_PROJECTION)
        private readonly pizzaProjection: Model<PizzaDocument>,
    ) { }

    async handle(event: PizzaWasCreatedEvent) {
        Logger.log("AAAAAAAAAAAAAAa")
        const pizza = new this.pizzaProjection({
            ...event.payload,
        });
        await pizza.save();
    }
}
