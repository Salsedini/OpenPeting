import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserWasCreatedEvent extends Event {
    constructor(public readonly id: string, public readonly name: string, public readonly surname: string, public readonly deleted: boolean ) {
        super(id, {
            _id: id,
            name,
            surname,
            deleted
        });
    }
}
