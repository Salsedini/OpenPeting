import { ValueObject } from '@hdd-skeleton/common';
import { InvalidAdvertisementPriceError } from '../../exception';

export class AdvertisementPrice extends ValueObject<{ value: number }> {
    public static fromNumber(price: number): AdvertisementPrice {

        if (price === undefined) { throw InvalidAdvertisementPriceError.withInvalidPrice(price) }

        if (price < 0) { throw InvalidAdvertisementPriceError.withInvalidPrice(price) }

        return new AdvertisementPrice({ value: price });
    }

    get value() {
        return this.props.value;
    }
    
}
