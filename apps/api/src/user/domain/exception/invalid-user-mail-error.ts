import { UserError } from './user-error';

export class InvalidUserMailError extends UserError {
    public static withInvalidMail(invalidMail: string | undefined): InvalidUserMailError {
        return new InvalidUserMailError(
            `${invalidMail} is not a valid user mail`,
        );
    }
}
