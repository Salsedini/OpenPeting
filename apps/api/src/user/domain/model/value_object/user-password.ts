import { ValueObject } from '@hdd-skeleton/common';
import { InvalidUserPasswordError } from '../../exception';


export class UserPassword extends ValueObject<{ value: string }> {
  public static fromString(password: string): UserPassword {
    if (password === undefined) {
      throw InvalidUserPasswordError.withInvalidPassword(password);
    }
    if (password.length < 3) {
      throw InvalidUserPasswordError.withInvalidPassword(password);
    }

    return new UserPassword({ value: password });
  }

  get value() {
    return this.props.value;
  }
}