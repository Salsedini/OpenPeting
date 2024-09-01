import { Advertisement } from '../model';

export interface AdvertisementRepository<Advertisement, AdvertisementId> {
  delete(advertisement: Advertisement): unknown;
  find(id: AdvertisementId): Promise<Advertisement> | null;
  save(advertisement: Advertisement): void;
}
