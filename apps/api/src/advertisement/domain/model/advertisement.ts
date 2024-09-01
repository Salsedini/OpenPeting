import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { AdvertisementCity, AdvertisementId, AdvertisementPrice } from './value_object';
import { AdvertisementWasCreatedEvent } from '../event/advertisement-was-created.event';
import { AdvertisementWasDeletedEvent } from '../event/advertisement-was-deleted-event';
import {
  AcceptedUserIdWasUpdatedEvent,
  AdvertisementCityWasUpdatedEvent,
  AdvertisementEndDateWasUpdatedEvent,
  AdvertisementInterestedUsersIdWasUpdatedEvent,
  AdvertisementOwnerIdWasUpdatedEvent,
  AdvertisementPetIdWasUpdatedEvent,
  AdvertisementPriceWasUpdatedEvent,
  AdvertisementStartDateWasUpdatedEvent,
  InterestedUserWasRejectedEvent,
} from '../event';
import { UserId } from 'apps/api/src/user/domain/model/value_object';
import { PetId } from 'apps/api/src/pet/domain/model/value_object';
import { AdvertisementType } from '../../../../../../common/src';

export class Advertisement extends AggregateRoot {
  private _id: AdvertisementId;
  private _ownerId: UserId;
  private _petId: PetId;
  private _city: AdvertisementCity;
  private _price: AdvertisementPrice;
  private _deleted: boolean;
  private _type: string;
  private _start: Date;
  private _end: Date;
  private _interestedUsersId: UserId[]; 
  private _acceptedUserId: UserId;

  constructor() {
    super();
    this._interestedUsersId = [];
  }

  public static addAdoption(
    id: AdvertisementId,
    ownerId: UserId,
    petId: PetId,
    city: AdvertisementCity
  ): Advertisement {
    const advertisement = new Advertisement();

    const event = new AdvertisementWasCreatedEvent(
      id.value,
      ownerId.value,
      petId.value,
      city.value,
      false,
      AdvertisementType.ADOPTION,
    );

    advertisement.apply(event);

    return advertisement;
  }

  public static addCaringService(
    id: AdvertisementId,
    ownerId: UserId,
    petId: PetId,
    city: AdvertisementCity,
    price: AdvertisementPrice,
    start: Date,
    end: Date
  ): Advertisement {
    const advertisement = new Advertisement();

    const event = new AdvertisementWasCreatedEvent(
      id.value,
      ownerId.value,
      petId.value,
      city.value,
      false,
      AdvertisementType.CARING_SERVICE,
      price.value,
      start,
      end
    );

    advertisement.apply(event);

    return advertisement;
  }

  private onAdvertisementWasCreatedEvent(
    event: AdvertisementWasCreatedEvent
  ): void {
    this._id = AdvertisementId.fromString(event.id);
    this._ownerId = UserId.fromString(event.ownerId);
    this._petId = PetId.fromString(event.petId);
    this._city = AdvertisementCity.fromString(event.city);
    this._type = event.type;
    this._deleted = event.deleted;
    this._start = event.start;
    this._end = event.end;
  }

  updateOwnerId(ownerId: UserId) {
    if (this._ownerId.equals(ownerId) == false)
      this.apply(
        new AdvertisementOwnerIdWasUpdatedEvent(this._id.value, ownerId.value)
      );
  }

  updatePetId(petId: PetId) {
    if (this._petId.equals(petId) == false)
      this.apply(
        new AdvertisementPetIdWasUpdatedEvent(this._id.value, petId.value)
      );
  }

  updateCity(city: AdvertisementCity) {
    if (this._city.equals(city) == false)
      this.apply(
        new AdvertisementCityWasUpdatedEvent(this._id.value, city.value)
      );
  }

  updatePrice(price: AdvertisementPrice) {
    if (this._price == undefined || this._price.equals(price) == false)
      this.apply(
        new AdvertisementPriceWasUpdatedEvent(this._id.value, price.value)
      );
  }

  updateStartDate(start: Date) {
    let auxDate = new Date(this._start)
    if (auxDate !== start){
      this.apply(
        new AdvertisementStartDateWasUpdatedEvent(
          this._id.value,
          start.toISOString()
        )
      );
    }
  }

  updateEndDate(end: Date) {
    let auxDate = new Date(this._end)
    if (auxDate !== end){
      this.apply(
        new AdvertisementEndDateWasUpdatedEvent(
          this._id.value,
          end.toISOString()
        )
      );
    }
  }

  updateInterestedUsers(interestedUserIdString: string) {
    
    let interestedUsersIdvalues = [];
    this._interestedUsersId.forEach(user => {
      interestedUsersIdvalues.push(user.value);
    });

    if(!interestedUsersIdvalues.includes(interestedUserIdString)){
      this.apply(
        new AdvertisementInterestedUsersIdWasUpdatedEvent(
          this._id.value,
          interestedUserIdString
        )
      );
    }
  }

  deleteInterestedUser(rejectedUserIdString: string) {

    let interestedUsersIdvalues = [];
    this._interestedUsersId.forEach(user => {
      interestedUsersIdvalues.push(user.value);
    });

    if(interestedUsersIdvalues.includes(rejectedUserIdString)){
      this.apply(
        new InterestedUserWasRejectedEvent(
          this._id.value,
          rejectedUserIdString
        )
      );
    }

  }

  acceptInterestedUser(acceptedUserId: string) {
      this.apply(
        new AcceptedUserIdWasUpdatedEvent(this._id.value, acceptedUserId)
      );
  }

  private onAcceptedUserIdWasUpdatedEvent(
    event: AcceptedUserIdWasUpdatedEvent
  ) {
    this._acceptedUserId = UserId.fromString(event.acceptedUserId);
  }

  private onAdvertisementInterestedUsersIdWasUpdatedEvent(
    event: AdvertisementInterestedUsersIdWasUpdatedEvent
  ){
    const user = UserId.fromString(event.interestedUserId);
    this._interestedUsersId.push(user);
  }

  private onInterestedUserWasRejectedEvent(
    event: InterestedUserWasRejectedEvent
  ){
    const user = UserId.fromString(event.interestedUserId);
    this._interestedUsersId == this._interestedUsersId.filter(u => u !== user);
  }

  private onAdvertisementOwnerIdWasUpdatedEvent(
    event: AdvertisementOwnerIdWasUpdatedEvent
  ) {
    this._ownerId = UserId.fromString(event.ownerId);
  }

  private onAdvertisementPetIdWasUpdatedEvent(
    event: AdvertisementPetIdWasUpdatedEvent
  ) {
    this._petId = PetId.fromString(event.petId);
  }

  private onAdvertisementCityWasUpdatedEvent(
    event: AdvertisementCityWasUpdatedEvent
  ) {
    this._city = AdvertisementCity.fromString(event.city);
  }

  private onAdvertisementPriceWasUpdatedEvent(
    event: AdvertisementPriceWasUpdatedEvent
  ) {
    this._price = AdvertisementPrice.fromNumber(event.price);
  }

  private onAdvertisementStartDateWasUpdatedEvent(event: AdvertisementStartDateWasUpdatedEvent) {
    this._start = new Date(event.start);
  }

  private onAdvertisementEndDateWasUpdatedEvent(event: AdvertisementEndDateWasUpdatedEvent) {
    this._end = new Date(event.end);
  }

  private onAdvertisementWasDeletedEvent(event: AdvertisementWasDeletedEvent) {
    this._deleted = true;
  }

  public aggregateId(): string {
    return this._id.value;
  }

  public get id(): AdvertisementId {
    return this._id;
  }

  public get ownerId(): UserId {
    return this._ownerId;
  }

  public get type(): string {
    return this._type;
  }

  public get acceptedUserId(): UserId {
    return this._acceptedUserId;
  }

  public get interestedUsersId(): UserId[] {
    return this._interestedUsersId;
  }

  public get advertisementCity(): AdvertisementCity {
    return this._city;
  }

  public get advertisementPrice(): AdvertisementPrice {
    return this._price;
  }

  public get startDate(): Date {
    return this._start;
  }

  public get endDate(): Date {
    return this._end;
  }

  public get deleted(): boolean {
    return !!this._deleted;
  }

  public delete(): void {
    if (!this._deleted) {
      this.apply(new AdvertisementWasDeletedEvent(this.id.value));
    }

    return;
  }
}


