import { AdvertisementError } from './advertisement-error';
import { Advertisement } from '../model/advertisement';
import { AdvertisementId } from '../model/value_object';

export class AdvertisementAlreadyExistsError extends AdvertisementError {
  public static withId(id: AdvertisementId): AdvertisementAlreadyExistsError {
    return new AdvertisementAlreadyExistsError(
      `Advertisement with id ${id.value} already exists`
    );
  }
}
