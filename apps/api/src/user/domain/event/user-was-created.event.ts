import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserWasCreatedEvent extends Event {
    constructor(public readonly id: string, public readonly name: string, public readonly password: string, public readonly email:string, public readonly surname: string, public readonly role: string, public readonly deleted: boolean ) {
        super(id, {
            _id: id,
            name,
            password,
            email,
            surname,
            role,
            deleted
        });
    }
}
