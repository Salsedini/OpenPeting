import { UserError } from './user-error';

export class InvalidUserPictureError extends UserError {
    public static withInvalidUserPicture(invalidPicture: string | undefined): InvalidUserPictureError {
        return new InvalidUserPictureError(
            `${invalidPicture} is not a valid user picture`,
        );
    }
}
