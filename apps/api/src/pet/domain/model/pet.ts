import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { PetAge, PetDescription, PetId, PetName, PetPicture, PetSize, PetType } from './value_object';
import { PetWasCreatedEvent } from '../event/pet-was-created.event';
import { PetWasDeletedEvent } from '../event/pet-was-deleted-event';
import { 
    PetAgeWasUpdatedEvent,
    PetDescriptionWasUpdatedEvent, 
    PetNameWasUpdatedEvent, 
    PetOwnerIdWasUpdatedEvent, 
    PetPictureWasUpdatedEvent, 
    PetSizeWasUpdatedEvent 
} from '../event';
import { UserId } from 'apps/api/src/user/domain/model/value_object';

export class Pet extends AggregateRoot {
    private _id: PetId;
    private _ownerId: UserId;
    private _name: PetName;
    private _size: PetSize;
    private _type: PetType;
    private _age: PetAge;
    private _description: PetDescription;
    private _picture?: PetPicture;
    private _deleted: boolean; 

    public static add(
        id: PetId,
        ownerId: UserId,
        name: PetName,
        size: PetSize,
        type: PetType,
        age: PetAge,
    ): Pet {
        const pet = new Pet();
        
        const event = new PetWasCreatedEvent(
            id.value,
            name.value,
            ownerId.value,
            size.value,
            type.value,
            age.value,
            false
        );

        pet.apply(event);

        return pet;
    }

    private onPetWasCreatedEvent(event: PetWasCreatedEvent): void {
        this._id = PetId.fromString(event.id);
        this._name = PetName.fromString(event.name);
        this._ownerId = UserId.fromString(event.ownerId);
        this._size = PetSize.fromString(event.size);
        this._type = PetType.fromString(event.type);
        this._age = PetAge.fromNumber(event.age);
        this._deleted = event.deleted;
    }

    updateName(name: PetName) {
        if (this._name.equals(name) == false) this.apply(new PetNameWasUpdatedEvent(this._id.value, name.value));
    }

    updateOwnerId(ownerId: UserId) {
        if (this._name.equals(ownerId) == false) this.apply(new PetOwnerIdWasUpdatedEvent(this._id.value, ownerId.value));
    }

    updateSize(size: PetSize) {
        if (this._size.equals(size) == false) this.apply(new PetSizeWasUpdatedEvent(this._id.value, size.value));
    }

    updateAge(age: PetAge) {
        if (this._age.equals(age) == false) this.apply(new PetAgeWasUpdatedEvent(this._id.value, age.value));
    }

    updatePicture(picture: PetPicture) {
        if (this._picture == undefined || this._picture.equals(picture) == false) 
        this.apply(new PetPictureWasUpdatedEvent(this._id.value, picture.value));
    }

    updateDescription(description: PetDescription) {
        if (this._description == undefined || this._description.equals(description) == false) 
        this.apply(new PetDescriptionWasUpdatedEvent(this._id.value, description.value));
    }

    private onPetNameWasUpdatedEvent(event: PetNameWasUpdatedEvent) {
        this._name = PetName.fromString(event.name);
    }

    private onPetOwnerIdWasUpdatedEvent(event: PetOwnerIdWasUpdatedEvent) {
        this._ownerId = UserId.fromString(event.ownerId);
    }

    private onPetSizeWasUpdatedEvent(event: PetSizeWasUpdatedEvent) {
        this._size = PetSize.fromString(event.size);
    }

    private onPetAgeWasUpdatedEvent(event: PetAgeWasUpdatedEvent) {
        this._age = PetAge.fromNumber(event.age);
    }

    private onPetPictureWasUpdatedEvent(event: PetPictureWasUpdatedEvent) {
        this._picture = PetPicture.fromString(event.picture);
    }

    private onPetDescriptionWasUpdatedEvent(event: PetDescriptionWasUpdatedEvent) {
        this._description = PetDescription.fromString(event.description);
    }

    private onPetWasDeletedEvent(event: PetWasDeletedEvent){
        this._deleted = true;
    }

    public aggregateId(): string {
        return this._id.value;
    }

    public get id(): PetId {
        return this._id;
    }

    public get name(): PetName {
        return this._name;
    }

    public get ownerId(): UserId {
        return this._ownerId;
    }

    public get size(): PetSize {
        return this._size;
    }

    public get type(): PetType {
        return this._type;
    }

    public get age(): PetAge{
        return this._age;
    }

    public get picture(): PetPicture{
        return this._picture;
    }

    public get description(): PetDescription{
        return this._description;
    }

    public get deleted(): boolean{
        return !!this._deleted;
    }

    public delete(): void{
        if(!this._deleted){
            this.apply(new PetWasDeletedEvent(this.id.value));
        }

        return; 
    }

}
