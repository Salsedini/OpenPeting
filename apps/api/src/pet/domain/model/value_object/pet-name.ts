import { ValueObject } from '@hdd-skeleton/common';
import { InvalidPetNameError } from '../../exception/invalid-pet-name-error';

export class PetName extends ValueObject<{ value: string }> {
  public static fromString(name: string): PetName {
    if (name === undefined) {
      throw InvalidPetNameError.withInvalidName(name);
    }
    if (name.length < 3) {
      throw InvalidPetNameError.withInvalidName(name);
    }

    return new PetName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
