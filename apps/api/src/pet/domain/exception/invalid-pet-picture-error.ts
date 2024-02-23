import { PetError } from "./pet-error";


export class InvalidPetPictureError extends PetError {
    public static withInvalidPetPicture(invalidPicture: string | undefined): InvalidPetPictureError {
        return new InvalidPetPictureError(
            `${invalidPicture} is not a valid picture`,
        );
    }
}
