import { PizzaId, PizzaName } from '../model/value_object';
import { PizzaError } from './pizza-error';

export class InvalidPizzaNameError extends PizzaError {
    public static withInvalidName(invalidName: string | undefined): InvalidPizzaNameError {
        return new InvalidPizzaNameError(
            `${invalidName} is not a valid pizza name`,
        );
    }
}
