import { PetError } from './pet-error';

export class InvalidPetGenderError extends PetError {

    static withInvalidGender(gender: string) {
        throw new Error(`Pet type ${gender} is not a valid gender`,);
    }

}