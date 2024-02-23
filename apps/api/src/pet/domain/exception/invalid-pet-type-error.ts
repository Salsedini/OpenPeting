import { PetError } from './pet-error';

export class InvalidPetTypeError extends PetError {

    static withInvalidType(type: string) {
        throw new Error(`Pet type ${type} is not a valid pet`,);
    }

}