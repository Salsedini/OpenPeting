import { PetDTO } from 'contracts/src/lib/Pet-dtos';
import { Document, Schema } from 'mongoose';

export const PET_PROJECTION = 'pet';

export type PetDocument = PetDTO & Document;

export const PetSchema = new Schema(
    {
        _id: String,
        name: String,
        ownerId: String,
        gender: String,
        size: String,
        type: String,
        age: Number,
        picture: String,
        description: String,
        delete: Boolean,

    },
    {
        versionKey: false,
    },
);
