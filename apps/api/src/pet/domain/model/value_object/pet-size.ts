import { PetSizeTypes, ValueObject } from '@hdd-skeleton/common';
import { InvalidPetSizeError } from '../../exception/invalid-pet-size-error';

export class PetSize extends ValueObject<{ value: string }> {
  public static fromString(size: string): PetSize {
    
    if (size in PetSizeTypes === false) {
      throw InvalidPetSizeError.withInvalidSize(size);
    }

    return new PetSize({ value: size });
  }

  get value() {
    return this.props.value;
  }
}