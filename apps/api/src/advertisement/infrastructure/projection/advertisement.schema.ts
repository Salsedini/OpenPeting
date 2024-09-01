import { AdvertisementDTO } from 'contracts/src/lib/Advertisement-dtos';
import { Document, Schema } from 'mongoose';

export const ADVERTISEMENT_PROJECTION = 'advertisement';

export type AdvertisementDocument = AdvertisementDTO & Document;

export const AdvertisementSchema = new Schema(
  {
    _id: String,
    ownerId: String,
    petId: String,
    city: String,
    price: Number,
    type: String,
    start: Date,
    end: Date,
    interestedUsersId: [String],
    acceptedUserId: String,
    delete: Boolean,
  },
  {
    versionKey: false,
  }
);
