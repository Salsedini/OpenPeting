import { AggregateRoot } from '@aulasoftwarelibre/nestjs-eventstore';
import { UserId, UserMail, UserName, UserPassword, UserPhone, UserPicture } from './value_object';
import { UserWasCreatedEvent } from '../event/user-was-created.event';
import { UserMailWasUpdatedEvent, UserNameWasUpdatedEvent, UserPhoneWasUpdatedEvent, UserPictureWasUpdatedEvent, UserSurnameWasUpdatedEvent } from '../event/user-was-updated.event';
import { UserWasDeletedEvent } from '../event/user-was-deleted-event';
import { UserSurname } from './value_object/user-surname';

export class User extends AggregateRoot {
    private _id: UserId;
    private _name: UserName;
    private _password: UserPassword;
    private _surname: UserSurname;
    private _phone?: UserPhone
    private _email?: UserMail;
    private _picture?: UserPicture;
    private _deleted: boolean; 
    private _role: string;

    public static add(
        id: UserId,
        name: UserName,
        password: UserPassword,
        email: UserMail,
        surname: UserSurname,
        role: string,
    ): User {
        const user = new User();
        
        const event = new UserWasCreatedEvent(
            id.value,
            name.value,
            password.value,
            email.value,
            surname.value,
            role,
            false
        );

        user.apply(event);

        return user;
    }

    private onUserWasCreatedEvent(event: UserWasCreatedEvent): void {
        this._id = UserId.fromString(event.id);
        this._name = UserName.fromString(event.name);
        this._password = UserPassword.fromString(event.password);
        this._email = UserMail.fromString(event.email);
        this._surname = UserSurname.fromString(event.surname);
        this._role = event.role;
        this._deleted = event.deleted;
    }

    updateName(name: UserName) {
        if (this._name.equals(name) == false || this._name == undefined) 
        this.apply(new UserNameWasUpdatedEvent(this._id.value, name.value));
    }

    updateSurname(surname: UserSurname) {
        if (this._surname == undefined || this._surname.equals(surname) == false )
        this.apply(new UserSurnameWasUpdatedEvent(this._id.value, surname.value));
    }

    updatePhone(phone: UserPhone) {
        if (this._phone == undefined || this._phone.equals(phone) == false)
        this.apply(new UserPhoneWasUpdatedEvent(this._id.value, phone.value));
    }

    updateMail(email: UserMail) {
        if (this._email == undefined || this.email.equals(email) == false)
        this.apply(new UserMailWasUpdatedEvent(this._id.value, email.value));
    }

    updatePicture(picture: UserPicture) {
        if (this._picture == undefined || this._picture.equals(picture) == false)
        this.apply(new UserPictureWasUpdatedEvent(this._id.value, picture.value));
    }

    private onUserNameWasUpdatedEvent(event: UserNameWasUpdatedEvent) {
        this._name = UserName.fromString(event.name);
    }

    private onUserSurnameWasUpdatedEvent(event: UserSurnameWasUpdatedEvent) {
        this._surname = UserSurname.fromString(event.surname);
    }

    private onUserPhoneWasUpdatedEvent(event: UserPhoneWasUpdatedEvent) {
        this._phone = UserPhone.fromNumber(event.phone);
    }

    private onUserMailWasUpdatedEvent(event: UserMailWasUpdatedEvent) {
        this._email = UserMail.fromString(event.email);
    }

    private onUserPictureWasUpdatedEvent(event: UserPictureWasUpdatedEvent) {
        this._picture = UserPicture.fromString(event.picture);
    }

    private onUserWasDeletedEvent(event: UserWasDeletedEvent){
        this._deleted = true;
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

    public get password(): UserPassword {
        return this._password;
    }

    public get phone(): UserPhone {
        return this._phone;
    }

    public get email(): UserName {
        return this._email;
    }

    public get deleted(): boolean{
        return !!this._deleted;
    }

    public delete(): void{
        if(!this._deleted){
            this.apply(new UserWasDeletedEvent(this.id.value));
        }

        return; 
    }

}
