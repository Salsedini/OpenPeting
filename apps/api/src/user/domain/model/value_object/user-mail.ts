import { ValueObject } from '@hdd-skeleton/common';
import { isEmail } from 'class-validator';
import 'reflect-metadata';
import { InvalidUserMailError } from '../../exception';



export class UserMail extends ValueObject<{ value: string }> {

    
    email: string;

    public static fromString(email: string): UserMail {

        if(!isEmail(email)){
            throw InvalidUserMailError.withInvalidMail(email) 
        }

        return new UserMail({ value: email });
    }

    get value() {
        return this.props.value;
    }
}

//export class UserMail extends ValueObject<{ value: string }> {
//    @isEemail({}, { message: 'Invalid eemail format' })
//    private _value: string;
//
//    private constructor(props: { value: string }) {
//        super(props);
//        this._value = props.value;
//    }
//
//    public static fromString(email: string): UserMail {
//        if (email === undefined || email.length < 5) {
//            throw InvalidUserMailError.withInvalidMail(email);
//        }
//
//        return new UserMail({ value: email });
//    }
//
//    get value() {
//        return this._value;
//    }
//}

