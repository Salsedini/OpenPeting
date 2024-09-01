import { Event } from '@aulasoftwarelibre/nestjs-eventstore';


export class AdvertisementWasCreatedEvent extends Event {
  constructor(
    public readonly id: string,
    public readonly ownerId: string,
    public readonly petId: string,
    public readonly city: string,
    public readonly deleted: boolean,
    public readonly type: string,
    public readonly price?: number,
    public readonly start?: Date,
    public readonly end?: Date
  ) {
    super(id, {
      _id: id,
      ownerId,
      petId,
      city,
      deleted,
      type,
      price,
      start,
      end,
    });
  }
}
