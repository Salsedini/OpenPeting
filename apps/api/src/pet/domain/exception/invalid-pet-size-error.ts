import { PetError } from './pet-error';

export class InvalidPetSizeError extends PetError {

    static withInvalidSize(size: string) {
        throw new Error(`Pet size ${size} is not valid`,);
    }

}