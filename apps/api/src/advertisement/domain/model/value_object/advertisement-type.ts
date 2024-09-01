import { ValueObject } from '@hdd-skeleton/common';
import { InvalidAdvertisementTypeError } from '../../exception';

export class AdvertisementType extends ValueObject<{ value: string }> {
  public static fromString(type: string): AdvertisementType {
    
    if (type in AdvertisementType === false) {
      throw InvalidAdvertisementTypeError.withInvalidType(type);
    }

    return new AdvertisementType({ value: type });
  }

  get value() {
    return this.props.value;
  }
}