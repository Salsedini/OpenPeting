import { ValueObject } from '@hdd-skeleton/common';
import { PetGenderTypes } from '../../../../../../../common/src/lib/pet-gender-types';
import { InvalidPetGenderError } from '../../exception';

export class PetGender extends ValueObject<{ value: string }> {
  public static fromString(gender: string): PetGender {
    
    if (gender in PetGenderTypes === false) {
      throw InvalidPetGenderError.withInvalidGender(gender);
    }

    return new PetGender({ value: gender });
  }

  get value() {
    return this.props.value;
  }
}