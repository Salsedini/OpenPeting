import { ADVERTISEMENT_FINDER } from '../application/service/advertisement-finder.service';
import { MongoDBAdvertisementFinder } from './service/advertisement-finder.service';

export const AdvertisementProviders = [
  {
    provide: ADVERTISEMENT_FINDER,
    useClass: MongoDBAdvertisementFinder,
  },
];
