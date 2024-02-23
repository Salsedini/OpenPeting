import { UserId } from '../model/value_object/user-id';
import { UserError } from './user-error';

export class UserNotFoundError extends UserError {
    public static withId(id: UserId): UserNotFoundError {
        return new UserNotFoundError(
            `User with id ${id.value} is not found`,
        );
    }
}
