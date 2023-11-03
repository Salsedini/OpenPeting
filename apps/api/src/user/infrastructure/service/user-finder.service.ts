import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDTO } from '@hdd-skeleton/contracts';
import { Model } from 'mongoose';

import { UserFinder } from '../../application/service/user-finder.service';
import { UserName } from '../../domain/model/value_object';
import { USER_PROJECTION, UserDocument } from '../projection';

@Injectable()
export class MongoDBUserFinder implements UserFinder {
    constructor(
        @InjectModel(USER_PROJECTION)
        private readonly userProjection: Model<UserDocument>,
    ) { }

    findAll(): Promise<UserDTO[]> {
        return this.userProjection.find().exec();
    }

    findByName(name: UserName): Promise<Array<UserDTO>> {
        return this.userProjection.find({ name: name.value }).exec();
    }
}
