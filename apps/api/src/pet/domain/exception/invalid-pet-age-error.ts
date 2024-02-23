import { PetError } from "./pet-error";


export class InvalidPetAgeError extends PetError {
    public static withAboveMaxAge() {
        throw new Error('Age cannot be above 20');
    }
    public static withBelowZeroAge() {
        throw new Error('Age cannot be a negative number');
    }
    public static withNullAge() : InvalidPetAgeError{
        throw new Error('Age cannot be empty');
    }
        
}