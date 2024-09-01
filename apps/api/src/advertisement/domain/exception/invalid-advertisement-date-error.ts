import { AdvertisementError } from "./advertisement-error";

export class InvalidAdvertisementDateError extends AdvertisementError {
    public static withInvalidDay(invalidDay: number | undefined): InvalidAdvertisementDateError {
        if (invalidDay === undefined){
            return new InvalidAdvertisementDateError(
                `The day cant be empty`,
            );
        }
        return new InvalidAdvertisementDateError(
            `Is not a valid day`,
        );
        
    }

    public static withInvalidMonth(invalidMonth: number | undefined): InvalidAdvertisementDateError{

        if (invalidMonth === undefined){
            return new InvalidAdvertisementDateError(
                `The month cant be empty`,
            )
        }
        return new InvalidAdvertisementDateError(
            `Is not a valid month`,
        )

    }
}