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
    constructor(public readonly id: string, public readonly mail: string) {
        super(id, {
            _id: id,
            mail,
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

