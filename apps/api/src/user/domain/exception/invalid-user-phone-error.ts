import { UserError } from './user-error';

export class InvalidUserPhoneError extends UserError {
    public static withInvalidPhone(invalidPhone: number | undefined): InvalidUserPhoneError {
        if (invalidPhone === undefined){
            return new InvalidUserPhoneError(
                `The phone number can be empty`,
            );
        }
        if (invalidPhone<9){
            return new InvalidUserPhoneError(
                `${invalidPhone} is too short for a user phone`,
            );
        } else{
            return new InvalidUserPhoneError(
                `${invalidPhone} is too long for a user phone`,
            );
        }
    }
}