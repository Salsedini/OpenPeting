import { AdvertisementError } from "./advertisement-error";


export class InvalidAdvertisementCityError extends AdvertisementError {
    
    public static withInvalidCity(invalidName: string | undefined): InvalidAdvertisementCityError {
        return new InvalidAdvertisementCityError(
            `${invalidName} is not a valid advertisement city`,
        );
    }
}
