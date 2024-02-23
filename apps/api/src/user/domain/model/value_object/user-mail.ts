import { ValueObject } from '@hdd-skeleton/common';
import { InvalidUserMailError } from '../../exception/invalid-user-mail-error';
import { isEmail } from 'class-validator';
import 'reflect-metadata';



export class UserMail extends ValueObject<{ value: string }> {

    
    email: string;

    public static fromString(mail: string): UserMail {

        if(!isEmail(mail)){
            throw InvalidUserMailError.withInvalidMail(mail) 
        }

        return new UserMail({ value: mail });
    }

    get value() {
        return this.props.value;
    }
}

//export class UserMail extends ValueObject<{ value: string }> {
//    @isEmail({}, { message: 'Invalid email format' })
//    private _value: string;
//
//    private constructor(props: { value: string }) {
//        super(props);
//        this._value = props.value;
//    }
//
//    public static fromString(mail: string): UserMail {
//        if (mail === undefined || mail.length < 5) {
//            throw InvalidUserMailError.withInvalidMail(mail);
//        }
//
//        return new UserMail({ value: mail });
//    }
//
//    get value() {
//        return this._value;
//    }
//}

