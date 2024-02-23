import { ValueObject } from '@hdd-skeleton/common';
import { InvalidUserNameError } from '../../exception/invalid-user-name-error';

export class UserName extends ValueObject<{ value: string }> {
  public static fromString(name: string): UserName {
    if (name === undefined) {
      throw InvalidUserNameError.withInvalidName(name);
    }
    if (name.length < 3) {
      throw InvalidUserNameError.withInvalidName(name);
    }

    return new UserName({ value: name });
  }

  get value() {
    return this.props.value;
  }
}
