import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { AdvertisementFinder } from '../../application/service/advertisement-finder.service';
import { AdvertisementId } from '../../domain/model/value_object';
import { ADVERTISEMENT_PROJECTION, AdvertisementDocument } from '../projection';
import { AdvertisementDTO } from '../../../../../../contracts/src/lib/Advertisement-dtos/advertisement.dto';

@Injectable()
export class MongoDBAdvertisementFinder implements AdvertisementFinder {
  constructor(
    @InjectModel(ADVERTISEMENT_PROJECTION)
    private readonly advertisementProjection: Model<AdvertisementDocument>
  ) {}

  findAll(): Promise<AdvertisementDTO[]> {
    return this.advertisementProjection.find().exec();
  }

  findById(id: AdvertisementId): Promise<AdvertisementDTO> {
    return this.advertisementProjection.findById(id.value).exec();
  }

  findAdoptionAdvertisements(): Promise<AdvertisementDTO[]> {
    return this.advertisementProjection.find({type: 'ADOPTION'}).exec();
  }

  findCaringServiceAdvertisements(): Promise<AdvertisementDTO[]> {
    return this.advertisementProjection.find({type: 'CARING_SERVICE'}).exec();
  }
  
}
