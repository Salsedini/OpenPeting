import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { PIZZA_FINDER, PizzaFinder } from '../service';
import { GetPizzaByNameQuery } from './get-pizza-by-name.query';
import { PizzaDTO } from '@hdd-skeleton/contracts';
import { PizzaName } from '../../domain/model/value_object';
import { Err, Result } from 'neverthrow';
import { PizzaError } from '../../domain/exception';

@QueryHandler(GetPizzaByNameQuery)
export class GetPizzaByNameHandler implements IQueryHandler {
    constructor(
        @Inject(PIZZA_FINDER)
        private readonly pizzaFinder: PizzaFinder,
    ) { }

    async execute(query: GetPizzaByNameQuery): Promise<Array<PizzaDTO>> {
        return this.pizzaFinder.findByName(PizzaName.fromString(query.name));
    }
}
