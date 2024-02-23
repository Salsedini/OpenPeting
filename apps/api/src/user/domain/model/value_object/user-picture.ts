import { ValueObject } from '@hdd-skeleton/common';
import { InvalidUserNameError } from '../../exception/invalid-user-name-error';
import { InvalidUserPictureError } from '../../exception';

export class UserPicture extends ValueObject<{ value: string }> {
  public static fromString(picture: string): UserPicture {
    if (picture === undefined) {
      throw InvalidUserPictureError.withInvalidUserPicture(picture);
    }

    return new UserPicture({ value: picture });
  }

  get value() {
    return this.props.value;
  }
}
