import { PizzaId, PizzaName } from '../model/value_object';
import { PizzaError } from './pizza-error';

export class PizzaAlreadyExistsError extends PizzaError {
    public static withId(id: PizzaId): PizzaAlreadyExistsError {
        return new PizzaAlreadyExistsError(
            `Pizza with id ${id.value} already exists`,
        );
    }

    public static withName(name: PizzaName): PizzaAlreadyExistsError {
        return new PizzaAlreadyExistsError(
            `Pizza with name ${name.value} already exists`,
        );
    }
}
