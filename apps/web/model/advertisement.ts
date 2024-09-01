export interface CaringServiceAdvertisement{

    _id: string,
    ownerId: string,
    petId: string,
    city: string,
    price: number,
    type: string,
    start: Date,
    end: Date,
    interestedUsersId: string[],
    acceptedUserId: string,
    
}

export interface AdoptionAdvertisement{

    _id: string,
    ownerId: string,
    petId: string,
    city: string,
    type: string,
    interestedUsersId: string[],
    acceptedUserId: string,

}