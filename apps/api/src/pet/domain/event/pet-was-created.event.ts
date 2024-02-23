import { Event } from '@aulasoftwarelibre/nestjs-eventstore';

export class PetWasCreatedEvent extends Event {
    constructor(
        public readonly id: string,
        public readonly name: string, 
        public readonly ownerId: string,
        public readonly size: string,
        public readonly type: string,
        public readonly age: number,
        public readonly deleted: boolean ) {
        super(id, {
            _id: id,
            name,
            ownerId,
            size,
            type,
            age,
            deleted
        });
    }
}
