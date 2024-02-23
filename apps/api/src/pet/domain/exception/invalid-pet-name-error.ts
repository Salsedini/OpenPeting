import { PetError } from './pet-error';

export class InvalidPetNameError extends PetError {
    
    public static withInvalidName(invalidName: string | undefined): InvalidPetNameError {
        return new InvalidPetNameError(
            `${invalidName} is not a valid pet name`,
        );
    }
}
