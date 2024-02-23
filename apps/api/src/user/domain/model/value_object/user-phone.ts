import { ValueObject } from '@hdd-skeleton/common';
import { InvalidUserPhoneError } from '../../exception/invalid-user-phone-error';

export class UserPhone extends ValueObject<{ value: number }> {
    public static fromNumber(phone: number): UserPhone {

        if (phone === undefined) { throw InvalidUserPhoneError.withInvalidPhone(phone) }

        const phoneString = phone.toString();
        if (phoneString.length !== 9) { throw InvalidUserPhoneError.withInvalidPhone(phone) }

        return new UserPhone({ value: phone });
    }

    get value() {
        return this.props.value;
    }
}
