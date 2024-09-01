import { AdvertisementId } from '../model/value_object';
import { AdvertisementError } from './advertisement-error';

export class AdvertisementNotFoundError extends AdvertisementError {
  public static withId(id: AdvertisementId): AdvertisementNotFoundError {
    return new AdvertisementNotFoundError(
      `Advertisement with id ${id.value} is not found`
    );
  }
}
