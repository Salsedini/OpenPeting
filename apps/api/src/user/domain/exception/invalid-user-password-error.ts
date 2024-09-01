import { UserError } from './user-error';

export class InvalidUserPasswordError extends UserError {
    public static withInvalidPassword(invalidPassword: string | undefined): InvalidUserPasswordError {
        return new InvalidUserPasswordError(
            `${invalidPassword} is not a valid user password`,
        );
    }
}
