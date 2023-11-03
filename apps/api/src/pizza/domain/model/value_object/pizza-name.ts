import { ValueObject } from '@hdd-skeleton/common';
import { InvalidPizzaNameError } from '../../exception/invalid-pizza-name-error';

export class PizzaName extends ValueObject<{ value: string }> {
    public static fromString(name: string): PizzaName {

        if (name === undefined) { throw InvalidPizzaNameError.withInvalidName(name) }
        if (name.length < 5) { throw InvalidPizzaNameError.withInvalidName(name) }

        return new PizzaName({ value: name });
    }

    get value() {
        return this.props.value;
    }
}
