import { Event } from '@aulasoftwarelibre/nestjs-eventstore';


export class AdvertisementOwnerIdWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly ownerId: string) {
    super(id, {
      _id: id,
      ownerId,
    });
  }
}

export class AdvertisementPetIdWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly petId: string) {
    super(id, {
      _id: id,
      petId,
    });
  }
}

export class AdvertisementCityWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly city: string) {
    super(id, {
      _id: id,
      city,
    });
  }
}

export class AdvertisementPriceWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly price: number) {
    super(id, {
      _id: id,
      price,
    });
  }
}

export class AdvertisementStartDateWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly start: string) {
    super(id, {
      _id: id,
      start,
    });
  }
}

export class AdvertisementEndDateWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly end: string) {
    super(id, {
      _id: id,
      end,
    });
  }
}

export class AdvertisementInterestedUsersIdWasUpdatedEvent extends Event {
  constructor(public readonly id: string, public readonly interestedUserId: string) {
    super(id, {
      _id: id,
      interestedUserId,
    });
  }
}

export class AcceptedUserIdWasUpdatedEvent extends Event {
  
  constructor(public readonly id: string, public readonly acceptedUserId: string) {
    super(id, {
      _id: id,
      acceptedUserId,
    });
  }
}

