import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { PizzaId, PizzaName } from './value_object';
import { PizzaNameWasUpdatedEvent, PizzaWasCreatedEvent } from '../event';

export class Pizza extends AggregateRoot {
    private _id!: PizzaId;
    private _name!: PizzaName;

    public static add(
        id: PizzaId,
        name: PizzaName
    ): Pizza {
        const pizza = new Pizza();

        const event = new PizzaWasCreatedEvent(
            id.value,
            name.value,
        );

        pizza.apply(event);

        return pizza;
    }

    private onPizzaWasCreatedEvent(event: PizzaWasCreatedEvent): void {
        this._id = PizzaId.fromString(event.id);
        this._name = PizzaName.fromString(event.name);
    }

    updateName(name: PizzaName) {
        if (this._name.equals(name) == false) this.apply(new PizzaNameWasUpdatedEvent(this._id.value, name.value));
    }

    private onPizzaNameWasUpdatedEvent(event: PizzaNameWasUpdatedEvent) {
        this._name = PizzaName.fromString(event.name);
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): PizzaId {
        return this._id;
    }

    public get name(): PizzaName {
        return this._name;
    }

}
