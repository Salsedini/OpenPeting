import { ValueObject } from '@hdd-skeleton/common';
import { InvalidPetDescriptionError } from '../../exception/invalid-pet-description-error';

export class PetDescription extends ValueObject<{ value: string }> {
  public static fromString(description: string): PetDescription {
    if (description === undefined) {
      throw InvalidPetDescriptionError.withNullDescription();
    }
    if (description.length < 10) {
      throw InvalidPetDescriptionError.withShortDescription();
    }

    return new PetDescription({ value: description });
  }

  get value() {
    return this.props.value;
  }
}