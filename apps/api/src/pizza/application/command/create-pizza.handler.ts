import { Err, Ok, err, ok, Result } from 'neverthrow';
import { InjectAggregateRepository } from '@aulasoftwarelibre/nestjs-eventstore';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreatePizzaCommand } from './create-pizza.command';
import { match, P } from 'ts-pattern';

import { Pizza } from '../../domain/model';
import {
    PizzaId,
    PizzaName,
} from '../../domain/model/value_object';

import { PizzaRepository } from '../../domain/service';
import { PizzaAlreadyExistsError } from '../../domain/exception';

@CommandHandler(CreatePizzaCommand)
export class CreatePizzaHandler implements ICommandHandler<CreatePizzaCommand> {

    constructor(
        @InjectAggregateRepository(Pizza)
        private readonly pizzaRepository: PizzaRepository<Pizza, PizzaId>,
    ) { }

    async execute(command: CreatePizzaCommand): Promise<Result<null, PizzaAlreadyExistsError>> {

        const id = PizzaId.generate();

        const foundPizza = await this.pizzaRepository.find(id)

        return match(foundPizza)
            .with(P.instanceOf(Pizza), (foundPizza: Pizza) => {

                return err(PizzaAlreadyExistsError.withId(id));
            })
            .otherwise(() => {

                const name = PizzaName.fromString(command.name);
                const pizza = Pizza.add(id, name);
                this.pizzaRepository.save(pizza);

                return ok(null);
            });
    }
}
