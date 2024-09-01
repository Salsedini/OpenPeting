import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class InterestedUserWasRejectedEvent extends Event {
    constructor(public readonly id: string, public readonly interestedUserId: string) {
      super(id, {
        _id: id,
        interestedUserId,
      });
    }
  }