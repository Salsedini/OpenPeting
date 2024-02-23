import { ValueObject } from '@hdd-skeleton/common';
import { InvalidPetPictureError } from '../../exception/invalid-pet-picture-error';

export class PetPicture extends ValueObject<{ value: string }> {
  public static fromString(picture: string): PetPicture {
    if (picture === undefined) {
      throw InvalidPetPictureError.withInvalidPetPicture(picture);
    }

    return new PetPicture({ value: picture });
  }

  get value() {
    return this.props.value;
  }
}
