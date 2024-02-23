import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class PetId extends Id {
    static generate(): PetId {
        return new PetId(uuid());
    }

    public static fromString(id: string): PetId {
        return new PetId(id);
    }

    get value(): string {
        return this.props.value;
    }
}
