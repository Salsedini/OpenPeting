import { ValueObject } from '@hdd-skeleton/common';
import { InvalidPetAgeError } from '../../exception';

export class PetAge extends ValueObject<{ value: number }> {
    public static fromNumber(age: number): PetAge {

        if (age === undefined) { throw InvalidPetAgeError.withNullAge() }

        if (age < 0) { throw InvalidPetAgeError.withBelowZeroAge() }

        if (age > 20) { throw InvalidPetAgeError.withAboveMaxAge() }

        return new PetAge({ value: age });
    }

    get value() {
        return this.props.value;
    }
}
