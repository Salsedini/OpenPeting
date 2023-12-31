import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId, UserName } from './value_object';
import { UserWasCreatedEvent } from '../event/user-was-created.event';
import { UserNameWasUpdatedEvent } from '../event/user-was-updated.event';

export class User extends AggregateRoot {
    private _id!: UserId;
    private _name!: UserName;

    public static add(
        id: UserId,
        name: UserName
    ): User {
        const user = new User();

        const event = new UserWasCreatedEvent(
            id.value,
            name.value,
        );

        user.apply(event);

        return user;
    }

    private onUserWasCreatedEvent(event: UserWasCreatedEvent): void {
        this._id = UserId.fromString(event.id);
        this._name = UserName.fromString(event.name);
    }

    updateName(name: UserName) {
        if (this._name.equals(name) == false) this.apply(new UserNameWasUpdatedEvent(this._id.value, name.value));
    }

    private onUserNameWasUpdatedEvent(event: UserNameWasUpdatedEvent) {
        this._name = UserName.fromString(event.name);
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): UserId {
        return this._id;
    }

    public get name(): UserName {
        return this._name;
    }

}
