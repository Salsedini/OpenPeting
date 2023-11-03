import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PIZZA_FINDER, PizzaFinder } from '../service';
import { GetPizzasQuery } from './get-pizzas.query';
import { PizzaDTO } from '@hdd-skeleton/contracts';

@QueryHandler(GetPizzasQuery)
export class GetPizzasHandler implements IQueryHandler {
    constructor(
        @Inject(PIZZA_FINDER)
        private readonly pizzaFinder: PizzaFinder,
    ) { }

    async execute(_: GetPizzasQuery): Promise<Array<PizzaDTO>> {
        return this.pizzaFinder.findAll();
    }
}
