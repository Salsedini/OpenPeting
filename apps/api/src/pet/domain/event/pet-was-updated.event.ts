import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class PetNameWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly name: string) {
        super(id, {
            _id: id,
            name,
        });
    }
}

export class PetOwnerIdWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly ownerId: string) {
        super(id, {
            _id: id,
            ownerId,
        });
    }
}
export class PetSizeWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly size: string) {
        super(id, {
            _id: id,
            size,
        });
    }
}

export class PetAgeWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly age: number) {
        super(id, {
            _id: id,
            age,
        });
    }
}

export class PetPictureWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly picture: string) {
        super(id, {
            _id: id,
            picture,
        });
    }
}

export class PetDescriptionWasUpdatedEvent extends Event {
    constructor(public readonly id: string, public readonly description: string) {
        super(id, {
            _id: id,
            description,
        });
    }
}



