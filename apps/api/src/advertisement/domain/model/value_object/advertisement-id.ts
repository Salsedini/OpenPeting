import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class AdvertisementId extends Id {
  static generate(): AdvertisementId {
    return new AdvertisementId(uuid());
  }

  public static fromString(id: string): AdvertisementId {
    return new AdvertisementId(id);
  }

  get value(): string {
    return this.props.value;
  }
}
