import { UserDTO } from '@hdd-skeleton/contracts';
import { Document, Schema } from 'mongoose';

export const USER_PROJECTION = 'user';

export type UserDocument = UserDTO & Document;

export const UserSchema = new Schema(
    {
        _id: String,
        name: String,
    },
    {
        versionKey: false,
    },
);
