import { Id } from '@aulasoftwarelibre/nestjs-eventstore';
import { v4 as uuid } from 'uuid';

export class PizzaId extends Id {
    static generate(): PizzaId {
        return new PizzaId(uuid());
    }

    public static fromString(id: string): PizzaId {
        return new PizzaId(id);
    }

    get value(): string {
        return this.props.value;
    }
}
