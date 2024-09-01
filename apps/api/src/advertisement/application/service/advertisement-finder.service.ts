import { AdvertisementDTO } from 'contracts/src/lib/Advertisement-dtos';
import { AdvertisementId } from '../../domain/model/value_object';

export const ADVERTISEMENT_FINDER = 'ADVERTISEMENT_FINDER';

export interface AdvertisementFinder {
  findAll(): Promise<Array<AdvertisementDTO>>;
  findById(id: AdvertisementId): Promise<AdvertisementDTO>;
}
