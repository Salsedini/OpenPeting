import { PetError } from './pet-error';

export class InvalidPetDescriptionError extends PetError {
    static withShortDescription() {
        throw new Error('Description is too short.');
    }
    static withNullDescription() {
        throw new Error('Description cannot be empty.');
    }
}
