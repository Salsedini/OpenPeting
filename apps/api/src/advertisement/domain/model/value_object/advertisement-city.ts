import { ValueObject } from '@hdd-skeleton/common';
import { InvalidAdvertisementCityError } from '../../exception';

export class AdvertisementCity extends ValueObject<{ value: string }> {
  public static fromString(city: string): AdvertisementCity {
    if (city === undefined) {
      throw InvalidAdvertisementCityError.withInvalidCity(city);
    }
    if (city.length < 3) {
      throw InvalidAdvertisementCityError.withInvalidCity(city);
    }

    return new AdvertisementCity({ value: city });
  }

  get value() {
    return this.props.value;
  }
}
