import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { PetFinder } from '../../application/service/pet-finder.service';
import { PetId, PetName } from '../../domain/model/value_object';
import { PET_PROJECTION, PetDocument } from '../projection';
import { PetDTO } from '../../../../../../contracts/src/lib/Pet-dtos/pet.dto';

@Injectable()
export class MongoDBPetFinder implements PetFinder {
    constructor(
        @InjectModel(PET_PROJECTION)
        private readonly petProjection: Model<PetDocument>,
    ) { }

    findAll(): Promise<PetDTO[]> {
        return this.petProjection.find().exec();
    }

    findByName(name: PetName): Promise<Array<PetDTO>> {
        return this.petProjection.find({ name: name.value }).exec();
    }

    findById(id: PetId): Promise<PetDTO> {
        return this.petProjection.findById(id.value).exec();
    }


}
