import { UserId } from '../model/value_object/user-id';
import { UserName } from '../model/value_object/user-name';
import { UserError } from './user-error';

export class UserAlreadyExistsError extends UserError {
    public static withId(id: UserId): UserAlreadyExistsError {
        return new UserAlreadyExistsError(
            `User with id ${id.value} already exists`,
        );
    }

    public static withName(name: UserName): UserAlreadyExistsError {
        return new UserAlreadyExistsError(
            `User with name ${name.value} already exists`,
        );
    }
}
