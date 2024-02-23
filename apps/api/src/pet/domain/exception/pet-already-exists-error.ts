import { PetId, PetName } from '../model/value_object';
import { PetError } from './pet-error';

export class PetAlreadyExistsError extends PetError {
    public static withId(id: PetId): PetAlreadyExistsError {
        return new PetAlreadyExistsError(
            `Pet with id ${id.value} already exists`,
        );
    }

    public static withName(name: PetName): PetAlreadyExistsError {
        return new PetAlreadyExistsError(
            `Pet with name ${name.value} already exists`,
        );
    }
}