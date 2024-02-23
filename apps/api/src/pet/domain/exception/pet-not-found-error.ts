import { PetId } from '../model/value_object';
import { PetError } from './pet-error';


export class PetNotFoundError extends PetError {
    public static withId(id: PetId): PetNotFoundError {
        return new PetNotFoundError(
            `Pet with id ${id.value} is not found`,
        );
    }
}
