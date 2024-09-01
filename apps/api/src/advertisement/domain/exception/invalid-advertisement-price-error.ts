import { AdvertisementError } from "./advertisement-error";

export class InvalidAdvertisementPriceError extends AdvertisementError {
    public static withInvalidPrice(invalidPrice: number | undefined): InvalidAdvertisementPriceError {
        if (invalidPrice === undefined){
            return new InvalidAdvertisementPriceError(
                `The advertisement price cant be empty`,
            );
        }
        if (invalidPrice<0){
            return new InvalidAdvertisementPriceError(
                `The price cant be a negative number`,
            );
        } 
    }
}