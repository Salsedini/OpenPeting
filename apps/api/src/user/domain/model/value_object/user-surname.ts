import { ValueObject } from '@hdd-skeleton/common';
import { InvalidUserSurnameError } from '../../exception';

export class UserSurname extends ValueObject<{ value: string }> {
  public static fromString(surname: string): UserSurname {
    if (surname === undefined) {
      throw InvalidUserSurnameError.withInvalidUserSurname(surname);
    }
    if (surname.length < 3) {
      throw InvalidUserSurnameError.withInvalidUserSurname(surname);
    }

    return new UserSurname({ value: surname });
  }

  get value() {
    return this.props.value;
  }
}
