import { ValueObject } from '@hdd-skeleton/common';
import { InvalidPetTypeError } from '../../exception/invalid-pet-type-error';
import { PetTypes } from '../../../../../../../common/src/lib/pet-types';

export class PetType extends ValueObject<{ value: string }> {
  public static fromString(type: string): PetType {
    
    if (type in PetTypes === false) {
      throw InvalidPetTypeError.withInvalidType(type);
    }

    return new PetType({ value: type });
  }

  get value() {
    return this.props.value;
  }
}