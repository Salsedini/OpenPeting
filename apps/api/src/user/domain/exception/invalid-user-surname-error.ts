import { UserError } from './user-error';

export class InvalidUserSurnameError extends UserError {
    public static withInvalidUserSurname(invalidSurname: string | undefined): InvalidUserSurnameError {
        return new InvalidUserSurnameError(
            `${invalidSurname} is not a valid user surname`,
        );
    }
}
