import { UserError } from './user-error';

export class InvalidUserNameError extends UserError {
    public static withInvalidName(invalidName: string | undefined): InvalidUserNameError {
        return new InvalidUserNameError(
            `${invalidName} is not a valid user name`,
        );
    }
}
