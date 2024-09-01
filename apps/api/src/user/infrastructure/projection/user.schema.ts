import { UserDTO } from 'contracts/src/lib/User-dtos/user.dto';
import { Document, Schema } from 'mongoose';

export const USER_PROJECTION = 'user';

export type UserDocument = UserDTO & Document;

export const UserSchema = new Schema(
    {
        _id: String,
        name: String,
        password: String,
        surname: String,
        phone: Number,
        email: String,
        picture: String,
        role: [String],
        delete: Boolean,

    },
    {
        versionKey: false,
    },
);
