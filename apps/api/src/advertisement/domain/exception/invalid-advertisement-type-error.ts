
import { AdvertisementError } from './advertisement-error';

export class InvalidAdvertisementTypeError extends AdvertisementError {

    static withInvalidType(type: string) {
        throw new Error(`Advertisement type ${type} is not valid`,);
    }

}