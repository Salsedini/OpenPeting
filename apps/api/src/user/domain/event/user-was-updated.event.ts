import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class UserNameWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly name: string) {
        super(id, {
            _id: id,
            name,
        });
    }
}

export class UserSurnameWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly surname: string) {
        super(id, {
            _id: id,
            surname,
        });
    }
}
export class UserPhoneWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly phone: number) {
        super(id, {
            _id: id,
            phone,
        });
    }
}

export class UserMailWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly email: string) {
        super(id, {
            _id: id,
            email,
        });
    }
}

export class UserPictureWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly picture: string) {
        super(id, {
            _id: id,
            picture,
        });
    }
}

